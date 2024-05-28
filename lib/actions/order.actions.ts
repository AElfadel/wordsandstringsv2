"use server"

import {  CreateOrderParams, GetOrdersByUserParams } from "@/types";
import { connectToDatabase } from "../mongodb/database";
import Order from "../mongodb/database/models/order.model";
import User from "../mongodb/database/models/user.model";
import Event from "../mongodb/database/models/event.model";



export async function createOrder(order: CreateOrderParams) {
    try { 
        connectToDatabase()


        const newOrder = await Order.create({
            ...order,
            event: order.eventId,
            buyer: order.buyerId,
            
        })

        return JSON.parse(JSON.stringify(newOrder))

        

    } catch(error) {
        console.log(error)
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