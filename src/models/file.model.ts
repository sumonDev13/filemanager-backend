import { Schema, model, Document } from 'mongoose';

export interface IFile extends Document {
  name: string;
  url: string;
  size: number;
  type: string;
  folder: Schema.Types.ObjectId;
  owner: Schema.Types.ObjectId;
  parentFolder?: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FileSchema = new Schema<IFile>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    folder: { type: Schema.Types.ObjectId, ref: 'Folder', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    parentFolder: { type: Schema.Types.ObjectId, ref: 'Folder' },
  },
  { timestamps: true }
);

export default model<IFile>('File', FileSchema);