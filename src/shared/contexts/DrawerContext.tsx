import React, { createContext, useCallback, useContext, useState } from "react";

interface IDrawerContextData {
    isDrawerOpen: boolean;
    toggleDrawerOpen: () => void;
    drawerOptions: IDrawerOption[];
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

const DrawerContext = createContext({} as IDrawerContextData)

interface IDrawerOption {
    icon: string;
    path: string;
    label: string;
}

interface IAppDrawerProviderProps {
    children: React.ReactNode
}

export const useDrawerContext = () => {
    return useContext(DrawerContext)
}

export const AppDrawerProvider: React.FC<IAppDrawerProviderProps> = ({ children }) => {
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false)
    const [ drawerOptions, setDrawerOptions ] = useState<IDrawerOption[]>([])

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen)
    }, []) 

    const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
        setDrawerOptions(newDrawerOptions)
    }, []) 

    return (
        <DrawerContext.Provider value={{ 
            isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions 
        }}>
            {children}
        </DrawerContext.Provider>
    )
}

