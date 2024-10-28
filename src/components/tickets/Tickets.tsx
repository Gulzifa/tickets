
import { useEffect, useState } from "react";
import { fetchTicketsApi } from "../../store/filterTickets/sortAndFilterTickets.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import TicketItem from "./TicketItem";
import { useTickets } from "../../hooks/useTickets";
import { ITicket } from "../../types/tickets.type";
import styles from './Tickets.module.css'
import Sidebar from "../sidebar/Sidebar";

interface TicketsProps {
    className?: string
}

function Tickets({className}: TicketsProps) {
    const {filteredTickets} = useTickets()
    const dispatch = useDispatch<AppDispatch>()

    const [loadedTickets, setLoadedTickets] = useState<ITicket[]>([])
    const [numTickets, setNumTickets] = useState(3)

    useEffect(() => {
        dispatch(fetchTicketsApi())
    }, [dispatch])

    useEffect(() => {
        setLoadedTickets(filteredTickets.slice(0, numTickets))
    }, [filteredTickets, numTickets])

    const loadMoreTickets = () => {
        setNumTickets(prevNum => prevNum + 3)
    }

    return (
     <div className={className}>
        <Sidebar className={styles.sidebar} />
        <TicketItem tickets = {loadedTickets} />
        {numTickets < filteredTickets.length && (
            <button 
            className={styles.loadButton}
            onClick={loadMoreTickets}>Загрузить еще билеты</button>
        )}
     </div>
    )
    
}

export default Tickets