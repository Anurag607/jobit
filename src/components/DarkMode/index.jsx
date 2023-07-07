import React from "react";
import styles from "./DarkMode.module.css";
import classNames from "classnames";

let prefersDark = false

const DarkMode = () => {
  const [theme, setTheme] = React.useState('light')
  const [isMobile, setIsMobile] = React.useState(false)

  const setDark = () => {
    document.documentElement.setAttribute("data-theme", "dark")
  }
  
  const setLight = () => {
    document.documentElement.setAttribute("data-theme", "light")
  }
  
  if(typeof window !== 'undefined') {
    prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  }
  
  const defaultDark =
    theme === "dark" || (theme === null && prefersDark)
  
  if (defaultDark) {
    setDark();
  }
  
  const toggleTheme = (event) => {
    if (event.currentTarget.dataset.theme === 'light') {
      setDark();
    } else {
      setLight();
    }
  }
  const conditionalTranslationOnWindowResize= () => {
    let mql = window.matchMedia("(max-width: 960px)");
    setIsMobile(mql.matches);
  }

  React.useEffect(() => {
    conditionalTranslationOnWindowResize();
  }, [])

  React.useEffect(() => {
    window.addEventListener('resize', conditionalTranslationOnWindowResize)
  })  
  

  return (
    <div 
      className={classNames({
        [styles.darkMode]: true,
        "absolute p-[0.25rem] -translate-x-2/4 ": true,
        "top-7 left-[95%] translate-y-[-1.65rem]": isMobile === true ? false : true,
        "top-1/2 left-[77.5%] translate-y-[-1.35rem]": isMobile === true ? true : false,
      })}
      data-theme={theme}
      onClick={(event) => {
          setTheme(currentTheme => ((currentTheme === 'light') ? 'dark' : 'light'))
          toggleTheme(event)
      }}
    >
      <img 
        src={`${(theme === 'light') ? '/dark-mode.png' : '/moon.png'}`} 
        alt={"switch"}
        className={classNames({
          "w-8 h-8": isMobile,
          "w-7 h-7": !isMobile,
        })}
      />
    </div>
  )
};

export default DarkMode;
