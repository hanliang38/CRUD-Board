import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) { }
        
    // @Get()
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() CreateBoardDto: CreateBoardDto 
    ): Promise<Board> {
        return this.boardsService.createBoard(CreateBoardDto);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() CreateBoardDto: CreateBoardDto 
    // ): Board {
    //     return this.boardsService.createBoard(CreateBoardDto);
    // }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }



    // @Get('/:id') // id로 특정 게시물 가져오기
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id)
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ) { 
    //     return this.boardsService.updateBoardStatus(id, status)
    // }
}
