import { Schema, models, model} from "mongoose"

export interface IPerfomer extends Document {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    idScan_url: string;
    PhoneNumber: string;
    termsAgreement: boolean;
    event: Schema.Types.ObjectId;
    performanceType: 'spoken word' | 'musical performance';
    soloOrGroup: 'solo' | 'band'
    user: Schema.Types.ObjectId

}

const PerformerSchema = new Schema({
    createdAt: {
        type: Date, default: Date.now()
    },
    email: { type: String, required: true, unique: true},
    fullName: { type: String, required: true, unique: true},
    funFact: {type: String, required: true},
    imgUrl : {type: String, required: true},
    phoneNumber: { type: String, required:true},
    termsAgreement: {type: Boolean, default: false},
    performanceType: {
type: String,
enum: ['spoken word', 'musical performance'],
required: true
    },
    performanceDetails: {type: String, required: true},
    event: {type:Schema.Types.ObjectId, ref: "Event", required: true },
    performanceLanguage: {type: String, required: true},
    soloOrGroup : {
        type: String,
        enum: ['solo', 'band'],
        required: true
            },
            user:   {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            },

}, { strict: false })


const Perfomer = models.Perfomer || model("Perfomer", PerformerSchema)


export default Perfomer;
