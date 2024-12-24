import express from 'express';
import {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentPaystack,
    verifyPaystack
} from '../controllers/userController.js';
import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getProfile);
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

// Paystack payment routes
userRouter.post("/payment-paystack", authUser, paymentPaystack); // Initialize Paystack payment
userRouter.post("/verifyPaystack", authUser, verifyPaystack);    // Verify Paystack payment

export default userRouter;
