import { ITicket } from "./tickets.type";


export interface IState {
    tickets: ITicket[];
    allTickets: ITicket[],
    filteredTickets: ITicket[];
    company: string;
    connections: number | null;
    status: string | null;
    error: Error | null | string;
  }