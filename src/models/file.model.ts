import { Schema, model, Document, Types } from 'mongoose';

export interface IFile extends Document {
  name: string;
  path: string;
  mimetype: string;
  size: number;
  owner: Types.ObjectId;
  parentFolder?: Types.ObjectId;
}

const fileSchema = new Schema<IFile>({
  name: { type: String, required: true },
  path: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parentFolder: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
}, { timestamps: true });

export default model<IFile>('File', fileSchema);