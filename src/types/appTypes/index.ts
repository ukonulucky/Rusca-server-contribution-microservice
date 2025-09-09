import mongoose from "mongoose"
import { Request } from "express"

export type MongooseIdType = mongoose.Types.ObjectId;
export interface  requestIpType extends Request { 
    clientIp:string
}

export interface IGroup extends Document {
    groupName: string;
    numberOfMembers: number;
    monthlyContribution: number;
  status: "active" | "pending" | "suspended",
  groupMembersId: MongooseIdType[] | null,
  createdAt: Date
}
  

export interface contributionSchemaType extends Document { 
  contributionAmount: number,
    contributionDate: Date
}

export interface IMember extends Document {
    userId: MongooseIdType ;
    groupId: MongooseIdType;
  status: "active" | "pending" | "suspended";
  createdAt: Date,
  contribution: contributionSchemaType[]
  }


export interface IContribution extends Document {
    memberId: MongooseIdType ;
    groupId: MongooseIdType;
    amount: number;
    contributionDate: Date;
  }
  

  export interface createGroupValidationType{ 
    groupName: string,
    numberOfMembers : number
    monthlyContribution : number
  }
  export interface groupMemberValidationType{ 
    userId: MongooseIdType,
    groupId: MongooseIdType
  }

  export type updatePaymentType = {
    email: string
    amount:string, 
    description:string
}