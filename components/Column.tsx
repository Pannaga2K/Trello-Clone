import { PlusIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { useBoardStore } from '@/store/BoardStore'
import { useModalStore } from '@/store/ModalStore'
import { useThemeStore } from '@/store/ThemeStore'

type Props = {
    id: TypedColumn,
    todos: Todo[],
    index: number
}

const idToColumnText: {
    [key in TypedColumn]: string
} = {
    "todo": "To Do",
    "inProgress": "In Progress",
    "done": "Done"
}

function Column({ id, todos, index }: Props) {

    const [searchString, setSearchString, setNewTaskType] = useBoardStore((state) => [state.searchString, state.setSearchString, state.setNewTaskType])
    const [isDarkMode, toggleIsDarkMode] = useThemeStore((state) => [state.isDarkMode,  state.toggleIsDarkMode])

    const openModal = useModalStore((state) => state.openModal)

    const handleAddTodo = () => {
        setNewTaskType(id);
        openModal();
    }

    console.log(searchString)

    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
                    {/* RENDER DROPPABLE TODOS IN COLUMN */}
                    <Droppable droppableId={index.toString()} type='card' >
                        {(provided, snapshot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className={`pb-2 p-2 rounded-sm shadow-sm ${snapshot.isDraggingOver ? "bg-green-400 transition-colors text-white" : `bg-zinc-200 dark:bg-[#0f0f0f] text-black dark:text-white`}`} >
                                <h2 className='flex justify-between font-bold text-2xl py-3' >{idToColumnText[id]}<span className={`font-normal rounded-full px-2 py-1 text-sm`} >{searchString ? todos.length : todos.filter(todo => todo.title.toLowerCase().includes(searchString.toLowerCase())).length}</span></h2>
                                <div className='space-y-2' >
                                    {todos?.map((todo, index) => (
                                        (searchString && !!todo.title.toLowerCase().includes(searchString.toLowerCase())) ?
                                            (<Draggable key={todo.$id} draggableId={todo.$id} index={index} >
                                                {(provided) => (
                                                    <TodoCard
                                                        todo={todo}
                                                        index={index}
                                                        id={id}
                                                        innerRef={provided.innerRef}
                                                        draggableProps={provided.draggableProps}
                                                        dragHandleProps={provided.dragHandleProps}
                                                    />
                                                )}
                                            </Draggable>)
                                        : (
                                            <Draggable key={todo.$id} draggableId={todo.$id} index={index} >
                                                {(provided) => (
                                                    <TodoCard
                                                        todo={todo}
                                                        index={index}
                                                        id={id}
                                                        innerRef={provided.innerRef}
                                                        draggableProps={provided.draggableProps}
                                                        dragHandleProps={provided.dragHandleProps}
                                                    />
                                                )}
                                            </Draggable>
                                        )
                                    ))}
                                    {provided.placeholder}
                                    <div className='flex items-center justify-center flex-1 p-2' >
                                        <button onClick={handleAddTodo} className='w-full flex items-center justify-center bg-white dark:bg-[#0f0f0f] hover:bg-[#0055D1] hover:dark:bg-[#0055D1] text-[#0055D1] hover:text-white hover:dark:text-black rounded-md transition-all ease-linear duration-150' >
                                            <PlusIcon className='h-10 w-10' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    )
}

export default Column