import { Schema, model, Document } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  owner: Schema.Types.ObjectId;
  parentFolder?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FolderSchema = new Schema<IFolder>(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentFolder: { type: Schema.Types.ObjectId, ref: 'Folder' },
  },
  { timestamps: true }
);

export default model<IFolder>('Folder', FolderSchema);