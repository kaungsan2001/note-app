import { body, param } from "express-validator";

export const noteIdValidator = [
  param("noteId")
    .notEmpty()
    .withMessage("Note ID is required")
    .isNumeric()
    .withMessage("Note ID must be a number"),
];

export const createNoteValidator = [
  body("title")
    .notEmpty()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be at least 3 characters long"),
  body("content")
    .notEmpty()
    .isLength({ min: 3, max: 5000 })
    .withMessage("Content must be at least 3 characters long"),
  body("publish")
    .notEmpty()
    .isBoolean()
    .withMessage("Publish must be a boolean"),
];

export const updateNoteValidator = [
  param("noteId")
    .notEmpty()
    .withMessage("Note ID is required")
    .isNumeric()
    .withMessage("Note ID must be a number"),
  body("title")
    .notEmpty()
    .isLength({ min: 3, max: 200 })
    .withMessage("Title must be at least 3 characters long"),
  body("content")
    .notEmpty()
    .isLength({ min: 3, max: 5000 })
    .withMessage("Content must be at least 3 characters long"),
  body("publish").isBoolean().withMessage("Publish must be a boolean"),
];
