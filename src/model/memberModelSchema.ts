import mongoose, { Schema, Document } from 'mongoose';
import { IMember } from '../types/appTypes';

const MemberSchema: Schema = new Schema<IMember>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  status: { type: String, default: 'pending' }
});
const MemberModel =  mongoose.model('Member', MemberSchema)

export default MemberModel;
