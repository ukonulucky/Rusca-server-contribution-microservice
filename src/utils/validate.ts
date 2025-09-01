import Joi from "joi"
import {createGroupValidationType, groupMemberValidationType } from "../types/appTypes"


export const createGroupValidation = (data:createGroupValidationType) => { 
  if (!data) {
    return {
      error: { details: [{ message: "Request body cannot be empty" }] }
    };
  }
  
const schema = Joi.object({
    groupName: Joi.string().required(),
    numberOfMembers:Joi.string().required(),
    monthlyContribution: Joi.string().required(),

})

return schema.validate(data)
}
export const addGroupMemberValidation = (data:groupMemberValidationType) => { 
  if (!data) {
    return {
      error: { details: [{ message: "Request body cannot be empty" }] }
    };
  }
  
const schema = Joi.object({
    groupId:Joi.string().required()

})

return schema.validate(data)
}