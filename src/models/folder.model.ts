import { Schema, model, Document, Types } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  owner: Types.ObjectId; 
  parentFolder?: Types.ObjectId;
}

const folderSchema = new Schema<IFolder>({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  parentFolder: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
}, { timestamps: true });

export default model<IFolder>('Folder', folderSchema);