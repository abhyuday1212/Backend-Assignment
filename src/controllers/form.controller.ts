import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrors.js";
import { ContactForm } from "../schema/form.schema.js";
import { contactSchema } from "../types/form.validation.js";
import logger from "../utils/logger.js";
import { sendContactSubmissionEmail } from "../utils/sendMail.js";

// upload contact details
// POST
// http://localhost:8000/api/v1/form/details
export const uploadUserDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const validatedData = contactSchema.parse(req.body);

    const contact = new ContactForm(validatedData);
    await contact.save();
    logger.info(`Contact form saved for email: ${validatedData.email}`);

    await sendContactSubmissionEmail(validatedData);

    res.json(
      new ApiResponse(200, validatedData, "Form submitted successfully!")
    );
  }
);

// get all forms
// GET
// http://localhost:8000/api/v1/form/details
export const getDetails = asyncHandler(async (req: Request, res: Response) => {
  const contacts = await ContactForm.find();

  if (!contacts || contacts.length === 0) {
    logger.warn("No contact details found");
    throw new ApiError(404, "No contact details found");
  }

  logger.info(`${contacts.length} contact forms retrieved`);
  res.json(new ApiResponse(200, contacts, "Contact details retrieved"));
});


// http://localhost:8000/api/v1/form/details/:email
export const getDetailsByEmail = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.params;
    const contact = await ContactForm.findOne({ email });

    if (!contact) {
      logger.warn(`No details found for email: ${email}`);
      throw new ApiError(404, "No details found for this email");
    }

    logger.info(`Contact details retrieved for email: ${email}`);
    res.json(new ApiResponse(200, contact, "Contact details retrieved"));
  }
);
