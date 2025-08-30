import { Router } from 'express';
import { createGroup, deleteGroup, getGroup, getGroups } from '../controllers/groupController';
import { addMemberController, deleteGroupMember, getAllMembers, getGroupMember } from '../controllers/memberController';

const memberRouter = Router();
// add member to group
memberRouter.post('/addMember', addMemberController);


// get all members
memberRouter.get('/members/all', getAllMembers);


// get group member
memberRouter.get('/:memberId', getGroupMember);

// delete group member
memberRouter.delete('/:memberId', deleteGroupMember);

export default memberRouter;
