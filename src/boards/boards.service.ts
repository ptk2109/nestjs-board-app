import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import {v1 as uuid} from "uuid";
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
@Injectable()
export class BoardsService {
	private boards: Board[] = [];

	/**
	 * 전체
	 */
	getAllBoards() : Board[]{
		return this.boards;
	}

	/**
	 * 저장
	 */
	createBoard(createBoardDto: CreateBoardDto){
		const {title, description} = createBoardDto;

		const board:Board = {
			id: uuid(),
			title,		// title : title 와 동일하다 (명칭 같으면 줄여 쓸수 있다.)
			description,
			status: BoardStatus.PUBLIC
		}

		this.boards.push(board);
		return board;
	}


	/**
	 * 하나의 게시물 가져오기
	 */
	getBoardById(id: string): Board {
		const found = this.boards.find((board) => board.id === id);

		if(!found) {
			// throw new NotFoundException();		// { "statusCode":404, "error":"Not Found"} 메시지 뱉어줌
			throw new NotFoundException(`해당 아이디가 없습니다. id: ${id}`);		// {"statusCode":404,"message":"해당 아이디가 없습니다. id: 2902a0c0-ccad-11ed-9df3-15476e96e44b1","error":"Not Found"}
		}
		return found;
	}

	/**
	 * 삭제
	 */
	deleteBoard(id: string): void {
		const found = this.getBoardById(id);
		this.boards = this.boards.filter((board) => board.id !== found.id);
	}


	/**
	 * 수정
	 */
	updateBoardStatus(id: string, status:BoardStatus): Board {
		const board = this.getBoardById(id);
		board.status = status;
		return board;
	}



}
