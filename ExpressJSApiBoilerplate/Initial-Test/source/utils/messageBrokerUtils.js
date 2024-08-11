import BaseMessage from "../models/valueObjects/BaseMessage.js";
import LogLevel from "../models/enums/LogLevel.js";
import { createError } from "./errorUtils.js";
import azureBus from "@azure/service-bus";


/**
 * @param {string} connectionString
 * @param {string} queueName
 * @param {azureBus.ServiceBusClientOptions} options
 * @returns {azureBus.ServiceBusSender}
 */
export function createQueueSender(connectionString, queueName, options, infoLevel) {
  const client = new azureBus.ServiceBusClient(connectionString, options)
  const sender = client.createSender(queueName);

  if (LogLevel.DEBUG === infoLevel) {
    console.log(`Sender criado com sucesso. Name: ${queueName}`);
  }

  return sender;
}


/**
 * @param {azureBus.ServiceBusSender} sender
 * @param {BaseMessage} message
 * @param {LogLevel} logLevel
 * @returns {Promise<void>}
 */
export function send(sender, message, infoLevel) {

  if (LogLevel.DEBUG === infoLevel) {
    console.log(`Enviou a mensagem (id: ${message.id})`);
    console.log(message.body);
  }

  return sender.sendMessages(message);
}


/**
 * @param {azureBus.ServiceBusSender|azureBus.ServiceBusReceiver} sender
 * @returns {Promise<void>}
 */
export function closeConnection(sender) {
  sender.close();
}


/**
 * @param {string} connectionString
 * @param {string} queueName
 * @param {azureBus.ServiceBusClientOptions} options
 * @param {azureBus.ServiceBusReceiverOptions} optionsReceiver
 * @returns {azureBus.ServiceBusReceiver}
 */
export function createQueueReceiver(connectionString, queueName, options, optionsReceiver, infoLevel) {
  optionsReceiver ??= {
    receiveMode: "receiveAndDelete",
    // subQueueType: "deadLetter",
    maxAutoLockRenewalDurationInMs: 10000,
    skipParsingBodyAsJson: true,
    skipConvertingDate: true,
    identifier: "Receiver-Queue"
  };

  const client = new azureBus.ServiceBusClient(connectionString, options)
  const receiver = client.createReceiver(queueName, optionsReceiver);
  
  if (LogLevel.DEBUG === infoLevel) {
    console.log(`Receiver criado com sucesso. Name: ${queueName}`);
  }

  return receiver;
}


/**
 * @param {azureBus.ServiceBusReceiver} receiver
 * @param {number} quantity
 * @returns {Promise<azureBus.ServiceBusReceivedMessage[]>}
 */
export function receive(receiver, quantity, timeoutMs) {
  if (quantity === 0 || timeoutMs === 0) {
    throw createError(500, "Params quantity and/or timeout were 0. Impossible to continue.");
  }

  return receiver.receiveMessages(quantity, { 'maxWaitTimeInMs': timeoutMs });
}

