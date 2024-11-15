import mongoose from "mongoose";

// User schema to store user details
const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    usertype: { type: String }
});

// Admin schema to store admin details (e.g., banner, categories)
const adminSchema = new mongoose.Schema({
    banner: { type: String },
    categories: { type: Array }
});

// Product schema to store product details, with the added `isFlashSale` field
const productSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    mainImg: { type: String },
    carousel: { type: Array },
    sizes: { type: Array },
    category: { type: String },
    gender: { type: String },
    price: { type: Number },
    discount: { type: Number },
    isFlashSale: { type: Boolean, default:false}  // New field to flag flash sale products
});

// Order schema to store order details
const orderSchema = new mongoose.Schema({
    userId: { type: String },
    name: { type: String },
    email: { type: String },
    mobile: { type: String },
    address: { type: String },
    pincode: { type: String },
    title: { type: String },
    description: { type: String },
    mainImg: { type: String },
    size: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    discount: { type: Number },
    paymentMethod: { type: String },
    orderDate: { type: String },
    deliveryDate: { type: String },
    orderStatus: { type: String, default: 'order placed' }
});

// Cart schema to store cart details
const cartSchema = new mongoose.Schema({
    userId: { type: String },
    title: { type: String },
    description: { type: String },
    mainImg: { type: String },
    size: { type: String },
    quantity: { type: String },
    price: { type: Number },
    discount: { type: Number }
});

// Export the models
export const User = mongoose.model('users', userSchema);
export const Admin = mongoose.model('admin', adminSchema);
export const Product = mongoose.model('products', productSchema);
export const Orders = mongoose.model('orders', orderSchema);
export const Cart = mongoose.model('cart', cartSchema);
