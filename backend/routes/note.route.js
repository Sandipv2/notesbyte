import { Router } from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import { uploadImage } from "../middlewares/uploadImage.js";

import {
    create
} from "../controllers/note.controller.js";

const noteRouter = Router();

noteRouter.post("/", verifyToken, uploadImage.single("image"), create);

export default noteRouter;
