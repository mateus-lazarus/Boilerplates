import express from 'express';
import { getHomePage, getAboutPage } from '../controllers/homeController.js'

export const homeRoutes = express.Router();

homeRoutes.get('/', getHomePage);
homeRoutes.get('/about', getAboutPage);
