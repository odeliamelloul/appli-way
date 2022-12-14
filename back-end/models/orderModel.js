import mongoose from 'mongoose'
const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        orderItems: [{
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: Array, required: true },
            price: { type: Number, required: true },
            installationPrice: { type: Number, required: false },
            instalation: { type: Boolean, required: true },
            id: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
        },],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: false },
        },
        paymentMethod: {
            type: String,
            required: false,
        },
        estimatedDelivred: {
            type: Date
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_adress: { type: String },
        },
        taxPrice: {
            type: String,
            required: true,
            default: 0.0
        },
        shippingPrice: {
            type: String,
            required: true,
        },
        coupon: {
            type: Number,
            required: true,
            default: 0.0
        },
        totalPrice: {
            type: String,
            required: true,
            default: 0.0
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt:
        {
            type: Date
        },
        deliveredAt:
        {
            type: Date
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true
    }
)
const Order = mongoose.model('Order', orderSchema)
export default Order