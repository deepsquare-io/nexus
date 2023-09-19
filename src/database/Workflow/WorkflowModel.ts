// Copyright 2023 Deepsquare Association
// This file is part of Foobar.
// Foobar is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
// Foobar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with Foobar. If not, see <https://www.gnu.org/licenses/>.
import type { Model } from 'mongoose';
import { model, models, Schema } from 'mongoose';
import { v4 } from 'uuid';
import type Workflow from './Workflow';

export const WorkflowSchema = new Schema<Workflow>({
  _id: { type: String, default: v4 },
  name: { type: String, required: true },
  userId: { type: String, required: true },
  content: { type: String, required: true },
  public: { type: Boolean, default: false },
});

const WorkflowModel: Model<Workflow> = models.Workflow ?? model('Workflow', WorkflowSchema, 'workflows');

export default WorkflowModel;
