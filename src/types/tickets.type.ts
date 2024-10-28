export interface ITicketTime {
    startTime: string;
    endTime: string;
}

export interface ITicket {
    id: number;
    from: string;
    to: string;
    company: string;
    price: number;
    time: ITicketTime;
    duration: number;
    connections: number | null;
    image?: string
}