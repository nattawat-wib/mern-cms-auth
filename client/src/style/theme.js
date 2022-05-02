//https://coolors.co/palette/8ecae6-219ebc-023047-ffb703-fb8500
import { createTheme } from "@mui/material/styles";

export const main_theme = createTheme({
    palette: {
        primary: {
            main: "#219EBC",
            light: "#8ECAE6",
            dark: "#023047",
            contrastText: "#fff"
        },
        secondary: {
            main: "#FFB703",
            dark: "#FB8500",
            contrastText: "#fff"
        },
        dark: {
            dark: "#212529",
            main: "#343a40",
            light: "#6c757d",
        },
        light: {
            main: "#fff"
        },
        text: {
            dark: "#212529",
            main: "#343a40",
            light: "#6c757d",
            disabled: "#ced4da"
        }
    },
    typography: {
        fontFamily: "Kanit, sans-serif",
    }
})
