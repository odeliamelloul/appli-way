import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

const productSchema = mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: Array,
            required: false,
        },
        categories: {
            type: Array,
            required: false
        },
        weight: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        brand: {
            type: String,
            required: false,
        },
        color: {
            type: String,
            required: false,
        },
        frequency: {
            type: String,
            required: false,
        },
        inputVoltage: {
            type: String,
            required: false,
        },
        materialType: {
            type: String,
            required: false,
        },
        type: {
            type: String,
            required: false,
        },
        oparatingSystem: {
            type: String,
            required: false,
        },
        rating: {
            type: Number,
            required: false,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        installationPrice: {
            type: Number,
            required: false,
            default: 0
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0
        },
        review: [reviewSchema]
    },
    {
        timestamps: true
    }
)
const Product = mongoose.model('Product', productSchema)
export default Product