import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }
        
    @Get()
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Post()
    createBoard(
        @Body() CreateBoardDto: CreateBoardDto 
    ): Board {
        return this.boardsService.createBoard(CreateBoardDto);
    }

    @Get('/:id') // id로 특정 게시물 가져오기
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id)
    }
}
