import express from "express"
import {getProductsByCategoryId}  from '../controllers/product.controller.js'
const router=express.Router()


router.route('/:categoryId').get(getProductsByCategoryId)
export default router