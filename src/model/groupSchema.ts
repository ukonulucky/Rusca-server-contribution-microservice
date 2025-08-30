import mongoose, { Schema } from 'mongoose';
import { IGroup } from '../types/appTypes';


const GroupSchema: Schema = new Schema<IGroup>({
  groupName: { type: String, required: true },
  numberOfMembers: { type: Number, required: true, default: 0 },
  groupMembersId: {
    type: [{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
  }],
  required: true, 
  default: null, 
  },
  monthlyContribution: { type: Number, required: true },
  status: { type: String, default: 'active' }
});

const GroupModel = mongoose.model('Group', GroupSchema);
export default GroupModel;
