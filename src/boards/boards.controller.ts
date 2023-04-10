import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsePipes } from '@nestjs/common/decorators';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
	constructor(private boardsService: BoardsService){ }


	/**
	 * 전체 가져오기 
	 */
	@Get()
    getAllBoard(
    ): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

	/**
	 * 하나의 데이터 가져오기 
	 */
	@Get('/:id')
	getBoardById(@Param('id') id: number): Promise<Board> {
		return this.boardsService.getBoardById(id);
	}

	/**
	 * 저장
	 */
	@Post()
	@UsePipes(ValidationPipe)
	createBoard(
			@Body() createBoardDto: CreateBoardDto,
			@GetUser() user:User
		): Promise<Board> {		// @Body() body 이렇게 사용하면 모든 값 가져올 수 있다.

			return this.boardsService.createBoard(createBoardDto, user);
	}

/**
 * 삭제
 */
	@Delete('/:id')
	deleteBoard(
			@Param('id', ParseIntPipe) id:number
		): Promise<void> {


		return this.boardsService.deleteBoard(id);
	}

	/**
	 * 수정
	 */
	@Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ) {
        return this.boardsService.updateBoardStatus(id, status);
    }

	// /**
	//  * 전체 가져오기
	//  * 
	//  * http://localhost:3000/boards
	//  */
	// @Get("/")
	// getAllBoards(): Board[] {
	// 	// Logger.log("aa")
	// 	return this.boardsService.getAllBoards();
	// }

	// /**
	//  * 저장
	//  */
	// @Post()
	// @UsePipes(ValidationPipe)
	// createBoard(
	// 	@Body() createBoardDto: CreateBoardDto
	// 	): Board {		// @Body() body 이렇게 사용하면 모든 값 가져올 수 있다.

	// 		return this.boardsService.createBoard(createBoardDto);
	// }

	// /**
	//  * 게시물 하나 가져오기
	//  */
	// @Get('/:id')
	// getBoardById(@Param('id') id:string): Board {
	// 	return this.boardsService.getBoardById(id);
	// }

	// /**
	//  * 삭제
	//  */
	// @Delete('/:id')
	// deleteBoard(@Param('id') id:string): void {
	// 	this.boardsService.deleteBoard(id);
	// }

	// /**
	//  * 수정
	//  */
	// @Patch('/:id/status')
	// updateBoardStatus(
	// 	@Param('id') id:string,
	// 	@Body('status', BoardStatusValidationPipe) status: BoardStatus,
	// ) {
	// 	return this.boardsService.updateBoardStatus(id, status);
	// }

}
