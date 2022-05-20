import express from "express";
import { body } from "express-validator";
const router = express.Router();
import { EMAIL_INCORRECT_ERR } from "../errors";

const checkAuth = require("../middlewares/checkAuth");
const {
  fetchCurrentUser,
  loginUser,
  registerUser,
  logoutUser,
} = require("../controllers/auth.controller");

const loginValidation = [
  body("email").not().isEmpty().withMessage("email must be required"),
  body("password").not().isEmpty().withMessage("Password must be required"),
];

const registerValidation = [
  body("name").not().isEmpty().withMessage("Name must be required"),
  body("password").not().isEmpty().withMessage("Password must be required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address must be required")
    .isEmail()
    .withMessage(EMAIL_INCORRECT_ERR),
];

router.post("/register", registerValidation, registerUser);

router.post("/login", loginValidation, loginUser);

router.get("/me", checkAuth, fetchCurrentUser);

router.get("/logout", checkAuth, logoutUser);
export default router;
