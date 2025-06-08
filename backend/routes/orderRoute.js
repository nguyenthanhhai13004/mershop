import express from 'express';
import {placeOrder,placecOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
const orderRouter = express.Router();

orderRouter.post('list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)
 
// paymentfeature
orderRouter.post('/place',authUser, placeOrder)
orderRouter.post('/stripe',authUser, placeOrderStripe)
orderRouter.post('/razorpay',authUser, placeOrderRazorpay)


//user feature
orderRouter.post('/userorder',authUser, userOrders)
export default orderRouter;