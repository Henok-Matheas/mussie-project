import mongoose from "mongoose";


export interface IProject {
    created_by: mongoose.Types.ObjectId;
    name: string;
    description: string;
    tech_stacks: string[];
    specialization: string;
    duration: number;
    application_deadline: Date;
    intake_number: number;
}

const ProjectSchema = new mongoose.Schema({
    created_by: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    tech_stacks: {
        type: [String],
    },
    specialization: {
        type: String,
    },
    duration: {
        type: Number,
    },
    application_deadline: {
        type: Date,
    },
    intake_number: {
        type: Number,
    },
});

export const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);
