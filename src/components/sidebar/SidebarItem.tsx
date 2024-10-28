import React from "react";
import styles from "./SidebarItem.module.css";



interface ISidebarItemProps {
  label: string;
  filterByConnections?: number[];
  filterByCompany?: string[];
  selectedCompany?: string;
  handleConnectionsChange?: (event: React.ChangeEvent<HTMLInputElement>, value: number) => void;
  handleCompanyChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({
    label, 
    filterByConnections,  
    filterByCompany, 
    handleConnectionsChange, 
    handleCompanyChange,
    selectedCompany
  
   }) => {


  return (
    <div className={styles.sidebar_item}>
      <div className={styles.sidebar_list}>
      <h1>{label}</h1>
        {filterByConnections ?
         filterByConnections.map((option) => (
             <label key={option} className={styles.checkbox_label}>
                <input 
                type="checkbox" 
                value={option} 
                onChange={(event) => handleConnectionsChange?.(event, option)}/>
                <span className={styles.checkbox_span}>
                  {option === 0 ? "Без пересадок" :
                   option === 1 ? `${option} пересадка` :
                   option > 1 && option < 5 ? `${option} пересадки` :
                   `${option} пересадок`}
                </span>
              </label>
            ))
            : filterByCompany
            ? filterByCompany.map((option) => (
                <label key={option} className={styles.radio_label}>
                <input 
                type="radio" 
                value={option} 
                checked = {selectedCompany === option}
                onChange={(event) => handleCompanyChange?.(event, option)}
                />
                <span className={styles.radio_span}>{option}</span>
              </label>
            ))
          : null}
      </div>
    </div>
  );
};

export default SidebarItem;
