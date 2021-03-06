import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('/api/boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardsController');
    constructor(private boardsService: BoardsService) { }
        
    @Get() //게시물 리스트 조회
    getAllBoard(
        @GetUser() user:User
    ): Promise<Board[]> {
        this.logger.verbose(`유저 ${user.username} (이)가 모든 게시물을 가져오려 합니다.`)
        return this.boardsService.getAllBoards();
    }

    @Post() // 게시물 생성
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: User): Promise<Board> {
        this.logger.verbose(`유저 ${user.username}(이)가 새로운 게시물을 생성합니다. Payload: ${JSON.stringify(createBoardDto)}`)
        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Get('/:id') // 게시물 상세 조회
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }


    @Delete('/:id') //게시물 삭제
    deleteBoard(@Param('id', ParseIntPipe) id,
        @GetUser() user: User
    ): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }

    @Patch('/:id/status') // 게시물 편집
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ): Promise<Board> { 
        return this.boardsService.updateBoardStatus(id, status)
    }

    // @Post('/:id/like') // 게시물 좋아요
    
}
