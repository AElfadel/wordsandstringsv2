import { Schema, model, models, Document } from "mongoose";

export interface ICategory extends Document {
    _id: string,
    name: string,
}


const CategorySchema = new Schema({
    name: {type: String, required: true, unique: true}
}, { strict: false })

const Category = models.Category || model('Category', CategorySchema)

export default Category