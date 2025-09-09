import GroupModel from "../model/groupSchema";
import MemberModel from "../model/memberModelSchema";
import logger from "./logger";

export const updateMemberPaymentFunc = async (
    { email,
        description,
        amount }: {
            email: string,
      description: string,
      amount: number
        }
  ) => {
  
   
    try {
      logger.info("user hit the update member payment function");
      const getGroupName = description.split(" ")[3]
      console.log("groupName", getGroupName)
      const data = await GroupModel.aggregate([
        {
          $match: { groupName: getGroupName }
        },
        {
          $lookup: {
            from: 'users',            // Name of the user collection
            localField: 'groupMembersId',  // Field in Group to match
            foreignField: '_id',      // Field in User to match
            as: 'members'             // Field in Group to store matched users
          }
        },
        {
          $unwind: '$members'         // Unwind the users (to access them individually)
        },
        {
          $match: { 'members.email': email } // Filter by email
        }
      ]);
  
      // update the payment for the user
   const updatedMember =   await MemberModel.findOneAndUpdate({
        userId: data[0].members._id,
        groupId:data[0]._id
   }, {
     $push: {
       contribution: {
        contributionAmount: amount,
        contributionDate: new Date()
       }
     }
   }, {
     new: true
   })
      logger.info("User payment updated",updatedMember)
     
    } catch (err: any) {
      logger.error(err);
     console.log("error at update user payment", err)
      throw new Error(err)
    }
  };