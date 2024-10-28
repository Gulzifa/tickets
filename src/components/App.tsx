import { useState } from 'react';
import styles from './App.module.css'
import SortButton from "./buttons/SortButton";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Tickets from "./tickets/Tickets";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  console.log(isSidebarOpen)
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState)
  }

  return (
    <div className={styles.App}>
      <Header className={styles.header} />
      <div className={styles.main}>
        <Sidebar className={styles.sidebar} />
        <div className={styles.content}>
          <SortButton />
          <div className={styles.sidebar_burger}>
            <h1>Любая авиакомпания,</h1>
            <div className={styles.sidebar_burgerSettings}  onClick={toggleSidebar}>
                <p>Открыть настройки</p>
                <button>&#x276F;</button>
            </div>
          </div>
          {isSidebarOpen && <Sidebar className={styles.sidebar_burgerMenu} />}
          <Tickets className={styles.tickets} />
        </div>
      </div>
    </div>
  );
}

export default App;
