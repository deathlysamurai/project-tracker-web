export interface Technology {
    id: number;
    name: string;
    shortName: string;
    type: TechnologyType;
}

export enum TechnologyType {
    FRONTEND,
    BACKEND,
    DATABASE
}
