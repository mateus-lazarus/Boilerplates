import { send, createQueueSender, receive, createQueueReceiver } from "../utils/messageBrokerUtils.js";
import { isEmptyOrNull } from "../extensions/stringExtension.js";
import { createError } from "../utils/errorUtils.js";
import BaseMessage from "../models/valueObjects/BaseMessage.js";
import LogLevel from "../models/enums/LogLevel.js";
import azureBus from '@azure/service-bus';


/**
 * @param {azureBus.ServiceBusClientOptions} options
 * @returns {azureBus.ServiceBusSender}
 */
export function buildSender(connectionString, queueName, options) {
  connectionString ??= process.env.BROKER_CONNECTIONSTRING;
  queueName ??= process.env.BROKER_QUEUENAME;

  if (
    isEmptyOrNull(connectionString, 'connectionString')
    || isEmptyOrNull(queueName, 'queueName')
  ) {
    throw createError(
      422, 'Connection string or queue name was empty or null. Impossible to build message broker\' sender.'
    );
  }
  
  return createQueueSender(connectionString, queueName, options);
}


/**
 * @param {azureBus.ServiceBusSender} sender
 * @param {BaseMessage[]} messages
 * @param {LogLevel} logLevel
 * @returns {void}
 */
export async function sendMessages(sender, messages, infoLevel) {
  sender ??= buildSender();

  for(let message of messages) {
    await sendMessage(sender, message, infoLevel);
  }
}


/**
 * @param {azureBus.ServiceBusSender} sender
 * @param {BaseMessage} messages
 * @param {LogLevel} logLevel
 * @returns {Promise<void>}
 */
export async function sendMessage(sender, message, infoLevel) {
  sender ??= buildSender();

  return send(sender, message, infoLevel);
}


/**
 * @param {azureBus.ServiceBusClientOptions} options
 * @returns {azureBus.ServiceBusReceiver}
 */
export function buildReceiver(connectionString, queueName, options) {
  connectionString ??= process.env.BROKER_CONNECTIONSTRING;
  queueName ??= process.env.BROKER_QUEUENAME;

  if (
    isEmptyOrNull(connectionString, 'connectionString')
    || isEmptyOrNull(queueName, 'queueName')
  ) {
    throw createError(
      422, 'Connection string or queue name was empty or null. Impossible to build message broker\'s receiver.'
    );
  }

  return createQueueReceiver(connectionString, queueName, options);
}


/**
 * @param {azureBus.ServiceBusReceiver} receiver
 * @param {number} quantity
 * @returns {Promise<azureBus.ServiceBusReceivedMessage[]>}
 */
export function receiveMessages(receiver, quantity) {
  receiver ??= buildReceiver();

  return receive(receiver, quantity, 5000);
}
