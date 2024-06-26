"use server"

import { CreateEventParams, DeleteEventParams, GetAllEventsParams, GetEventsByUserParams, GetRelatedEventsByCategoryParams, UpdateEventParams, getActiveEventsParams } from "@/types"
import { connectToDatabase } from "../mongodb/database"
import User from "../mongodb/database/models/user.model"
import Event from "../mongodb/database/models/event.model"
import Category from "../mongodb/database/models/category.model"
import { revalidatePath } from "next/cache"
import Order from "../mongodb/database/models/order.model"
import { UTApi } from "uploadthing/server"




const populateEvent = (query: any) => {
    return query
      .populate({ path: 'organizer', model: User, select: '_id firstName lastName' })
      .populate({ path: 'category', model: Category, select: '_id name' })
  }


export async function createEvent({event, userId, path}: CreateEventParams) {

    try {
        await connectToDatabase()

        const organizer = await User.findById(userId)

        if (!organizer) {
            throw new Error("Organizer does not exist")
        } 


        const newEvent = await Event.create({
            ...event,
             category: event.categoryId,
             organizer: userId,
             numberOfTickets: event.numberOfTickets,
             termsagreement: event.termsagreement,
      performersReg: event.performersReg
         });

            return JSON.parse(JSON.stringify(newEvent))
    } catch (error) {
        console.log(error)
    }
}

export async function getEventById( eventId: string ){
try {
    await connectToDatabase()

    const event = await populateEvent(Event.findById(eventId))

    //In this event component (without populate) some of the event object fields will contain only the id of their references. The event for example only contains the organizer id but not the first/last names, also only a category Id and not the category name. So we must populate those fields with their real data

    if (!event) throw new Error ("Event does not exist or not found")

        return JSON.parse(JSON.stringify(event))


} catch (error) {
console.log(error)
}
}


export async function getActiveEvents({ limit = 6 }: getActiveEventsParams) {
    try {
        await connectToDatabase()

        const todaysDate = new Date()

        const conditions = {
            endDateTime: { $gte: todaysDate}
        }

        const eventsQuery =  Event.find(conditions).sort({startDateTime: "asc"}).skip(0).limit(limit)

        const events = await populateEvent(eventsQuery)
        
        const eventsCount = await Event.countDocuments(conditions)

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit)
        }

    } catch(error) {
        console.log(error)
    }
}


export async function getFinishedEvents({query, limit = 6, page, category}: GetAllEventsParams) {
    try {
        await connectToDatabase()

        const todaysDate = new Date()

        const conditions = {
            endDateTime: { $lt: todaysDate}
        }

        const eventsQuery =  Event.find(conditions).sort({createdAt: 'desc'}).skip(0).limit(limit)

        const events = await populateEvent(eventsQuery)
        
        const eventsCount = await Event.countDocuments(conditions)

        return {
            data: JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit)
        }

    } catch(error) {
        console.log(error)
    }
}




export async function deleteEvent( {eventId, path, imageUrl} : DeleteEventParams) {

    try {
        await connectToDatabase()

        const conditions = {event: eventId}


        await Order.deleteMany(conditions)

        if (imageUrl) {
            const fileName = new URL(imageUrl).pathname.split('/').pop();

            if (fileName) {
                // Use the file name for deletion
                const utapi = new UTApi()
                await utapi.deleteFiles(fileName);
            }
        }

      const eventToDelete = await Event.findByIdAndDelete(eventId)


        if (eventToDelete) revalidatePath(path)

    } catch(error) {
        console.log(error)
    }
}


export async function updateEvent ({userId, event, path}: UpdateEventParams) {
try {
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id)

    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
        throw new Error ("Unauthroized or event not found")
    }

    const updatedEvent = await Event.findByIdAndUpdate(
        event._id,
        {...event, category: event.categoryId},
        {new: true}
    )

    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedEvent))

} catch(error){
    console.log(error)
}
}



export async function getRelatedEventsByCategory({eventId, categoryId, page = 1, limit =1 }: GetRelatedEventsByCategoryParams){
try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { $and: [{category: categoryId}, {_id: {$ne: eventId}}]}

    const eventsQuery = Event.find(conditions)
    .sort({createdAt: 'desc'})
    .skip(skipAmount)
    .limit(limit)

    const events = await populateEvent(eventsQuery)
    const eventsCount = await Event.countDocuments(conditions)

    return {data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit)}


} catch(error) {
    console.log(error + " This error is from the getRelatedEventsByCategory server action")
}
}



export async function getEventsByUser({ userId, page, limit =  6 }: GetEventsByUserParams){

    try {

        await connectToDatabase()

        const conditions = { organizer: userId}

        const skipAmount = (page - 1) * limit

        const eventsQuery = Event.find(conditions)
        .sort({createdAt: "desc"})
        .skip(skipAmount)
        .limit(limit)

        const events = await populateEvent(eventsQuery)
        const eventsCount = await Event.countDocuments(conditions)

        return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit)}
    } catch(error){

        console.log(error)
    }
}


export async function toggleTicketsRegistration(eventId: string) {
    try {
        await connectToDatabase()

        const event = await Event.findById(eventId);

        if (!event) {
            throw new Error("Event does not exist");
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { ticketsRegistration: !event.ticketsRegistration },
            { new: true } // This option returns the updated document
        );

        if (!updatedEvent) {
            throw new Error("Failed to update event");
        }

        return { ticketsRegistration: updatedEvent.ticketsRegistration };


    } catch(error) {
        console.log(error)
    }
}



export async function eventTicketsStatus(eventId: string) {
    try{ 
        await connectToDatabase()

        const event = await Event.findById(eventId);

        const eventTicketsState = event.ticketsRegistration
        
        return {eventTicketsState}

    } catch(error){
        console.log(error)
    }
}
