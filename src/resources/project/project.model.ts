import mongoose from "mongoose";
export interface IProject {
    url: string;
    country: string;
    start_year: number;
    end_year: number;
}

const ProjectSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    start_year: {
        type: Number,
        required: true
    },
    end_year: {
        type: Number,
        default: null
    }
});


export const ProjectModel = mongoose.model<IProject>("Project", ProjectSchema);
