import internal from 'stream';

export interface Board {
    id: string;
    title: string;
    content: string;
    // like: number;
    status: BoardStatus;
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}