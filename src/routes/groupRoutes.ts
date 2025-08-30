import { Router } from 'express';
import { createGroup, deleteGroup, getGroup, getGroupMembers, getGroups } from '../controllers/groupController';
import { getGroupMember } from '../controllers/memberController';

const router = Router();

// post group
router.post('/create', createGroup);

// get all groups
router.get('/groups', getGroups);

//get single group by id
router.get('/:groupId', getGroup);

// delete group
router.delete('/:groupId', deleteGroup);

//get group members 
router.get('/members/:groupId', getGroupMembers);

export default router;
