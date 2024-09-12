import { ContactModel } from "../models/contactsModel.js";
// prettier-ignore
import { contactValidation, favoriteValidation } from "../validations/validation.js";
import { httpError } from "../helper/httpError.js";

const getAllContacts = async (_req, res) => {
  const result = await ContactModel.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactModel.findById(contactId);

  if (!result) {
    throw httpError(404, "Contact ID Not Found");
  }

  res.json(result);
};

const addContact = async (req, res) => {
  // Preventing lack of necessary data for contacts (check validations folder)
  const { error } = contactValidation.validate(req.body);

  if (error) {
    throw httpError(400, "missing required name field");
  }

  const result = await ContactModel.create(req.body);

  res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await ContactModel.findByIdAndDelete(contactId);

  if (!result) {
    throw httpError(404);
  }

  res.json({
    message: "Contact deleted",
  });
};

const updateContactById = async (req, res) => {
  // Preventing lack of necessary data for contacts (check validations folder)
  const { error } = contactValidation.validate(req.body);
  if (error) {
    throw httpError(400, "missing fields");
  }

  const { contactId } = req.params;
  const result = await ContactModel.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404);
  }

  res.json(result);
};

const updateStatusContact = async (req, res) => {
  // Preventing lack of necessary data for favorite (check validations folder)
  const { error } = favoriteValidation.validate(req.body);
  if (error) {
    throw httpError(400, "missing field favorite");
  }

  const { contactId } = req.params;
  const result = await ContactModel.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw httpError(404);
  }

  res.json(result);
};

// prettier-ignore
export { getAllContacts, getContactById, addContact, deleteContactById, updateContactById, updateStatusContact};