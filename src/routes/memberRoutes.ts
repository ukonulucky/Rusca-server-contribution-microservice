import { Router } from 'express';
import { activateGroupMemberController, addMemberController, deleteGroupMember, getAllMembers, getAllMembersDetails, getGroupMember, updateMemberPaymentController } from '../controllers/memberController';

const memberRouter = Router();
// add member to group
memberRouter.post('/addMember', addMemberController);

// get all members
memberRouter.get('/members/all', getAllMembers);

// get group member
memberRouter.get('/:memberId', getGroupMember);

// delete group member
memberRouter.delete('/:memberId', deleteGroupMember);

// updatePayment member
memberRouter.post('/updatePayment', updateMemberPaymentController);

memberRouter.get('/members/all/details', getAllMembersDetails);
memberRouter.get('/activate/:memberId', activateGroupMemberController);

export default memberRouter;
