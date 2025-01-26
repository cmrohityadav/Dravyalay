import express from 'express'
import { getAllCategory } from '../controllers/category.controller.js';

const router=express.Router();

router.route('/getAllCategory').get(getAllCategory)

export default router;