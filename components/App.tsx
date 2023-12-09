'use client'

import { useThemeStore } from "@/store/ThemeStore";
import Board from "./Board";
import Header from "./Header";

export default function App() {

    const [isDarkMode, toggleIsDarkMode] = useThemeStore((state) => [state.isDarkMode,  state.toggleIsDarkMode])

    return (
        <main className={isDarkMode ? "dark" : ""} >
            <div className="min-h-screen bg-white dark:bg-[#1f1f1f]" >
                {/* HEADER */}
                <Header />
                {/* BOARD */}
                <Board />
            </div>
        </main>
    )
}
