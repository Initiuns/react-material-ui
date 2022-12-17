import { createTheme } from "@mui/material"
import * as M from "@mui/material/colors"

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: M.yellow[700],
            dark: M.yellow[800],
            light: M.yellow[500],
            contrastText: '#ffffff',
        },
        secondary: {
            main: M.cyan[500],
            dark: M.cyan[400],
            light: M.cyan[300],
            contrastText: '#ffffff',
        },
        background: {
            default: '#ffffff',
            paper: '#ffffff',
        }
    }
})



