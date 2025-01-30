import React, { createContext, useState, useContext } from 'react';
import { colors } from '../constant/colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    isDark,
    toggleTheme: () => setIsDark(!isDark),
    colors: isDark ? colors.dark : colors.light,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

// contexts/ThemeContext.js
// import React, { createContext, useContext } from 'react';

// const ThemeContext = createContext();

// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }) => {
//   const theme = {
//     colors: {
//       background: '#f5f5f5',  // Provide your background color here
//       text: '#333',  // And other colors
//     },
//   };

//   return (
//     <ThemeContext.Provider value={theme}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };
