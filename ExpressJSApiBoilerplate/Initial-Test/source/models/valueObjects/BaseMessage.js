/**
 * A base class for message transportation.
 * @class BaseMessage
 */
export default class BaseMessage {
  /**
   * @param {string} id
   * @param {string} trace
   * @param {object} body
   * @param {Date} createdTimestamp
   */
  constructor(id, trace, body, createdTimestamp) {
    this.id = id;
    this.sessionId = id;
    this.trace = trace;
    this.body = body;
    this.createdTimestamp = createdTimestamp.toISOString();
  }
}