import { FileUploader } from 'react-drag-drop-files';
import { Controller, useController, useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import SelectorField from '@components/forms/fields/SelectorField';
import TextField from '@components/forms/fields/TextField';
import type { WorkloadFormData } from '@lib/types/WorkloadFormData';
import StorageType from '@lib/types/enums/StorageType';
import { CloudUpload } from '@mui/icons-material';
import Alert from '@mui/material/Alert';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

interface StorageSubformProps {
  input: {
    noChoice?: boolean;

    disable?: boolean;

    defaultType: StorageType;
  };

  output: {
    noChoice?: boolean;

    disable?: boolean;

    defaultType: StorageType;
  };
}

function StorageSubform(props: StorageSubformProps) {
  const { control, setValue, getValues, formState, getFieldState } = useFormContext<WorkloadFormData>();
  const inputType = useWatch({ control, name: 'details.inputData.type' });
  const outputType = useWatch({ control, name: 'details.outputData.type' });
  const input = useWatch({ control, name: 'details.inputData' });
  const { error } = getFieldState('details.inputData', formState);
  useController({
    control,
    name: 'details.inputData.type',
    defaultValue: props.input.disable ? props.input.defaultType : undefined,
  });
  useController({
    control,
    name: 'details.outputData.type',
    defaultValue: props.output.disable ? props.output.defaultType : undefined,
  });
  useController({ control, name: 'details.inputData.path', defaultValue: '/' });
  useController({ control, name: 'details.outputData.path', defaultValue: '/output/' });
  const [sameOutputAsInput, setSameOutputAsInput] = useState<boolean>(true);
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const [disableOutput, setDisableOutput] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    setValue('details.outputData.type', props.output.defaultType);
    setValue('details.inputData.type', props.input.defaultType);
  }, [props.input.defaultType, props.output.defaultType, setValue]);

  useEffect(() => {
    setSameOutputAsInput(inputType === StorageType.S3 && outputType === StorageType.S3);
  }, [inputType, outputType]);

  useEffect(() => {
    if (disableInput) setValue('details.inputData', undefined);
  }, [disableInput, setValue]);

  useEffect(() => {
    if (disableOutput) setValue('details.outputData', undefined);
  }, [disableOutput, setValue]);

  useEffect(() => {
    if (sameOutputAsInput && outputType === StorageType.S3 && inputType === StorageType.S3) {
      const outputPath = getValues('details.outputData.path');
      if (input) {
        setValue('details.outputData', {
          type: StorageType.S3,
          url: input.url,
          region: input.region,
          bucketName: input.bucketName,
          accessToken: input.accessToken,
          secretToken: input.secretToken,
          path: outputPath!,
        });
      }
    }
  }, [getValues, input, inputType, outputType, sameOutputAsInput, setValue]);

  return (
    <>
      {!props.input.disable && (
        <>
          {!props.input.noChoice && <h2 className="font-medium m-0 mt-4">Input Storage</h2>}
          <Grid className="pt-5" container spacing={2.5} columns={2}>
            {!props.input.noChoice && (
              <Grid item xs={2}>
                <div>
                  <Checkbox
                    checked={disableInput}
                    onChange={(_, checked) => {
                      setDisableInput(checked);
                    }}
                  />
                  Disable input storage
                </div>
              </Grid>
            )}

            {!disableInput && (
              <>
                {!props.input.noChoice && (
                  <Grid item xs={2}>
                    <h4 className="m-0 font-normal">Storage type</h4>
                    <SelectorField
                      name="details.inputData.type"
                      control={control}
                      options={[StorageType.HTTP, StorageType.S3, StorageType.DRAG_DROP]}
                      disabled={disableInput}
                      InputLabelProps={disableInput ? { shrink: true } : {}}
                    ></SelectorField>
                  </Grid>
                )}

                {inputType === StorageType.DRAG_DROP ? (
                  <Grid item xs={2}>
                    <FileUploader
                      name="details.inputData.dragAndDropFile"
                      handleChange={(file: File) => {
                        setValue('details.inputData.dragAndDropFile', file);
                        setCurrentFile(file);
                      }}
                      maxSize={500}
                    >
                      <div
                        className={
                          'flex flex-col hover:cursor-pointer justify-center items-center content-center rounded-lg border-2 border-dashed h-48 ' +
                          (error ? 'border-red-500' : 'border-[#e0e0e0]')
                        }
                      >
                        {currentFile ? (
                          <>{currentFile.name}</>
                        ) : (
                          <>
                            <CloudUpload fontSize="large" />
                            {error ? (
                              <div className="text-red-500">Select a file or drag and drop here</div>
                            ) : (
                              <div>Select a file or drag and drop here</div>
                            )}

                            <div
                              style={{
                                paddingTop: '0.2em',
                                height: '14px',
                                fontFamily: 'Helvetica',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: '15.8px',
                                lineHeight: '14px',
                                color: 'rgba(0, 0, 0, 0.4)',
                                flex: 'none',
                                order: '1',
                                flexGrow: '0',
                              }}
                            >
                              Photo or video file no more than 500MB
                            </div>
                          </>
                        )}
                      </div>
                    </FileUploader>
                  </Grid>
                ) : (
                  <Grid item xs={1}>
                    <h4 className="m-0 font-normal">{inputType === StorageType.S3 ? 'S3 Endpoint' : 'URL'}</h4>
                    <TextField
                      name="details.inputData.url"
                      control={control}
                      disabled={disableInput}
                      InputLabelProps={disableInput ? { shrink: true } : {}}
                    />
                  </Grid>
                )}

                {inputType === StorageType.S3 && (
                  <>
                    <Grid item xs={1}>
                      <h4 className="m-0 font-normal">Region</h4>
                      <TextField
                        name="details.inputData.region"
                        control={control}
                        disabled={disableInput}
                        InputLabelProps={disableInput ? { shrink: true } : {}}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <h4 className="m-0 font-normal">Access token</h4>
                      <TextField
                        name="details.inputData.accessToken"
                        control={control}
                        disabled={disableInput}
                        InputLabelProps={disableInput ? { shrink: true } : {}}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <h4 className="m-0 font-normal">Secret token</h4>
                      <TextField
                        name="details.inputData.secretToken"
                        type="password"
                        control={control}
                        disabled={disableInput}
                        InputLabelProps={disableInput ? { shrink: true } : {}}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <h4 className="m-0 font-normal">Bucket name</h4>
                      <TextField
                        name="details.inputData.bucketName"
                        control={control}
                        disabled={disableInput}
                        InputLabelProps={disableInput ? { shrink: true } : {}}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <h4 className="m-0 font-normal">Path</h4>
                      <TextField
                        name="details.inputData.path"
                        control={control}
                        disabled={disableInput}
                        InputLabelProps={disableInput ? { shrink: true } : {}}
                      />
                    </Grid>
                  </>
                )}
              </>
            )}
          </Grid>
        </>
      )}

      {!props.output.disable && (
        <>
          {!props.output.noChoice && <h2 className="font-medium m-0 mt-4">Output Storage</h2>}
          <Grid className="pt-5" container spacing={2.5} columns={2}>
            {!props.output.noChoice && (
              <Grid item xs={1}>
                <div>
                  <Checkbox
                    checked={disableOutput}
                    onChange={(_, checked) => {
                      setDisableOutput(checked);
                    }}
                  />
                  Disable output storage
                </div>
              </Grid>
            )}
            {!disableOutput && (
              <>
                <Grid item xs={1}>
                  {inputType === StorageType.S3 && outputType === StorageType.S3 && (
                    <div>
                      <Checkbox
                        checked={!sameOutputAsInput}
                        disabled={disableOutput || disableInput}
                        onChange={(_, checked) => {
                          setSameOutputAsInput(!checked);
                        }}
                      />
                      Use a different bucket for output
                    </div>
                  )}
                </Grid>

                {!props.output.noChoice && (
                  <Grid item xs={2}>
                    <h4 className="m-0 font-normal">Storage type</h4>
                    <SelectorField
                      name="details.outputData.type"
                      control={control}
                      options={[StorageType.HTTP, StorageType.S3, StorageType.DEEPSQUARE]}
                      disabled={disableInput}
                      InputLabelProps={disableInput ? { shrink: true } : {}}
                    ></SelectorField>
                  </Grid>
                )}

                {outputType !== StorageType.DEEPSQUARE && (
                  <Grid item xs={1}>
                    <h4 className="m-0 font-normal">{outputType === StorageType.S3 ? 'S3 Endpoint' : 'URL'}</h4>
                    <TextField
                      name="details.outputData.url"
                      control={control}
                      disabled={sameOutputAsInput || disableOutput}
                      helperText={
                        outputType === StorageType.HTTP ? (
                          <>
                            You may use our self-hosted storage by using this URL : https://transfer.deepsquare.run
                            <br />
                            You will be able to download your results by browsing the link provided at the end of the
                            logs of this job. You can find your logs by browsing the job status dashboard and find the
                            job you just submitted.
                          </>
                        ) : null
                      }
                      InputLabelProps={sameOutputAsInput || disableOutput ? { shrink: true } : {}}
                    />
                  </Grid>
                )}
                {outputType === StorageType.S3 && (
                  <>
                    <Grid item xs={1}>
                      <h4 className="m-0 font-normal">Region</h4>
                      <TextField
                        name="details.outputData.region"
                        control={control}
                        disabled={sameOutputAsInput || disableOutput}
                        InputLabelProps={sameOutputAsInput || disableOutput ? { shrink: true } : {}}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <h4 className="m-0 font-normal">Access token</h4>
                      <TextField
                        name="details.outputData.accessToken"
                        control={control}
                        disabled={sameOutputAsInput || disableOutput}
                        InputLabelProps={sameOutputAsInput || disableOutput ? { shrink: true } : {}}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <h4 className="m-0 font-normal">Secret token</h4>
                      <TextField
                        name="details.outputData.secretToken"
                        type="password"
                        control={control}
                        disabled={sameOutputAsInput || disableOutput}
                        InputLabelProps={sameOutputAsInput || disableOutput ? { shrink: true } : {}}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <h4 className="m-0 font-normal">Bucket name</h4>
                      <TextField
                        name="details.outputData.bucketName"
                        control={control}
                        disabled={sameOutputAsInput || disableOutput}
                        InputLabelProps={sameOutputAsInput || disableOutput ? { shrink: true } : {}}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <h4 className="m-0 font-normal">Path</h4>
                      <TextField
                        name="details.outputData.path"
                        control={control}
                        disabled={disableOutput}
                        InputLabelProps={disableOutput ? { shrink: true } : {}}
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <div>
                        <Controller
                          name="details.outputData.deleteSync"
                          control={control}
                          render={({ field: props }) => <Checkbox {...props} checked={!!props.value} />}
                        />
                        Delete unwanted destination files
                      </div>
                      <Alert variant="outlined" severity="warning">
                        This option will remove all the files in the destination directory.
                      </Alert>
                    </Grid>
                  </>
                )}
              </>
            )}
          </Grid>
        </>
      )}
    </>
  );
}

export default StorageSubform;
