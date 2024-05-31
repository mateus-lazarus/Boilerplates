import express from 'express';
import { getDouble, getSquare, postDouble, postSquare } from './../controllers/mathController.js';

export const mathRoutes = express.Router();

mathRoutes.get('/square/:number', getSquare);
mathRoutes.get('/double/:number', getDouble);

mathRoutes.post('/square', postSquare);
mathRoutes.post('/double', postDouble);
