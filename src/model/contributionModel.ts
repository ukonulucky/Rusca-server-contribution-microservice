import mongoose, { Schema, Document } from 'mongoose';
import { IContribution } from '../types/appTypes';

const ContributionSchema: Schema = new Schema({
  memberId: { type: Schema.Types.ObjectId, ref: 'Member', required: true },
  groupId: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
  amount: { type: Number, required: true },
  contributionDate: { type: Date, default: Date.now }
});

const ContributionModel = mongoose.model<IContribution>('Contribution', ContributionSchema)
export default ContributionModel;
