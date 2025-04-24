import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

// Gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// global variables
const currency = 'usd'
const deliveryCharge = 10

// Placing orders using COD
const placeOrder = async (req, res) => {
  try {

    const { userId, items, amount, address } = req.body
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    }

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} })

    res.json({ success: true, message: "Order Placed" })


  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// Placing orders using STRIPE
const placeOrderStripe = async (req, res) => {
  try {

    const { userId, items, amount, address } = req.body
    const { origin } = req.headers

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    }

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }))

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: 'Delivery Fee',
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    })

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    })

    res.json({ success: true, session_url: session.url })

  } catch (error) {
    console.error(error)
    res.json({ sucess: false, message: error.message })
  }
}

// Verify Stripe

const verifyStripe = async (req, res) => {
  try {
    const { orderId, success, userId } = req.body
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      await userModel.findByIdAndUpdate(userId, {cartData: {}})
      res.json({success:true})
    }else{
      await orderModel.findByIdAndDelete(orderId)
      res.json({success:false})
    }

  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// All orders data for Admin Panel
const allOrders = async (req, res) => {
  try {

    const orders = await orderModel.find({});
    res.json({ success: true, orders })

  } catch (error) {
    console.error(error)
    res.json({ sucess: false, message: error.message })
  }
}

// User Order data for Frontend
const userOrders = async (req, res) => {
  try {

    const { userId } = req.body;

    const orders = await orderModel.find({ userId })
    res.json({ success: true, orders })

  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

// Update Order Status from Admin Panel
const updateStatus = async (req, res) => {
  try {

    const { orderId, status } = req.body

    await orderModel.findByIdAndUpdate(orderId, { status })
    res.json({ success: true, message: "Status updated" })

  } catch (error) {
    console.error(error)
    res.json({ success: false, message: error.message })
  }
}

export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe }