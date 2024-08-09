import express from 'express';
import { sendMessagesEndpoint, receiveMessagesEndpoint } from './../controllers/messagingController.js';

export const messagingRoutes = express.Router();

messagingRoutes.post('/send', sendMessagesEndpoint);
messagingRoutes.get('/receive', receiveMessagesEndpoint);
