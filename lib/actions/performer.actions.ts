"use server"

import { performerSignupProps } from "@/types"
import { connectToDatabase } from "../mongodb/database"
import Performer from "../mongodb/database/models/performer.model"
import User from "../mongodb/database/models/user.model"
import { ObjectId } from "mongodb"


export async function performerSignup({performer, userId, eventId}: performerSignupProps) {
    try  {
        await connectToDatabase()

        const perfomerISUser = await User.findById(userId)

        if (!perfomerISUser) {
            throw new Error ("User does not exist")
        }


    // Checking if user is already a performer for the event
          const existingPerformer = await Performer.findOne({ user: userId, event: eventId });

          if (existingPerformer) {
              throw new Error("User is already signed up as a performer for this event");
          }


        const newPerformer = await Performer.create({
            ...performer,
            event: eventId,
            artist:userId,
        })


        return JSON.parse(JSON.stringify(newPerformer))

    } catch (error) {
        console.log(error)        
    }
}


export async function performerSignedUpAlready({userId, eventId}: { userId : string, eventId: string}) {
    try {
        await connectToDatabase()

        const conditions = {artist:userId, event:eventId}
        // Use `countDocuments` instead of `distinct` for existence check
    const registeredPerformer = await Performer.countDocuments(conditions)

    const alreadyRegistered = registeredPerformer > 0

 
    return alreadyRegistered


    } catch(error) {
        console.log(error)
        return false
    }
    
}

export async function getPerformers(eventId: string) {
    try {
        await connectToDatabase();

        const eventObjectId = new ObjectId(eventId);

        const performers = await Performer.aggregate([
            {
                $match: { event: eventObjectId }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'artist',
                    foreignField: '_id',
                    as: 'artist'
                }
            },
            {
                $unwind: '$artist'
            },
            {
                $project: {
                    email: 1,
                    fullName: 1,
                    imgUrl: 1,
                    phoneNumber: 1,
                    performanceType: 1,
                    performanceDetails: 1,
                    performanceLanguage: 1,
                    soloOrGroup: 1,
                    funFact: 1
                }
            }
        ]);

        return JSON.parse(JSON.stringify(performers));
    } catch (error) {
        console.error(error);
        return [];
    }
}


