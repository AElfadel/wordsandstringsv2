import { Schema, models, model} from "mongoose"

export interface IPerfomer extends Document {
    clerkId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    idScan_url: string;
    PhoneNumber: string;
    termsAgreement: boolean;
    event: Schema.Types.ObjectId;
    performanceType: 'spoken word' | 'musical performance';

}

const PerformerSchema = new Schema({
    clerkId: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    idScan_url : {type: String, required: true},
    phoneNumber: { type: String, required:true},
    termsAgreement: {type: Boolean, default: false},
    performanceType: {
type: String,
enum: ['spoken word', 'musical performance'],
required: true
    },
    event: {type:Schema.Types.ObjectId, ref: "Event" }
})


const Perfomer = models.Perfomer || model("Perfomer", PerformerSchema)


export default Perfomer;
