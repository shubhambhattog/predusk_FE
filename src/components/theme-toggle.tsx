"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { ThemeAnimationType, useModeAnimation } from "react-theme-switch-animation";
import { useEffect } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
        animationType: ThemeAnimationType.CIRCLE,
        duration: 500,
        easing: "ease-in-out",
        isDarkMode: theme === "dark",
        onDarkModeChange: (isDark) => {
            setTheme(isDark ? "dark" : "light");
        },
    });

    // Sync initial theme state
    useEffect(() => {
        if (theme === "dark" && !isDarkMode) {
            // Initial sync if needed
        }
    }, [theme, isDarkMode]);

    return (
        <Button
            ref={ref}
            variant="outline"
            size="icon"
            onClick={toggleSwitchTheme}
            className="relative overflow-hidden"
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
