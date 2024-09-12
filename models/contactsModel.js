import { Schema,model } from "mongoose";

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "set name for contact"],
        },
        email: {
            type: String,
            required: [true, "set email for contact"],
        },
        phone: {
            type: String,
            required: [true, "set phone for contact"],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false }
)

const ContactModel = model("contact", contactSchema);

export {ContactModel}