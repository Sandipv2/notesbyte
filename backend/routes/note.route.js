import { Router } from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import { uploadImage } from "../middlewares/uploadImage.js";

import {
    create,
    getAllNotes,
    getOneNote,
    remove,
    update,
} from "../controllers/note.controller.js";

const noteRouter = Router();

noteRouter.post("/", verifyToken, uploadImage.single("image"), create);
noteRouter.get("/", verifyToken, getAllNotes);
noteRouter.get("/:id", getOneNote);
noteRouter.delete("/:id", verifyToken, remove);
noteRouter.put("/:id", verifyToken, uploadImage.single("image"), update);

export default noteRouter;
