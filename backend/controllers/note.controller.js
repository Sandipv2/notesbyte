import { Note } from "../models/note.model.js";
import { cloudinary } from "../config/cloudinary.js";
import mongoose from "mongoose";

const uploadNoteImage = (file) => new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
        {
            folder: "notesbyte/notes",
            resource_type: "image",
        },
        (err, result) => {
            if (err) return reject(err);
            resolve(result);
        }
    );

    stream.end(file.buffer);
});

export const create = async (req, res) => {
    try {
        const { title, description, isPrivate } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        let imageUrl;
        let imagePublicId;
        if (req.file) {
            const uploadResult = await uploadNoteImage(req.file);

            imageUrl = uploadResult.secure_url;
            imagePublicId = uploadResult.public_id;
        }

        const note = await Note.create({
            userId: req.userId,
            title: title.trim(),
            description: description?.trim(),
            isPrivate,
            imageUrl,
            imagePublicId,
        });

        return res.status(201).json({ success: true, note });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}

export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Note ID required."
            });
        }

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Not authenticated."
            });
        }

        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        if (note.userId.toString() !== userId) {
            return res.status(404).json({
                success: false,
                message: "Not authorized to delete this note."
            });
        }

        await note.deleteOne();
        await cloudinary.uploader.destroy(note.imagePublicId, { resource_type: "image" });

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const update = async (req, res) => {
    try {
        const userId = req.userId;
        const { title, description, isPrivate } = req.body;
        const { id } = req.params

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid note ID"
            });
        }

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title cannot be empty"
            })
        }

        const note = await Note.findOne({ _id: id, userId });
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        note.title = title.trim();
        note.description = description.trim();
        note.isPrivate = isPrivate;

        if (req.file) {
            const uploadedImage = await uploadNoteImage(req.file);

            if (note.imagePublicId) {
                await cloudinary.uploader.destroy(note.imagePublicId, { resource_type: "image" });
            }

            note.imageUrl = uploadedImage.secure_url;
            note.imagePublicId = uploadedImage.public_id;
        }
        else {
            if (note.imagePublicId) {
                await cloudinary.uploader.destroy(note.imagePublicId, { resource_type: "image" });
            }
            note.imagePublicId = undefined;
            note.imageUrl = undefined;
        }

        await note.save();

        return res.status(200).json({ success: true, note });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const getAllNotes = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Not authorized!"
            })
        }

        const notes = await Note.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({ success: true, notes });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

export const getOneNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid note ID"
            });
        }

        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        const isOwner = userId && note.userId.toString() === userId;
        if (note.isPrivate && !isOwner) {
            return res.status(404).json({
                success: false,
                message: "The note is private"
            });
        }

        return res.status(200).json({ success: true, note });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}