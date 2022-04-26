import React,{useState, createContext} from 'react';

export const ThemeContext = createContext();
const ThemeContextProvider = (props) =>{
    const theme = {
        white: {
            color: "rgb(255, 255, 255)",
        },
        red: {
            color: "rgb(240, 50, 100)",
        }
    }
    const [activeTheme, setActiveTheme] = useState('white')
    return(
        <ThemeContext.Provider value={{...props, theme: theme[activeTheme], activeTheme, setActiveTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;