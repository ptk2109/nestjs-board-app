import { Injectable } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import {v1 as uuid} from "uuid";
import { CreateBoardDto } from './dto/create-board.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
@Injectable()
export class BoardsService {
	constructor(
		private boardRepository:BoardRepository,
	){}
	
	async getAllBoards(
	): Promise<Board[]> {
			return this.boardRepository.find();
	}


	/**
	 * 하나의 게시물 가져오기
	 */
	async getBoardById(id: number): Promise<Board> {
		const found = await this.boardRepository.findOne({ where:{id} });

		if (!found) {
				throw new NotFoundException(`Can't find Board with id ${id}`);
		}

		return found;
	}

	/** 
	 * 저장
	 */
	createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto);
	}

	/**
 * 삭제
 */
	async deleteBoard(id: number): Promise<void> {
		const result = await this.boardRepository.delete(id);

		if (result.affected === 0) {
			throw new NotFoundException(`Can't find Board with id ${id}`)
		}
	}


	async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
		const board = await this.getBoardById(id);

		board.status = status;
		await this.boardRepository.save(board);

		return board;
}

	// private boards: Board[] = [];

	// /**
	//  * 전체
	//  */
	// getAllBoards() : Board[]{
	// 	return this.boards;
	// }

	// /**
	//  * 저장
	//  */
	// createBoard(createBoardDto: CreateBoardDto){
	// 	const {title, description} = createBoardDto;

	// 	const board:Board = {
	// 		id: uuid(),
	// 		title,		// title : title 와 동일하다 (명칭 같으면 줄여 쓸수 있다.)
	// 		description,
	// 		status: BoardStatus.PUBLIC
	// 	}

	// 	this.boards.push(board);
	// 	return board;
	// }


	// /**
	//  * 하나의 게시물 가져오기
	//  */
	// getBoardById(id: string): Board {
	// 	const found = this.boards.find((board) => board.id === id);

	// 	if(!found) {
	// 		// throw new NotFoundException();		// { "statusCode":404, "error":"Not Found"} 메시지 뱉어줌
	// 		throw new NotFoundException(`해당 아이디가 없습니다. id: ${id}`);		// {"statusCode":404,"message":"해당 아이디가 없습니다. id: 2902a0c0-ccad-11ed-9df3-15476e96e44b1","error":"Not Found"}
	// 	}
	// 	return found;
	// }

	// /**
	//  * 삭제
	//  */
	// deleteBoard(id: string): void {
	// 	const found = this.getBoardById(id);
	// 	this.boards = this.boards.filter((board) => board.id !== found.id);
	// }


	// /**
	//  * 수정
	//  */
	// updateBoardStatus(id: string, status:BoardStatus): Board {
	// 	const board = this.getBoardById(id);
	// 	board.status = status;
	// 	return board;
	// }



}
