'use client'

import { useState, Fragment, useRef, FormEvent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore'
import { useBoardStore } from '@/store/BoardStore'
import TaskTypeRadioGroup from './TaskTypeRadioGroup'
import Image from 'next/image'
import { PhotoIcon } from '@heroicons/react/24/solid'

function Modal() {
	const [isOpen, closeModal] = useModalStore((state) => [state.isOpen, state.closeModal])
	const [newTaskInput, setNewTaskInput, image, setImage, newTaskType, addTask] = useBoardStore((state) => [state.newTaskInput, state.setNewTaskInput, state.image, state.setImage, state.newTaskType, state.addTask])

	const imagePictureRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!newTaskInput) return;

		addTask(newTaskInput, newTaskType, image)

		setImage(null);
		closeModal();
	}

	return (
		// Use the `Transition` component at the root level
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="form" onSubmit={handleSubmit} className="relative z-10" onClose={closeModal}>
				{/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-neutral-500 bg-opacity-25" />
				</Transition.Child>
				<div className='fixed inset-0 overflow-y-auto' >
					<div className='flex min-h-full items-center justify-center p-4 text-center' >

						{/*
          ...and another Transition.Child to apply a separate transition
          to the contents.
        */}
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full bg-gray-200 dark:bg-[#0f0f0f] text-black dark:text-white max-w-lg transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all" >
								<Dialog.Title as="h3" className="text-2xl text-center font-medium loading-6 text-black dark:text-white pb-2" >Add a Task</Dialog.Title>
								<div className='mt-2' >
									<input type='text' value={newTaskInput} onChange={(e) => setNewTaskInput(e.target.value)} placeholder='Enter a New Task Here' className='text-lg w-full bg-zinc-400 dark:bg-[#2f2f2f] border-2 border-[#0055D1] rounded-md outline-none p-5' />
								</div>
								<TaskTypeRadioGroup />
								<div>
									<button type='button' onClick={() => { imagePictureRef?.current?.click() }} className='w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2' >
										<PhotoIcon className='h-6 w-6 mr-2 inline-block' />
									</button>
									{image && (
										<Image src={URL.createObjectURL(image)} alt="Uploaded Image" onClick={() => {
											setImage(null)
										}} width={200} height={200} className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed" />
									)}
									<input type='file' ref={imagePictureRef} hidden onChange={(e) => { if (!e.target.files![0].type.startsWith("image/")) return; setImage(e.target.files![0]) }} />
								</div>
								<div className='mt-4 w-full' >
									<button type='submit' disabled={!newTaskInput} className='inline-flex w-full justify-center rounded-md border border-transparent bg-[#0055D1] px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed' >
										Add Task
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default Modal;