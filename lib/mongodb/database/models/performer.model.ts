import { Schema, models, model} from "mongoose"

export interface IPerfomer extends Document {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    imgUrl: string;
    PhoneNumber: string;
    termsAgreement: boolean;
    performanceType: 'spoken word' | 'musical performance';
    soloOrGroup: 'solo' | 'band';
    artist: {
        _id: string,
        firstName: string,
        lastName: string
    },
    event: {
        _id: string,
        title: string,
    },
    performanceDetails: string;
    performanceLanguage: string;
    funFact: string;
}


export type IPerformerOne = {
    _id: string
    fullName: string
    createdAt: Date
    imgUrl: string
    phoneNumber: String,
    performanceType: 'spoken word' | 'musical performance',
    performanceDetails: string,
    performanceLanguage: string,
    soloOrGroup: 'solo' | 'band';
    email: string;
    funFact: string;
  }
  

const PerformerSchema = new Schema({
    createdAt: {
        type: Date, default: Date.now()
    },
    email: { type: String, required: true},
    fullName: { type: String, required: true},
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
    event: {type:Schema.Types.ObjectId, ref: "Event" },
    performanceLanguage: {type: String, required: true},
    soloOrGroup : {
        type: String,
        enum: ['solo', 'band'],
        required: true
            },
    artist:   {
                type: Schema.Types.ObjectId,
                ref: "User",
            },

}, { strict: false })


const Performer = models.Performer || model("Performer", PerformerSchema);


export default Performer;

