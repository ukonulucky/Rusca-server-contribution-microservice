import { Router } from 'express';
import { createGroup, deleteGroup, getGroup, getGroupMembers, getGroups } from '../controllers/groupController';

const groupRouter = Router();

// post group
groupRouter.post('/create', createGroup);

// get all groups
groupRouter.get('/groups', getGroups);

//get single group by id
groupRouter.get('/:groupId', getGroup);

// delete group
groupRouter.delete('/:groupId', deleteGroup);

//get group members 
groupRouter.get('/members/:groupId', getGroupMembers);

export default groupRouter;
