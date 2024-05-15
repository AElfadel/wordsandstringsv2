import { Schema, models, model} from "mongoose"


const PerformerSchema = new Schema({
    clerkId: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    idScan_url : {type: String, required: true},
    PhoneNumber: { type: String, required:true},
    termsAgreement: {type: Boolean, default: false}
})


const User = models.Perfomer || model("Perfomer", PerformerSchema)


export default User;