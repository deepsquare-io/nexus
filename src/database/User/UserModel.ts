import type { Document, Model } from 'mongoose';
import { model, models, Schema } from 'mongoose';
import type User from './User';

export type UserDocument = User & Document<string>;

export const UserSchema = new Schema<UserDocument>({
  _id: { type: String, unique: true, immutable: true },
  jobs: { type: [String] },
});

const UserModel = models.User ?? model<UserDocument>('User', UserSchema, 'users');

export default UserModel as Model<UserDocument>;
