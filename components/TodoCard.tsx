'use client'

import getUrl from '@/lib/getUrl';
import { useBoardStore } from '@/store/BoardStore';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) {

    const deleteTask = useBoardStore((state) => state.deleteTask)
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (todo.image) {
            const fetchImage = async () => {
                const url = await getUrl(todo.image!);
                if (url) {
                    setImageUrl(url.toString())
                }
            }

            fetchImage();
        }
    }, [todo]);

    return (
        <div {...draggableProps} {...dragHandleProps} ref={innerRef} className='bg-[#0055D1] dark:bg-[#0055D1] text-white rounded-md space-y-2 drop-shadow-md' >
            <div className='flex justify-between items-center p-5' >
                <p className='text-lg' >{todo.title}</p>
                <div className='flex items-center justify-between' >
                    <button>
                        <PencilIcon className='h-6 w-6 ml-5' />
                    </button>
                    <button onClick={() => deleteTask(index, todo, id)} className='text-red-500 hover:text-red-600' >
                        <TrashIcon className='h-6 w-6 ml-5' />
                    </button>
                </div>
            </div>

            {/* {imageUrl} */}
            {imageUrl && (
                <div className='relative h-full w-full rounded-b-md' >
                    <Image src={imageUrl} alt="Todo Image" width={400} height={200} className="w-full object-contain rounded-b-md" />
                </div>
            )}
        </div>
    )
}

export default TodoCard