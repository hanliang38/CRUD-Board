import internal from 'stream';

export interface Board {
    id: string;
    title: string;
    description: string;
    // like: number;
    status: BoardStatus;
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}