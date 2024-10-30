import express from "express";
import { deposit, withdraw, transfer, viewBalance, miniStatement } from "../controllers/accountController.js";
import { validatePinMiddleware } from "../middleware/pinMiddleware.js";

const router = express.Router();

router.post("/deposit", validatePinMiddleware, deposit);
router.post("/withdraw", validatePinMiddleware, withdraw);
router.post("/transfer", validatePinMiddleware, transfer);
router.get("/balance/:userId", validatePinMiddleware, viewBalance);
router.get("/mini-statement/:userId", validatePinMiddleware, miniStatement);

export default router;
