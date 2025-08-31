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
  default: []
  },
  monthlyContribution: { type: Number, required: true },
  status: { type: String, default: 'active' },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps:true
});




const GroupModel = mongoose.model('Group', GroupSchema);
export default GroupModel;
