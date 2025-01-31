import express from 'express'
import { createOrder, createTransaction } from '../controllers/order.controller.js'

const router=express.Router()

router.route('/createTransaction').post(createTransaction)
router.route('/createorder').post(createOrder)

export default router