"use server"

import {  CreateOrderParams, GetOrdersByEventParams, GetOrdersByUserParams } from "@/types";
import { connectToDatabase } from "../mongodb/database";
import Order from "../mongodb/database/models/order.model";
import User from "../mongodb/database/models/user.model";
import Event from "../mongodb/database/models/event.model";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";



export async function createOrder(order: CreateOrderParams) {
    try { 
      
        connectToDatabase()

        const orders = []
        
        const ticketQuanity = parseInt(order.ticketQuantity, 10)

        for (let i = 0; i < ticketQuanity; i++) {

            const newOrder = Order.create({
                ...order,
                event: order.eventId,
                buyer: order.buyerId,
            })

            orders.push(newOrder)
        }

        console.log(order)

        return { success: true, orders: JSON.parse(JSON.stringify(orders)) };
        

    } catch(error) {
        console.log(error)

        if (error instanceof mongoose.Error.ValidationError) {
            const errorMessage = Object.values(error.errors).map(err => err.message).join(', ');
            return { success: false, message: errorMessage };
        }
        return { success: false, message: 'An error occurred while creating the order.' };

    }

}

//User already has ticket

export async function checkUserAlreadyHasTicket({userId, eventId} : {userId: string, eventId: string}) {
    try {
        connectToDatabase()


        const conditions = { buyer: userId, event: eventId}

    // Use `countDocuments` instead of `distinct` for existence check
    const ticketCount = await Order.countDocuments(conditions)

    const hasTicket = ticketCount > 0

 
    return hasTicket


    } catch(error) {
        console.log(error)
        return false
    }
    
}

//Orders by the user

export async function getOrdersByUser({userId, limit=3, page}: GetOrdersByUserParams) {
    try {
        connectToDatabase()

        const skipAmount = (Number(page) - 1) * limit
        const conditions = { buyer: userId}

        const orders = await Order.distinct('event._id')
        .find(conditions)
        .sort({createdAt: 'desc'})
        .skip(skipAmount)
        .limit(limit)
        .populate({
            path: 'event',
            model: Event,
            populate: {
                path: 'organizer',
                model: User,
                select: "_id firstName lastName"
            },
        })
        const ordersCount = await Order.distinct('event._id').countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(orders)), totalPages: Math.ceil(ordersCount/limit)}

    } catch(error) {
        console.log(error)
    }
}


export async function deleteOrder({eventId, userId} : {eventId: string, userId: string}) {
    try { 
        await connectToDatabase()

        const conditions = {buyer:userId, event:eventId }

        const deleteOrder = await Order.findOneAndDelete(conditions)

        if (!deleteOrder) return new Error("deleted order not found")

    } catch(error) {
        console.log(error)
    }

}



export async function getOrder({eventId, userId} : {eventId: string, userId: string}) {
    try {
await connectToDatabase()

const conditions = {buyer: userId, event: eventId}

const userOrder = await Order.findOne(conditions).populate({
    path: 'buyer',
    model: User,
    select: "_id firstName lastName"
})


if (!userOrder) return new Error("Order not founds")

return JSON.parse(JSON.stringify(userOrder))


    } catch(error) {
        console.log(error)
    }
}


// GET ORDERS BY EVENT
export async function getOrdersByEvent({ searchString, eventId }: GetOrdersByEventParams) {
    try {
        await connectToDatabase();

        if (!eventId) throw new Error('Event ID is required');
        const eventObjectId = new ObjectId(eventId);

        // Debugging: Check if eventObjectId is correctly created
        console.log(`Converted Event ID to ObjectId: ${eventObjectId}`);

        const orders = await Order.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'buyer',
                    foreignField: '_id',
                    as: 'buyer',
                },
            },
            {
                $unwind: '$buyer',
            },
            {
                $lookup: {
                    from: 'events',
                    localField: 'event',
                    foreignField: '_id',
                    as: 'event',
                },
            },
            {
                $unwind: '$event',
            },
            {
                $project: {
                    _id: 1,
                    totalAmount: 1,
                    createdAt: 1,
                    eventTitle: '$event.title',
                    eventId: '$event._id',
                    buyer: {
                        $concat: ['$buyer.firstName', ' ', '$buyer.lastName'],
                    },
                },
            },
            {
                $match: {
                    $and: [{ eventId: eventObjectId }, { buyer: { $regex: RegExp(searchString, 'i') } }],
                },
            },
        ]);

        const total = await Order.countDocuments({ event: eventObjectId });

        console.log(`Orders found: ${orders.length}`);

      return JSON.parse(JSON.stringify(orders))
    } catch (error) {
      console.log(error)
    }
  }

  export async function totalTickets(eventId: string) {
    try{
await connectToDatabase()

const totalTickets = await Order.countDocuments({event: eventId})

return JSON.parse(JSON.stringify(totalTickets))

    } catch(error) {
        console.log(error)
    }
}

