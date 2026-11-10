
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    imageUrl: {
        type: String
    },

    isPrivate: {
        type: Boolean,
        default: true
    },

}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);

export { Note };