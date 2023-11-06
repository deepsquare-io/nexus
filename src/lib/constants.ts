// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.

export const JWT_STORAGE_KEY = 'nexus-jwt';

export const defaultJobContent = `## See: https://docs.deepsquare.run/workflow/workflow-api-reference/job

## Allow DeepSquare logging
enableLogging: true

## Allocate resources
resources:
  ## A task is one process. Multiple task will allocate multiple processes.
  tasks: 1
  ## Number of cpu physical thread per process.
  cpusPerTask: 1
  ## Memory (MB) per cpu physical thread.
  memPerCpu: 200
  ## GPU (graphical process unit) per process.
  gpusPerTask: 0

## The job content
steps:
  ## The steps of the jobs which are run sequentially.
  - name: 'hello-world'
    run:
      container:
        image: ubuntu:latest
      command: echo "hello world"
`;
