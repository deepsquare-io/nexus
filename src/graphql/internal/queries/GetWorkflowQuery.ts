// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
import { injectable } from 'tsyringe';
import { Arg, Query, Resolver } from 'type-graphql';
import Auth from '@graphql/internal/context/decorator/Auth';
import { WorkflowNode } from '@graphql/internal/types/nodes/WorkflowNode';
import { type User } from '../../../database/User/User';
import WorkflowModel from '../../../database/Workflow/WorkflowModel';

@injectable()
@Resolver()
export default class GetWorkflowQuery {
  @Query(() => WorkflowNode, { nullable: true })
  async getWorkflow(@Arg('workflowId', () => String) workflowId: string, @Auth user: User) {
    const workflow = await WorkflowModel.findById(workflowId).lean().exec();
    if (workflow && !workflow.public && workflow.userId !== user._id) {
      return null;
    }
    return workflow;
  }
}
