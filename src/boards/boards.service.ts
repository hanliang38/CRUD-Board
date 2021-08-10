import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {

    // Inject Repository to Service
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) { }
    
    //모든 게시물 가져오기
    async getAllBoards(): Promise <Board[]> {
        return this.boardRepository.find();
    }

    // 게시물 생성
    createBoard(createBoardDto: CreateBoardDto, user:User): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto, user);
    }


    // id값으로 게시물 가져오기
    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    // 게시물 삭제
    async deleteBoard(id: number, user: User): Promise<void> {
        const result = await this.boardRepository.delete({ id, user });

        //error message
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`)
        }

        // console.log('result', result)
    }

    //게시물 업데이트
    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }
}
