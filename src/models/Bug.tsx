import { Project } from "./Project";

export interface Bug {
    id: number;
    title: string;
    description: string;
    status: BugStatus;
    notes: string;
    severity: BugSeverity;
    project: Project
}

export enum BugStatus {
    NEW,
    SEEN,
    STARTED,
    FINISHED
}

export enum BugSeverity {
    ZERO,
    LOW,
    MEDIUM,
    HIGH,
    IMMEDIATE
}
