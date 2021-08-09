import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board.model';

export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    status: BoardStatus
}