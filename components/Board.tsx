'use client'

import { useBoardStore } from '@/store/BoardStore';
import React, { useEffect } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

function Board() {
	const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [state.board, state.getBoard, state.sertBoardState, state.updateTodoInDB])

	useEffect(() => {
		getBoard()
	}, [getBoard]);

	const handleOnDragEnd = (result: DropResult) => {
		const { destination, source, type } = result;

		console.log(result);

		if (!destination) return;

		// HANDLE COLUMN DRAG
		if (type === 'column') {
			const entries = Array.from(board.columns.entries());
			const [removed] = entries.splice(source.index, 1)
			entries.splice(destination.index, 0, removed);
			const rearrangedColumns = new Map(entries);
			setBoardState({
				...board,
				columns: rearrangedColumns
			})
		}

		// INDEXES ARE STORED AS NUMBERS 0,1,2... INSTEAD OF ID'S WITH DND LIBRARY
		const columns = Array.from(board.columns);
		const startColIndex = columns[Number(source.droppableId)]
		const endColIndex = columns[Number(destination.droppableId)]

		const startCol: Column = {
			id: startColIndex[0],
			todos: startColIndex[1].todos
		}

		const endCol: Column = {
			id: endColIndex[0],
			todos: endColIndex[1].todos
		}

		if (!startCol || !endCol) return;

		if (source.index === destination.index && startCol === endCol) return;

		const newTodos = startCol.todos;
		const [todoMoved] = newTodos.splice(source.index, 1);

		if (startCol.id === endCol.id) {
			// SOME COLUMN TASK DRAG
			newTodos.splice(destination.index, 0, todoMoved);
			const newCol = {
				id: startCol.id,
				todos: newTodos
			}

			const newColumns = new Map(board.columns);
			newColumns.set(startCol.id, newCol);

			setBoardState({ ...board, columns: newColumns });
		} else {
			// DRAGGIN TO ANOTHER COLUMN
			const endTodos = Array.from(endCol.todos);
			endTodos.splice(destination.index, 0, todoMoved);

			const newColumns = new Map(board.columns);
			const newCol = {
				id: startCol.id,
				todos: newTodos
			}

			newColumns.set(startCol.id, newCol);
			newColumns.set(endCol.id, {
				id: endCol.id,
				todos: endTodos
			})

			updateTodoInDB(todoMoved, endCol.id)

			setBoardState({ ...board, columns: newColumns });
		}

	}

	return (
		<DragDropContext onDragEnd={handleOnDragEnd} >
			<Droppable droppableId='board' direction='horizontal' type='column' >
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef} className='grid grid-cols-1 md:grid-cols-3 gap-5 min-w-7xl mx-auto px-4' >
						{/* RENDERING ALL THE COLUMNS */}
						{Array.from(board.columns.entries()).map(([id, column], index) => (
							<Column key={id} id={id} todos={column.todos} index={index} />
						))}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

export default Board