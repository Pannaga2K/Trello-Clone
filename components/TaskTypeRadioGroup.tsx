import { useBoardStore } from '@/store/BoardStore'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'

const types = [
    {
        id: "todo",
        name: "Todo",
        description: "A new task to be completed",
        color: "bg-red-500"
    },
    {
        id: "inProgress",
        name: "In Progress",
        description: "A new task that is currently being worked on",
        color: "bg-yellow-500"
    },
    {
        id: "done",
        name: "Done",
        description: "A new task that has been completed",
        color: "bg-green-500"
    }
]

function TaskTypeRadioGroup() {

    const [newTaskType, setNewTaskType] = useBoardStore((state) => [state.newTaskType, state.setNewTaskType] )

    return (
        <div className='w-full py-5' >
            <div className='mx-auto w-full max-w-md' >
                <RadioGroup value={newTaskType} onChange={(e) => setNewTaskType(e)}>
                    <div className='space-y-2 -mx-2' >
                        {types.map((type) => (
                            <RadioGroup.Option key={type.id} value={type.id} className={({active, checked}) => `${active ? "ring-2" : ""} ${checked ? `${type.color} bg-opacity-75 text-white` : "bg-white dark:bg-black text-black dark:text-white"} transition-all ease-linear duration-150 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`} >
                                {({active, checked}) => (
                                    <>
                                        <div className='flex w-full items-center justify-between' >
                                            <div className='flex items-center' >
                                                <div className='text-lg' >
                                                    <RadioGroup.Label as="p" className={`font-medium text-black dark:text-white`} >
                                                        {type.name}
                                                    </RadioGroup.Label>
                                                <RadioGroup.Description as="span" className={`inline text-black dark:text-white`} >
                                                        <span>{type.description}</span>
                                                    </RadioGroup.Description>
                                                </div>
                                            </div>
                                            {checked && (
                                                <div className='shrink-0 dark:text-white' >
                                                    <CheckCircleIcon className='h-6 w-6' />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}

export default TaskTypeRadioGroup