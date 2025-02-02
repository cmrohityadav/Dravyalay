import express from 'express'
import { createOrder, createTransaction, getOrdersByUserId } from '../controllers/order.controller.js'

const router=express.Router()

router.route('/createTransaction').post(createTransaction)
router.route('/createorder').post(createOrder)
router.route('/:userId').get(getOrdersByUserId)

export default router