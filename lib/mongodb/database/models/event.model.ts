import { Document, Schema, models, model } from "mongoose"

export interface IEvent extends Document {
    _id: string;
    title: string;
    description?: string;
    location?: string;
    createdAt: Date;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    price: string;
isFree: boolean;
url?: string;
category: {
    _id: string,
    name: string,
},
organizer: {
    _id: string,
    firstName: string,
    lastName: string,
},
numberOfTickets: number;
performersReg: boolean;
termsagreement: boolean;
}


const EventSchema = new Schema({
    title: { type: String, required: true},
    description: {type: String},
    location: {type: String},
    createdAt: {type: Date, default: Date.now},
    imageUrl: {type: String, required: true},
    startDateTime: {type: Date, default: Date.now},
    endDateTime: {type: Date, default: Date.now},
    price: {type: String},
    isFree: {type: Boolean, default: false},
    url : {type: String},
    category: {type: Schema.Types.ObjectId, ref: "Category"},
    organizer: {type: Schema.Types.ObjectId, ref: "User"},
    numberOfTickets: {type: Number, required: true },
    termsagreement: {type: Boolean, required: true},
    performersReg: {type: Boolean, required: true, default: false}
}, { strict: false })

const Event = models.Event || model("Event", EventSchema)

export default Event;


// perfomers: {type: Schema.Types.ObjectId, ref : "Perfomer"},
