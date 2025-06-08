import orderModel from "../models/orderMoldel.js";
//placing orders using cod method
const placeOrder = async (req, res) => {
    try{
        const {userId,items,amount,address} = req.body;
        const orderData ={
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await orderModel.findByIdAndUpdate(userId, {cartData:{}})
        res.json({success:true, message:"Order placed"})
    } catch(error){
        console.log(error)
        res.json ({success:false, message:error.message})
    }
}

//placing orders using stripe method
const placeOrderStripe = async (req, res) => {
}


// placing orders using razorpay method
const placeOrderRazorpay = async (req, res) => {
}

//all orders data for admin
const allOrders = async (req, res) => {
}

//User orders data for frontend
const userOrders= async (req, res) => {
}
// update order status for admin
const updateStatus = async (req, res) => {
}

export { placeOrder,placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };