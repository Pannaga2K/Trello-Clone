'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon, UserCircleIcon, SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import Avatar from 'react-avatar';
import { useBoardStore } from '@/store/BoardStore';
import fetchSuggestion from '@/lib/fetchSuggestion';
import { useThemeStore } from '@/store/ThemeStore';
import { twMerge } from 'tailwind-merge'

function Header() {

	const [board, searchString, setSearchString] = useBoardStore((state: any) => [state.board, state.searchString, state.setSearchString])
	const [isDarkMode, toggleIsDarkMode] = useThemeStore((state) => [state.isDarkMode, state.toggleIsDarkMode])

	const [loading, setLoading] = useState<boolean>(false);
	const [suggestion, setSuggestion] = useState<string>("");

	// useEffect(() => {
	// 	if(board.columns.size === 0) return

	// 	const fetchSuggestionFunction = async () => {
	// 		const suggestion = await fetchSuggestion(board);
	// 		setSuggestion(suggestion);
	// 		setLoading(false)
	// 	}

	// 	fetchSuggestionFunction()

	// }, [board])

	const toggleTheme = async () => {
		toggleIsDarkMode();
	}

	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
		}
	}, [isDarkMode])

	return (
		<header>
			<div className={`flex flex-col md:flex-row items-center p-5 mb-3 shadow-lg transition-all ease-linear duration-150 bg-white dark:bg-[#2f2f2f] dark:text-white`} >
				<div className={`absolute top-0 left-0 h-96 bg-gradient-to-br from-white to-[#0055D1] dark:from-black rounded-md filter blur-3xl opacity-50 -z-10`} />
				<Image src="https://links.papareact.com/c2cdd5" alt='Trello Logo' width={300} height={100} className='w-36 md:w-56 pb-10 md:pb-0 object-contain' />
				<div className='flex itemss-center space-x-5 flex-1 justify-end text-center w-[55px] h-[55px] rounded-md' >
					<div className={`flex items-center justify-center text-center w-[55px] h-[55px] bg-black dark:bg-yellow-400 hover:bg-blue-900 hover:dark:bg-yellow-300 rounded-md`} >
						<button className='flex items-center justify-center text-center cursor-pointer' onClick={toggleTheme} >
							{!isDarkMode && (
								<MoonIcon className={`h-10 w-10 text-blue-900 hover:text-blue-500 transition-all ease-linear duration-150`} />
							)
							}
							{isDarkMode && (
								<SunIcon className={`h-10 w-10 text-gray-200 hover:text-white transition-all ease-linear duration-150`} />
							)
							}
						</button>
					</div>
					{/* SEARCHBOX */}
					<form className={`flex items-center space-x-5 bg-black dark:bg-[#1f1f1f] rounded-md p-2 shadow-md flex-1 md:flex-initial`} >
						<MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
						<input type='text' placeholder='Search' value={searchString} onChange={(e) => setSearchString(e.target.value)} className={`rounded-md bg-white dark:bg-[#3f3f3f] text-black dark:text-white flex-1 outline-none p-2`} />
						<button type='submit' hidden>Search</button>
					</form>
					{/* ICONS  */}
					{/* AVATAR */}
					<Avatar name='Pannagadhara' round color='#0055D1' size='50' />
				</div>
			</div>
			{/* <div className='flex items-center justify-center px-5 py-2 md:py-5' >
				<p className='flex items-center text-sm font-light p-5 pr-5 shadow-xl rounded-xl w-fit bg-[#1f1f1f] max-w-3xl text-white' >
					<UserCircleIcon className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${loading && "animate-spin"}`} />
					{suggestion && !loading ? suggestion : "GPT is Summarizing your task..." }
				</p>
			</div> */}
		</header>
	)
}

export default Header