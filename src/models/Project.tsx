import { Task } from "./Task";
import { Technology } from "./Technology";

export interface Project {
    id: number;
    title: string;
    stage: ProjectStage;
    display: boolean;
    url: string;
    tasks: Task[];
    notes: string;
    technologies: Technology[];
}

export enum ProjectStage {
    CONCEPTION,
    WORKING,
    FINISHED,
    PRODUCTION
}
