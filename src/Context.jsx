import { createContext, useContext, useState } from 'react'

const GlobalContext = createContext()

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches
  console.log(prefersDarkMode)
  const storedDarkMode = localStorage.getItem('dark-theme')
  if (storedDarkMode === null) {
    return prefersDarkMode
  }
  return storedDarkMode === true
}

const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode())
  const [searchTerm, setSearchTerm] = useState('monkey')

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    const body = document.querySelector('body')
    body.classList.toggle('dark-theme', newDarkTheme)
    localStorage.setItem('dark-theme', newDarkTheme)
  }
  useState(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme)
  }, [isDarkTheme])

  return (
    <GlobalContext.Provider
      value={{ toggleDarkTheme, isDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
export const useGlobalContext = () => useContext(GlobalContext)
export default AppProvider
