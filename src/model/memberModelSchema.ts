import mongoose, { Schema } from 'mongoose';
import { contributionSchemaType, IMember } from '../types/appTypes';


const contributionSchema = new Schema<contributionSchemaType>({
  contributionAmount: {
    type: Number
  },
  contributionDate: {
    type: Date,
    default: Date.now
  }
})

const MemberSchema = new Schema<IMember>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  status: { type: String, default: 'pending' },
  createdAt: {
    type: Date, default: Date.now
  },
  contribution: {
    type: [{
      type:contributionSchema
    }],
    default: []
  }
}, {
  timestamps: true
});
const MemberModel =  mongoose.model('Member', MemberSchema)

export default MemberModel;
