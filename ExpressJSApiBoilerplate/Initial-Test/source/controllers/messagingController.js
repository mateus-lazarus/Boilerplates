import BaseMessage from "../models/valueObjects/BaseMessage.js";
import { generateUUID } from "../utils/generateUuidUtils.js";
import { sendMessage, receiveMessages } from "../services/messageBrokerService.js";

export const sendMessagesEndpoint = async (req, res, next) => {
  try {
    const message = new BaseMessage(
      generateUUID(),
      generateUUID(),
      req.body,
      new Date()
    );

    await sendMessage(null, message)
    
    res.status(202).json({ message });
  } catch (error) {
    next(error);
  }
};


export const receiveMessagesEndpoint = async (req, res, next) => {
  try {
    const quantity = req.body.quantity ?? 10;

    const messagesReceived = await receiveMessages(null, quantity)
    const listOfMessages = [];

    for(let rawMessage of messagesReceived) {
      listOfMessages.push(
        {
          "messageId": rawMessage.messageId,
          "sessionId": rawMessage.sessionId,
          "body": rawMessage.body,
          "deliveryCount": rawMessage.deliveryCount,
          "contentType": rawMessage.contentType,
          "timeToLive": rawMessage.timeToLive
        }
      )
    }

    res.status(200).json({ "count": messagesReceived.length, "messages": listOfMessages });
  } catch (error) {
    next(error);
  }
};
