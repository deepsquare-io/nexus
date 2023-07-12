// Copyright 2023 Deepsquare Association
// This file is part of Nexus.
// Nexus is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Nexus is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Nexus. If not, see <https://www.gnu.org/licenses/>.
import dedent from 'dedent';
import { toast } from 'react-toastify';
import type { Job } from '@graphql/external/sbatchServiceClient/generated/Types';
import type DetailsData from '@lib/types/DetailsData';
import BlenderRenderEngine from '@lib/types/enums/BlenderRenderEngine';
import StorageType from '@lib/types/enums/StorageType';
import TextToImageModel from '@lib/types/enums/TextToImageModel';
import WorkloadType from '@lib/types/enums/WorkloadType';

export async function resolveJobForm(type: WorkloadType, details: DetailsData): Promise<Job> {
  let job: Job;

  if (details.inputData?.type === StorageType.DRAG_DROP) {
    const data = new FormData();
    data.append('file', details.inputData.dragAndDropFile!);
    details.inputData.type = StorageType.HTTP;
    details.inputData.url = (
      await (
        await toast.promise(
          fetch('https://transfer.deepsquare.run/', {
            method: 'POST',
            body: data,
          }),
          {
            pending: 'Uploading your file...',
            success: 'File successfully uploaded',
            error: 'Error while uploading your file',
          },
        )
      ).text()
    ).replace('\n', '');
  }
  if (details.outputData?.type === StorageType.DEEPSQUARE) {
    details.outputData.type = StorageType.HTTP;
    details.outputData.url = 'https://transfer.deepsquare.run/';
  }

  switch (type) {
    case WorkloadType.BLENDER:
      job = {
        enableLogging: true,
        // env: [{ key: 'DISPLAY', value: ':99' }],
        resources: {
          tasks: details.nTasks!,
          cpusPerTask: details.cpuPerTask!,
          memPerCpu: details.memPerCpu!,
          gpusPerTask: 1,
        },
        input: details.inputData
          ? {
              http: details.inputData.type === StorageType.HTTP ? { url: details.inputData.url } : undefined,
              s3:
                details.inputData.type === StorageType.S3
                  ? {
                      region: details.inputData.region!,
                      bucketUrl: `s3://${details.inputData.bucketName}`,
                      path: formatPath(details.inputData.path!),
                      accessKeyId: details.inputData.accessToken!,
                      secretAccessKey: details.inputData.secretToken!,
                      endpointUrl: details.inputData.url,
                    }
                  : undefined,
            }
          : undefined,
        output: details.outputData
          ? {
              http: details.outputData.type === StorageType.HTTP ? { url: details.outputData.url } : undefined,
              s3:
                details.outputData.type === StorageType.S3
                  ? {
                      region: details.outputData.region!,
                      bucketUrl: `s3://${details.outputData.bucketName}`,
                      path: formatPath(details.outputData.path!),
                      accessKeyId: details.outputData.accessToken!,
                      secretAccessKey: details.outputData.secretToken!,
                      endpointUrl: details.outputData.url,
                      deleteSync: details.outputData.deleteSync,
                    }
                  : undefined,
            }
          : undefined,
        continuousOutputSync: true,
        steps: [
          {
            name: 'compute-frames',
            run: {
              resources: {
                tasks: 1,
                cpusPerTask: details.cpuPerTask!,
                memPerCpu: details.memPerCpu!,
                gpusPerTask: 0,
              },
              container: {
                deepsquareHosted: true,
                apptainer: true,
                registry: 'registry-1.docker.io',
                image: `linuxserver/blender:${details.version}`,
              },
              command: dedent(`set -e
                  /usr/bin/cat << END > ./frames_per_task.py
                  import bpy
                  import math
                  scene = bpy.context.scene
                  frames_per_task = int(math.ceil((scene.frame_end - scene.frame_start + 1)/float(${details.nTasks!})))
                  print(f"frames_per_task={frames_per_task}")
                  END
                  /usr/bin/cat << 'END' > ./start_frame.py
                  import bpy
                  print(f"start_frame={bpy.context.scene.frame_start}")
                  END
                  /usr/bin/cat << 'END' > ./end_frame.py
                  import bpy
                  print(f"end_frame={bpy.context.scene.frame_end}")
                  END
                  frames_per_task=$(/usr/bin/blender -b "$DEEPSQUARE_INPUT/"*.blend -P ./frames_per_task.py | sed -nr 's/frames_per_task=(.*)/\\1/p')
                  start_frame=$(/usr/bin/blender -b "$DEEPSQUARE_INPUT/"*.blend -P ./start_frame.py | sed -nr 's/start_frame=(.*)/\\1/p')
                  end_frame=$(/usr/bin/blender -b "$DEEPSQUARE_INPUT/"*.blend -P ./end_frame.py | sed -nr 's/end_frame=(.*)/\\1/p')
                  /usr/bin/echo "START_FRAME=$start_frame" | tee -a "$DEEPSQUARE_ENV"
                  /usr/bin/echo "END_FRAME=$end_frame" | tee -a "$DEEPSQUARE_ENV"
                  /usr/bin/echo "FRAMES_PER_TASK=$frames_per_task" | tee -a "$DEEPSQUARE_ENV"`),
            },
          },
          {
            name: 'assert-calculus',
            run: {
              resources: {
                tasks: 1,
                cpusPerTask: details.cpuPerTask!,
                memPerCpu: details.memPerCpu!,
                gpusPerTask: 0,
              },
              command: dedent(`
                    set -e
                    if [ "$(( END_FRAME - START_FRAME ))" -lt "${details.nTasks!}" ]; then
                      /usr/bin/echo "The job stopped to avoid overconsumption. There are less frames than GPUs! This means that a GPU will not be used."
                      /usr/bin/echo "This behavior is considered undesirable, and the job will stop."
                      /usr/bin/echo "Please use $(( END_FRAME - START_FRAME )) tasks instead of ${details.nTasks!} tasks."
                      exit 1
                    fi`),
            },
          },
          {
            name: 'render-loop',
            for: {
              parallel: true,
              range: {
                begin: 1,
                end: details.nTasks!,
              },
              steps: [
                {
                  name: 'render',
                  run: {
                    resources: {
                      tasks: 1,
                      cpusPerTask: details.cpuPerTask!,
                      memPerCpu: details.memPerCpu!,
                      gpusPerTask: 1,
                    },
                    shell: '/bin/bash',
                    container: {
                      deepsquareHosted: true,
                      apptainer: true,
                      registry: 'registry-1.docker.io',
                      image: `linuxserver/blender:${details.version}`,
                    },
                    command: dedent(`
                          set -e
                          start_frame_i=$(((index-1)*FRAMES_PER_TASK+START_FRAME))
                          end_frame_i=$((index*FRAMES_PER_TASK+START_FRAME-1))
                          if [[ index -eq ${details.nTasks!} ]]; then
                            end_frame_i=$END_FRAME
                          fi
                          echo "Rendering $start_frame_i...$end_frame_i"
                          /usr/bin/blender --threads 0 --log-level 0 --enable-autoexec -E "${
                            details.renderEngine
                          }" -b "$STORAGE_PATH"/input/*.blend -F "${
                      details.outputFormat
                    }" -o "$DEEPSQUARE_OUTPUT/frame_#####" -s "$start_frame_i" -e "$end_frame_i" -a ${
                      details.renderEngine === BlenderRenderEngine.CYCLES ? `-- --cycles-device OPTIX` : ''
                    } | grep -A 2 'Saved:'`),
                  },
                },
              ],
            },
          },
        ],
      };
      break;
    case WorkloadType.URS:
      job = {
        enableLogging: true,
        env: [
          { key: 'DISPLAY', value: ':99' },
          { key: 'XDG_RUNTIME_DIR', value: '/tmp' },
        ],
        resources: {
          tasks: 1,
          cpusPerTask: details.cpuPerTask!,
          memPerCpu: Math.round(details.memPerCpu! / details.cpuPerTask!),
          gpusPerTask: details.gpuPerTask!,
        },
        input: {
          http: {
            url: details.archiveLink!,
          },
        },
        steps: [
          {
            name: 'urs',
            run: {
              container: {
                x11: true,
                deepsquareHosted: true,
                apptainer: true,
                registry: 'registry-1.deepsquare.run',
                image: 'library/tdp:latest',
              },
              resources: {
                tasks: 1,
                cpusPerTask: 4,
                memPerCpu: 4096,
                gpusPerTask: 1,
              },
              command: dedent(`
                    $DEEPSQUARE_INPUT/${details.binaryPath} \
                      ${details.additionalArgs ?? ''}`),
            },
          },
        ],
      };
      break;
    case WorkloadType.CONTAINER:
      job = {
        enableLogging: true,
        env: details.envVars,
        resources: {
          tasks: 1,
          cpusPerTask: details.cpuPerTask!,
          memPerCpu: Math.round(details.memPerCpu! / details.cpuPerTask!),
          gpusPerTask: details.gpuPerTask!,
        },
        input: details.inputData
          ? {
              http: details.inputData.type === StorageType.HTTP ? { url: details.inputData.url } : undefined,
              s3:
                details.inputData.type === StorageType.S3
                  ? {
                      region: details.inputData.region!,
                      bucketUrl: `s3://${details.inputData.bucketName}`,
                      path: formatPath(details.inputData.path!),
                      accessKeyId: details.inputData.accessToken!,
                      secretAccessKey: details.inputData.secretToken!,
                      endpointUrl: details.inputData.url,
                    }
                  : undefined,
            }
          : undefined,
        output: details.outputData
          ? {
              http: details.outputData.type === StorageType.HTTP ? { url: details.outputData.url } : undefined,
              s3:
                details.outputData.type === StorageType.S3
                  ? {
                      region: details.outputData.region!,
                      bucketUrl: `s3://${details.outputData.bucketName}`,
                      path: formatPath(details.outputData.path!),
                      accessKeyId: details.outputData.accessToken!,
                      secretAccessKey: details.outputData.secretToken!,
                      endpointUrl: details.outputData.url,
                      deleteSync: details.outputData.deleteSync,
                    }
                  : undefined,
            }
          : undefined,
        steps: [
          {
            name: 'container',
            run: {
              container: {
                registry: details.containerUrl,
                image: details.containerImage!,
                username: details.containerUser,
                password: details.containerPassword,
                x11: details.x11,
                deepsquareHosted: details.useDeepsquareHostedImage,
                apptainer: details.useApptainerRuntime,
              },
              disableCpuBinding: details.disableCpuBinding,
              resources: {
                tasks: 1,
                cpusPerTask: details.cpuPerTask!,
                memPerCpu: details.memPerCpu!,
                gpusPerTask: details.gpuPerTask!,
              },
              command: dedent(details.command!),
            },
          },
        ],
      };
      break;
    case WorkloadType.UPSCALING:
      job = {
        enableLogging: true,
        resources: {
          tasks: details.isVideo ? 4 : 1,
          cpusPerTask: 8,
          memPerCpu: 8000,
          gpusPerTask: 1,
        },
        env: [
          { key: 'IS_VIDEO', value: details.isVideo!.toString() },
          { key: 'IS_FACE', value: 'false' },
          {
            key: 'IS_ANIME',
            value: details.isAnime!.toString(),
          },
        ],
        input: details.inputData
          ? {
              http: details.inputData.type === StorageType.HTTP ? { url: details.inputData.url } : undefined,
              s3:
                details.inputData.type === StorageType.S3
                  ? {
                      region: details.inputData.region!,
                      bucketUrl: `s3://${details.inputData.bucketName}`,
                      path: formatPath(details.inputData.path!),
                      accessKeyId: details.inputData.accessToken!,
                      secretAccessKey: details.inputData.secretToken!,
                      endpointUrl: details.inputData.url,
                    }
                  : undefined,
            }
          : undefined,
        output: details.outputData
          ? {
              http: details.outputData.type === StorageType.HTTP ? { url: details.outputData.url } : undefined,
              s3:
                details.outputData.type === StorageType.S3
                  ? {
                      region: details.outputData.region!,
                      bucketUrl: `s3://${details.outputData.bucketName}`,
                      path: formatPath(details.outputData.path!),
                      accessKeyId: details.outputData.accessToken!,
                      secretAccessKey: details.outputData.secretToken!,
                      endpointUrl: details.outputData.url,
                      deleteSync: details.outputData.deleteSync,
                    }
                  : undefined,
            }
          : undefined,
        continuousOutputSync: true,
        steps: [
          {
            name: 'compute-frames',
            run: {
              container: {
                deepsquareHosted: true,
                apptainer: true,
                registry: 'registry-1.deepsquare.run',
                image: 'library/upscaling:latest',
              },
              resources: {
                tasks: 1,
                cpusPerTask: 8,
                memPerCpu: 8000,
                gpusPerTask: 0,
              },
              shell: '/bin/bash',
              command: dedent(`set -e
                  rm -rf "\${STORAGE_PATH}/input_frames/"
                  rm -rf "\${STORAGE_PATH}/input_video/"
                  mkdir -p "\${STORAGE_PATH}/input_frames/"
                  mkdir -p "\${STORAGE_PATH}/output_frames/"
                  videosFound="$(find "\${DEEPSQUARE_INPUT}" -maxdepth 1 -type f -exec file -N -i -- {} + | sed -n 's!: video/[^:]*$!!p' | wc -l)"
                  imagesFound="$(find "\${DEEPSQUARE_INPUT}" -maxdepth 1 -type f -exec file -N -i -- {} + | sed -n 's!: image/[^:]*$!!p' | wc -l)"
                  if "\${IS_VIDEO}"; then
                    if [[ \${videosFound} -ge "1" ]]; then
                      mkdir -p "\${STORAGE_PATH}/input_video/"
                      #Only consider the first video on the list
                      videoSourceFile="$(find "\${DEEPSQUARE_INPUT}" -maxdepth 1 -type f -exec file -N -i -- {} + | sed -n 's!: video/[^:]*$!!p' | head -1)"
                      source_fps="$(ffmpeg -i "\${videoSourceFile}" 2>&1 | sed -n "s/.*, \\(.*\\) fp.*/\\1/p")"
                      #Only take the first 5 minutes
                      ffmpeg -ss 00:00 -accurate_seek -t 05:00 -i "\${videoSourceFile}" -c:v libx264 -crf "\${source_fps}" -c:a aac "\${STORAGE_PATH}/input_video/input_video_trimmed.mp4"
                      #Extract all the frames
                      ffmpeg -i "\${STORAGE_PATH}/input_video/input_video_trimmed.mp4" -qscale:v 1 -qmin 1 -qmax 1 -vsync 0 "\${STORAGE_PATH}/input_frames/frame%08d.png"
                    else
                        echo "No input video found, exiting" && exit 1
                    fi
                  else
                    if [[ \${imagesFound} -ge "1" ]]; then
                      find "\${DEEPSQUARE_INPUT}" -maxdepth 1 -type f -exec file -N -i -- {} + | sed -n 's!: image/[^:]*$!!p' | xargs -I{} cp "{}" "\${STORAGE_PATH}/input_frames/" || (echo "Zero picture found" && exit 1)
                    else
                      echo "No input picture found, exiting" && exit 1
                    fi
                  fi
                  totalFrames=$(find "\${STORAGE_PATH}/input_frames/" -type f | wc -l)
                  framesPerTask=$(( (totalFrames + NTASKS -1) /NTASKS))
                  for i in $(seq 1 "$NTASKS"); do
                    cd "\${STORAGE_PATH}/input_frames/"
                    mkdir -p "\${STORAGE_PATH}/input_frames/batch-\${i}"
                    if "\${IS_VIDEO}"; then
                      mv $(find . -maxdepth 1 -type f -exec file -N -i -- {} + | sed -n 's!: image/[^:]*$!!p' | head -\${framesPerTask}) "\${STORAGE_PATH}/input_frames/batch-\${i}/"
                    else
                      find . -maxdepth 1 -type f -exec file -N -i -- {} + | sed -n 's!: image/[^:]*$!!p' | head -\${framesPerTask} | while IFS= read -r file; do
                        mv "$file" "\${STORAGE_PATH}/input_frames/batch-\${i}/"
                      done
                    fi

                    cd -
                  done
                  `),
            },
          },
          {
            name: 'upscaling-loop',
            for: {
              parallel: true,
              range: {
                begin: 1,
                end: details.isVideo ? 4 : 1,
              },
              steps: [
                {
                  name: 'upscale',
                  run: {
                    container: {
                      deepsquareHosted: true,
                      apptainer: true,
                      registry: 'registry-1.deepsquare.run',
                      image: 'library/upscaling:latest',
                    },
                    resources: {
                      tasks: 1,
                      cpusPerTask: 8,
                      memPerCpu: 8000,
                      gpusPerTask: 1,
                    },
                    shell: '/bin/bash',
                    command: dedent(`
                              set -e

                              echo "Upscaling batch \${index}"
                              /opt/Real-ESRGAN/upscale.sh "\${STORAGE_PATH}/input_frames/batch-\${index}"
                            `),
                  },
                },
              ],
            },
          },
          ...(details.isVideo
            ? [
                {
                  name: 're-encode-video',
                  run: {
                    container: {
                      deepsquareHosted: true,
                      apptainer: true,
                      registry: 'registry-1.deepsquare.run',
                      image: 'library/upscaling:latest',
                    },
                    resources: {
                      tasks: 1,
                      cpusPerTask: 8,
                      memPerCpu: 8000,
                      gpusPerTask: 0,
                    },
                    command: dedent(`
                          set -e
                          source_fps="$(ffmpeg -i "\${STORAGE_PATH}/input_video/input_video_trimmed.mp4" 2>&1 | sed -n "s/.*, \\(.*\\) fp.*/\\1/p")"
                          ffmpeg -r "\${source_fps}" -i "\${STORAGE_PATH}/output_frames/frame%08d_out.png" -i "\${STORAGE_PATH}/input_video/input_video_trimmed.mp4" -map 0:v:0 -map "1:a:0?" -c:a copy -c:v libx264 -r "\${source_fps}" -pix_fmt yuv420p "\${DEEPSQUARE_OUTPUT}/result.mp4"
                        `),
                  },
                },
              ]
            : []),
        ],
      };
      break;
    case WorkloadType.TEXTTOIMAGE:
      job = {
        enableLogging: true,
        resources: {
          tasks: 4,
          cpusPerTask: 8,
          memPerCpu: 8000,
          gpusPerTask: 1,
        },
        env: [
          {
            key: 'STEPS',
            value: details.steps!,
          },
          {
            key: 'HEIGHT',
            value: details.height!,
          },
          {
            key: 'WIDTH',
            value: details.width!,
          },
          {
            key: 'MODEL',
            value: Object.keys(TextToImageModel)[Object.values(TextToImageModel).indexOf(details.ttiModel!)],
          },
          {
            key: 'ITER',
            value: '1',
          },
          {
            key: 'SAMPLES',
            value: '3',
          },
          {
            key: 'PROMPT',
            value: details.tti!,
          },
        ],
        output: details.outputData
          ? {
              http: details.outputData.type === StorageType.HTTP ? { url: details.outputData.url } : undefined,
              s3:
                details.outputData.type === StorageType.S3
                  ? {
                      region: details.outputData.region!,
                      bucketUrl: `s3://${details.outputData.bucketName}`,
                      path: formatPath(details.outputData.path!),
                      accessKeyId: details.outputData.accessToken!,
                      secretAccessKey: details.outputData.secretToken!,
                      endpointUrl: details.outputData.url,
                      deleteSync: details.outputData.deleteSync,
                    }
                  : undefined,
            }
          : undefined,
        continuousOutputSync: true,
        steps: [
          {
            name: 'generation-loop',
            for: {
              parallel: true,
              range: {
                begin: 1,
                end: 4,
              },
              steps: [
                {
                  name: 'generate-images',
                  run: {
                    container: {
                      deepsquareHosted: true,
                      apptainer: true,
                      registry: 'registry-1.deepsquare.run',
                      image: 'library/stable-diffusion:latest',
                      mounts: [
                        {
                          hostDir: '/opt/models/stable-diffusion',
                          containerDir: '/models',
                          options: 'ro',
                        },
                      ],
                    },
                    resources: {
                      tasks: 1,
                      cpusPerTask: 8,
                      memPerCpu: 8000,
                      gpusPerTask: 1,
                    },
                    env: [
                      {
                        key: 'HF_HOME',
                        value: '/deepsquare/tmp',
                      },
                    ],
                    shell: '/bin/bash',
                    command: dedent(`set -e

                        mkdir -p "\${STORAGE_PATH}/batch-\${index}"
                        params=(
                          "--ckpt" "/models/$MODEL/model.ckpt"
                          "--outdir" "\${STORAGE_PATH}/batch-\${index}"
                          "--H" "$HEIGHT"
                          "--W" "$WIDTH"
                          "--steps" "$STEPS"
                          "--n_iter" "$ITER"
                          "--device" "cuda"
                          "--n_samples" "$SAMPLES"
                          "--seed" "$(od -N 4 -t uL -An /dev/urandom | tr -d " ")"
                          "--prompt" "$PROMPT"
                        )
                        if [ -f "/models/$MODEL/config.yaml" ]; then
                          params+=("--config" "/models/$MODEL/config.yaml")
                        fi

                        python /stablediffusion/scripts/txt2img.py "\${params[@]}"
                        cd "\${STORAGE_PATH}/batch-\${index}"
                        find . -type f -not -name "grid*.png" -exec sh -c 'i="$1"; mv "$i" "$(md5sum "$i" | cut -d " " -f 1 | cut -c -12).png"' shell "{}" \\;
                        mv grid*.png "grid_\${index}.png"`),
                  },
                },
              ],
            },
          },
          {
            name: 'final-step',
            run: {
              container: {
                deepsquareHosted: true,
                apptainer: true,
                registry: 'registry-1.deepsquare.run',
                image: 'library/stable-diffusion:latest',
              },
              resources: {
                tasks: 1,
                cpusPerTask: 8,
                memPerCpu: 8000,
                gpusPerTask: 1,
              },
              shell: '/bin/bash',
              command: dedent(`set -e
                  cd "\${STORAGE_PATH}"
                  mv $(find . -maxdepth 2 -type f | grep ".png") "$DEEPSQUARE_OUTPUT"
                  cd "$DEEPSQUARE_OUTPUT"
                  convert -append grid*.png ./results_grid.png
                  rm grid*.png
                  echo "\${PROMPT}" > input.txt
                  echo "##############################################################"
                  echo
                  echo "Input:"
                  echo "\${PROMPT}"
                  echo
                  echo "Click on this link to preview your results:"
                  curl -sS --upload-file "./results_grid.png" https://transfer.deepsquare.run/
                  echo
                  echo
                  echo "##############################################################"

                  chmod -R 777 /cache/* 2>/dev/null || true
                  `),
            },
          },
        ],
      };
      break;
    default:
      throw new Error('Unknown job type');
  }
  return job;
}

function formatPath(raw: string): string {
  return (raw.startsWith('/') ? '' : '/') + raw + (raw.endsWith('/') ? '' : '/');
}
