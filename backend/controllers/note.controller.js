import { Note } from "../models/note.model.js";
import { cloudinary } from "../config/cloudinary.js";

export const create = async(req, res) => {
    try {
        const { title, description } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        let imageUrl;
        if(req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "notesbyte/notes"
                    },
                    (err, result) => {
                        if(err) return reject(err);
                        resolve(result);
                    }
                )

                stream.end(req.file.buffer);
            })

            imageUrl = uploadResult.secure_url;
        }

        const note = await Note.create({
            userId: req.userId,
            title: title.trim(),
            description: description?.trim(),
            imageUrl,
        });

        return res.status(201).json({ success: true, note });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export const remove = async(req, res) => {

}

export const update = async(req, res) => {

}

export const getAllNotes = async(req, res) => {

}

export const getOnePaste = async(req, res) => {

}
