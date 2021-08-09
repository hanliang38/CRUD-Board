import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, content } = createBoardDto;

    //     const board: Board = {
    //         id: uuid(), // 유니크한 게시판의 id를 주기 위함
    //         title,
    //         content,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);

    //     if (!found) {
    //         throw new NotFoundException();
    //     }
    //     return found
    // }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
