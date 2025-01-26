import express from "express"
import {getProductsByCategoryId}  from '../controllers/product.controller.js'
const router=express.Router()


router.route('/:categoryId').post(getProductsByCategoryId)
export default router