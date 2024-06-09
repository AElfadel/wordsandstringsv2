"use server"

import { performerSignupProps } from "@/types"
import { connectToDatabase } from "../mongodb/database"
import Perfomer from "../mongodb/database/models/performer.model"
import User from "../mongodb/database/models/user.model"


export async function performerSignup({performer, userId, eventId}: performerSignupProps) {
    try  {
        await connectToDatabase()

        const perfomerISUser = await User.findById(userId)

        if (!perfomerISUser) {
            throw new Error ("User does not exist")
        }

        const newPerformer = await Perfomer.create({
            ...performer,
            eventId,
            userId
        })

        console.log(newPerformer)

        return JSON.parse(JSON.stringify(newPerformer))

    } catch (error) {
        console.log(error)        
    }
}


export async function performerSignedUpAlready({userId, eventId}: { userId : string, eventId: string}) {
    try {
        await connectToDatabase()

        const conditions = {userId, eventId}
        // Use `countDocuments` instead of `distinct` for existence check
    const registeredPerformer = await Perfomer.countDocuments(conditions)

    const alreadyRegistered = registeredPerformer > 0

 
    return alreadyRegistered


    } catch(error) {
        console.log(error)
        return false
    }
    
}

