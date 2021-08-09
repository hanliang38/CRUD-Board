import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {

    // Inject Repository to Service
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) { }
    
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        
        
        return this.boardRepository.createBoard(createBoardDto);
    }


    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }


    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        //error message
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        // console.log('result', result)
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
