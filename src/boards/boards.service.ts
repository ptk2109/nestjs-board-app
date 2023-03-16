import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import {v1 as uuid} from "uuid";
import { CreateBoardDto } from './dto/create-board.dto';
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
		return this.boards.find((board) => board.id === id);
	}

	/**
	 * 삭제
	 */
	deleteBoard(id: string): void {
		this.boards = this.boards.filter((board) => board.id !== id);
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
