import { useDispatch } from "react-redux"
import { actions } from "../../store/filterTickets/sortAndFilterTickets.slice"
import styles from './SortButton.module.css'
import { useState } from "react"

// interface SortButtonProps {
//     className?: string
// }

function SortButton() {
    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState<string | null>(null)

    const handleClick = (type: string) => {
        setActiveButton(type);

        switch (type) {
            case 'price':
                dispatch(actions.sortTicketsByPrice())
                break;
            case 'fastest':
                dispatch(actions.getFastestTickets())
                break;
            case 'optimal':
                dispatch(actions.sortOptimalTickets())
                break;
            default:
                break;
        }
    }

    return (
        <div className={styles.button_wrap}>
            <button 
                className={`${styles.button_priceFilter} ${styles.button} ${activeButton === 'price' ? styles.button_active: ''}`} 
                onClick={() => handleClick('price')}>Самый дешевый</button>
            <button 
                className = {`${styles.button_fastestFilter} ${styles.button} ${activeButton === 'fastest' ? styles.button_active: ''}`} 
                onClick={() => handleClick('fastest')}>Самый быстрый</button>
            <button 
                className = {`${styles.button_optimalFilter} ${styles.button} ${activeButton === 'optimal' ? styles.button_active: ''}`} 
                onClick={() => handleClick('optimal')}>Самый оптимальный</button>
        </div>
    )
}
export default SortButton