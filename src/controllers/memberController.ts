import { Request, RequestHandler, Response } from "express";
import GroupModel from "../model/groupSchema";
import logger from "../utils/logger";
import {
  addGroupMemberValidation
} from "../utils/validate";
import { isValidObjectId, Types } from "mongoose";
import MemberModel from "../model/memberModelSchema";



// add member controller
export const addMemberController: RequestHandler = async (
  req,
  res
) => {
  try {
    logger.info("user hit the add group member controller");
    const userid = req.headers.userid
 
    const { error } = addGroupMemberValidation(req.body);
    if (error) {
      logger.error(
        "user hit the add group member controller with error",
        error
      );
      res.status(400).json({
        message: error.details[0].message,
        status: false,
      });
      return;
    }
    const {  groupId } = req.body;

    const isIdVallid = isValidObjectId(groupId.toString());
    if (!groupId || !isIdVallid) {
      return res.status(404).json({
        status: "false",
        message: "Group id invalid/notfound",
      });
    }
    // check if the group exist
    const group = await GroupModel.findById(groupId);

    if (!group) {
      logger.warn(
        "attempt to add user to group that doesn't exist, with Id",
        groupId
      );
      return res
        .status(404)
        .json({ message: "Group not found", status: false });
    }

    // check if group is alresdy filled
    const { numberOfMembers, groupMembersId } = group;
  
    if ((groupMembersId as Types.ObjectId[]).length === numberOfMembers) {
      return res.status(409).json({
        message: "Group allready filled",
        status: false,
      });
    }

    // check if user already exist in the group
    logger.info("checking if user already exist in group");
    console.log("userid:", userid, "groupId:", groupId);
    const isUserPresent = await MemberModel.findOne({
      $and: [{ userId: userid }, { groupId }],
    });
    console.log("isUserPresent:", isUserPresent)
    if (isUserPresent) {
      return res.status(409).json({
        status: false,
        message: "Member already exist in group",
        groupMembersId,
        numberOfMembers
      });
    }

    // adding a user to a group
    const member = new MemberModel({ userId:userid, groupId });
    await member.save();

    // update the group

   const updatedGroup = await GroupModel.findByIdAndUpdate(groupId, {
     $addToSet: { groupMembersId: userid } 
   }, {
     new : true
   });
    logger.info(`user with id ${userid} is added to group ${group.groupName}`);
    res
      .status(201)
      .json({
        message: "Member added successfully",
        data: member,
       updatedGroup,
        status: true,
      });
  } catch (err) {
    logger.error(err);
    if (err instanceof Error) {
      logger.error(err.message);
      res.status(500).json({
        message: err.message,
        status: false,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    }
  }
};

// get member 
export const getGroupMember = async (req: Request, res: Response) => {
  try {
    logger.info("user hits the getGroup controller");
    const { memberId } = req.params;

    const isIdValid = isValidObjectId(memberId.toString());
    if (!memberId || !isIdValid) {
      return res.status(404).json({
        status: "false",
        message: "Invalid/missing member Id",
      });
    }

    const member = await MemberModel.findById(memberId);
    if (!member) {
      logger.info("intended member not found in Db", member);
      return res.status(200).json({
        message: "Member not found",
        status: false,
      });
    }
    logger.info("group fetched", member);
    res.status(200).json({
      message: "Member fetched successfully",
      status: false,
      data: member,
    });
  } catch (err) {
    logger.error(err);
    if (err instanceof Error) {
      logger.error(err.message);
      res.status(500).json({
        message: err.message,
        status: false,
      });
    } else {
      logger.error(err);
      if (err instanceof Error) {
        logger.error(err.message);
        res.status(500).json({
          message: err.message,
          status: false,
        });
      } else {
        res.status(500).json({
          message: "Internal server error",
          status: false,
        });
      }
    }
  }
};

// delete a member from a group
export const deleteGroupMember = async (req: Request, res: Response) => {
  try {
    logger.info("user hits the delteGroup controller");
    const { memberId } = req.params;

    const isIdVallid = isValidObjectId(memberId.toString());

    if (!memberId || !isIdVallid) {
      return res.status(404).json({
        status: "false",
        message: "Group id invalid/notfound",
      });
    }
    const member = await MemberModel.findByIdAndDelete(memberId);
    logger.info("member deleted from a group:", member);
    if (!member) {
      return res.status(404).json({
        message: "member not found",
        status: false,
        member
      });
    }
      logger.warn("intending member to delete not found in DB");
    logger.info("attempt to remove membersId from group")
    await GroupModel.findByIdAndUpdate(member._id, {
      $pull: {
        groupMembersId:memberId
      }
    });
    
    logger.info("removed members Id from group")

    res.status(200).json({
      message: "Member deleted successfully",
      status: false,
      data: member,
    });
  } catch (err) {
    logger.error(err);
    if (err instanceof Error) {
      logger.error(err.message);
      res.status(500).json({
        message: err.message,
        status: false,
      });
    } else {
      logger.error(err);
      if (err instanceof Error) {
        logger.error(err.message);
        res.status(500).json({
          message: err.message,
          status: false,
        });
      } else {
        res.status(500).json({
          message: "Internal server error",
          status: false,
        });
      }
    }
  }
};

// get All members
export const getAllMembers = async (req: Request, res: Response) => {
  try {
    logger.info("user hits the getAllMembers controller");

    const members = await MemberModel.find({});
    logger.info("All members fetched from Db");

    res.status(200).json({
      message: "Members fetched successfully",
      status: false,
      data: members,
    });
  } catch (err) {
    logger.error(err);
    if (err instanceof Error) {
      logger.error(err.message);
      res.status(500).json({
        message: err.message,
        status: false,
      });
    } else {
      logger.error(err);
      if (err instanceof Error) {
        logger.error(err.message);
        res.status(500).json({
          message: err.message,
          status: false,
        });
      } else {
        res.status(500).json({
          message: "Internal server error",
          status: false,
        });
      }
    }
  }
};


