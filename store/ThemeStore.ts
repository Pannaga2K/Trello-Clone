import {create} from "zustand";

interface ThemeState {
    isDarkMode: boolean;
    toggleIsDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>()((set, get) => ({
    isDarkMode: false,
    toggleIsDarkMode: () => set({isDarkMode: !get().isDarkMode})
}))