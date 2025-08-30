import { Request, RequestHandler, Response } from 'express';
import GroupModel from '../model/groupSchema';
import logger from '../utils/logger';
import { createGroupValidation } from '../utils/validate';
import { isValidObjectId } from 'mongoose';
import MemberModel from '../model/memberModelSchema';



// create group controller
export const createGroup:RequestHandler = async (req: Request, res: Response) => {
    try {
        logger.info(
            "user hit the create group controller",
          );
        const { error } = createGroupValidation(req.body);
        if (error) {
            logger.error(
                "user hit the create group controller with error", error,
              );
          res.status(400).json({
            message: error.details[0].message,
            status: false,
          });
          return;
        }

        const { groupName, numberOfMembers, monthlyContribution } = req.body;
        logger.info("creating a new group")
        const newGroup = new GroupModel({ groupName, numberOfMembers, monthlyContribution });
        
        await newGroup.save();
        logger.info("new group created with group name", newGroup.groupName)
    res.status(201).json({ message: 'Group created successfully', group: newGroup });
  } catch (err) {
      logger.error(err)
      if (err instanceof Error) {
        logger.error(err.message)
          res.status(500).json({ 
              message: err.message,
              status: false
        });
      
      } else {
        res.status(500).json({ 
            message: "Internal server error",
            status: false
      });
      }
   
  }
};


// get all groups
export const getGroups = async (req: Request, res: Response) => {

    try {
      logger.info("user hits the getGroups controller")
        const groups = await GroupModel.find({});
        logger.info("user fetched all groups controller")
        res.status(200).json({
            message: "Groups fetched successfully",
            status: false,
            data: groups
        });
  } catch (err) {
    logger.error(err)
      if (err instanceof Error) {
        logger.error(err.message)
          res.status(500).json({ 
              message: err.message,
              status: false
        });
      
      } else {
        res.status(500).json({ 
            message: "Internal server error",
            status: false
      });
      }
   
  
  }
};

// get single group controller
export const getGroup = async (req: Request, res: Response) => {

    try {
        logger.info("user hits the getGroup controller")
      const { groupId } = req.params
      console.log("groupId", groupId)

            const isIdVallid = isValidObjectId(groupId.toString());
            if (!groupId || !isIdVallid) {
              return res.status(404).json({
                status: "false",
                message: "Group id invalid/notfound",
              });
            }
      const group = await GroupModel.findById(groupId);
      if (!group) { 
  return res.status(200).json({
    message: "Group not found",
    status: false
});
      }
      logger.info("group fetched", group)
      
    res.status(200).json({
        message: "Group fetched successfully",
        status: true,
        data: group
    });
  } catch (err) {
    logger.error(err)
      if (err instanceof Error) {
        logger.error(err.message)
          res.status(500).json({ 
              message: err.message,
              status: false
        });
      
      } else {
        logger.error(err)
        if (err instanceof Error) {
          logger.error(err.message)
            res.status(500).json({ 
                message: err.message,
                status: false
          });
        
        } else {
          res.status(500).json({ 
              message: "Internal server error",
              status: false
        });
        }
      }
   
  
  }
};


// delete single group
export const deleteGroup = async (req: Request, res: Response) => {

    try {
        logger.info("user hits the delteGroup controller")
      const { groupId } = req.params
       
            const isIdVallid = isValidObjectId(groupId.toString());
            if (!groupId || !isIdVallid) {
              return res.status(404).json({
                status: "false",
                message: "User id not found",
              });
            }
      const group = await GroupModel.findByIdAndDelete(groupId);
      if (!group) { 
        return   res.status(200).json({
          message: "Group not found",
          status: false
      });
      }
      logger.info("group deleted:", group)
      
    res.status(200).json({
        message: "Group deleted successfully",
        status: false,
        data: group
    });
  } catch (err) {
    logger.error(err)
      if (err instanceof Error) {
        logger.error(err.message)
          res.status(500).json({ 
              message: err.message,
              status: false
        });
      
      } else {
        logger.error(err)
        if (err instanceof Error) {
          logger.error(err.message)
            res.status(500).json({ 
                message: err.message,
                status: false
          });
        
        } else {
          res.status(500).json({ 
              message: "Internal server error",
              status: false
        });
        }
      }
   
  
  }
};


// get all members associated with a group

export const getGroupMembers = async (req: Request, res: Response) => {

  try {
      logger.info("user hits the delteGroup controller")
    const { groupId } = req.params
     
          const isIdVallid = isValidObjectId(groupId.toString());
          if (!groupId || !isIdVallid) {
            return res.status(404).json({
              status: "false",
              message: "User id not found",
            });
          }
    // returns all the members in a given grou using the group id
    const group = await MemberModel.find({
     groupId 
    });
    if (!group) { 
      return   res.status(200).json({
        message: "Group not found",
        status: false
    });
    }
    logger.info("group deleted:", group)
    
  res.status(200).json({
      message: "Group members fetched successfully",
      status: false,
      data: group
  });
} catch (err) {
  logger.error(err)
    if (err instanceof Error) {
      logger.error(err.message)
        res.status(500).json({ 
            message: err.message,
            status: false
      });
    
    } else {
      logger.error(err)
      if (err instanceof Error) {
        logger.error(err.message)
          res.status(500).json({ 
              message: err.message,
              status: false
        });
      
      } else {
        res.status(500).json({ 
            message: "Internal server error",
            status: false
      });
      }
    }
 

}
};