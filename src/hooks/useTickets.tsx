import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ITicket } from "../types/tickets.type";

export const useTickets = () => {
    const tickets = useSelector((state: RootState) => state.reducer.tickets)
    const allTickets: ITicket[] = useSelector((state: RootState) => state.reducer.allTickets)
    const filteredTickets = useSelector((state: RootState) => state.reducer.filteredTickets)
    return {tickets, allTickets, filteredTickets}
}