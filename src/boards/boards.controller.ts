import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
	constructor(private boardsService: BoardsService){ }

	/**
	 * 전체 가져오기
	 * 
	 * http://localhost:3000/boards
	 */
	@Get("/")
	getAllBoards(): Board[] {
		// Logger.log("aa")
		return this.boardsService.getAllBoards();
	}

	/**
	 * 저장
	 */
	@Post()
	createBoard(
		@Body() createBoardDto: CreateBoardDto
		): Board {		// @Body() body 이렇게 사용하면 모든 값 가져올 수 있다.

			return this.boardsService.createBoard(createBoardDto);
	}

	/**
	 * 게시물 하나 가져오기
	 */
	@Get('/:id')
	getBoardById(@Param('id') id:string): Board {
		return this.boardsService.getBoardById(id);
	}

	/**
	 * 삭제
	 */
	@Delete('/:id')
	deleteBoard(@Param('id') id:string): void {
		this.boardsService.deleteBoard(id);
	}

	/**
	 * 수정
	 */
	@Patch('/:id/status')
	updateBoardStatus(
		@Param('id') id:string,
		@Body('status') status: BoardStatus,
	) {
		return this.boardsService.updateBoardStatus(id, status);
	}

}
