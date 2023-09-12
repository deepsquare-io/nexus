// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
import { injectable } from 'tsyringe';
import { Args, ArgsType, Field, Mutation, Resolver } from 'type-graphql';
import Auth from '@graphql/internal/context/decorator/Auth';
import { type User } from '../../../database/User/User';
import WorkflowModel from '../../../database/Workflow/WorkflowModel';

@ArgsType()
class SaveWorkflowArgs {
  @Field()
  content!: string;

  @Field({ nullable: true })
  workflowId?: string | null;
}

@injectable()
@Resolver()
export default class SaveWorkflowMutation {
  @Mutation(() => Boolean)
  async saveWorkflow(@Auth user: User, @Args() { content, workflowId }: SaveWorkflowArgs) {
    const existing = await WorkflowModel.findById(workflowId);
    if (!existing) {
      await WorkflowModel.create({ content, userId: user._id });
    } else {
      if (existing.userId !== user._id) throw new Error('Workflow does not belong to logged user');
      existing.content = content;
      await existing.save();
    }
    return true;
  }
}
