import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    number: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{10}$/, "Invalid phone number"],
    },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 900, // 150 words (approx 6 chars per word)
    },
  },
  { timestamps: true }
);


const ContactForm = mongoose.model("ContactForm", formSchema);

export { ContactForm };
