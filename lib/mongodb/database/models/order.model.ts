import { Schema, model, models, Document } from "mongoose";

export interface IOrder extends Document {
    createdAt: Date,
    totalAmount: string,

    buyer: {
        _id: string,
        firstName: string,
        lastName: string,
    },
    event: {
        _id: string,
        title: string,
    },

}

export type IOrderItem = {
    _id: string
    totalAmount: string
    createdAt: Date
    eventTitle: string
    eventId: string
    buyer: string
  }
  


const OderSchema = new Schema({
    createdAt: {
        type: Date, default: Date.now()
    },
    totalAmount: {
        type: String,
    },

    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

}, { strict: false })

const Order = models.Order || model('Order', OderSchema)

export default Order