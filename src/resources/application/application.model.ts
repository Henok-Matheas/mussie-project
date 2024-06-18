import mongoose from "mongoose";


export interface IApplication {
    user: mongoose.Types.ObjectId;
    experience: string;
    bio: string;
    resume: string;
    project: mongoose.Types.ObjectId;
}

const ApplicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    project: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
});

export const ApplicationModel = mongoose.model<IApplication>("Application", ApplicationSchema);
