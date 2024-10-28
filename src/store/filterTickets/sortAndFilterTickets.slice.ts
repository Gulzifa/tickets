import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITicket } from "../../types/tickets.type";
import { IState} from "../../types/state.type";




const TICKETS_API = 'https://90e6747b36ad860a.mokky.dev/tickets';

export const fetchTicketsApi = createAsyncThunk(
    'tickets/fetchTickets',
    async () => {
        const response = await fetch(TICKETS_API)
        const tickets = await response.json()
        return tickets
    }
)

const defoultState:IState = {
    tickets: [],
    allTickets: [], //для sidebar
    filteredTickets: [],
    company: '',
    connections: null,
    status: null,
    error: null,
}
export const filterTicketsSlice = createSlice({
    name: 'filterTickets',
    initialState: defoultState,
    reducers: {
        filterTickets: (state, action: PayloadAction<{connections: number[], company: string}>) => {
            const { connections, company } = action.payload;
            state.filteredTickets = state.tickets.filter(ticket => {
                const matchConnections = connections.length > 0 ? connections.includes(ticket.connections as number) : true;
                const matchCompany = company ? ticket.company === company : true;
        
                return matchConnections && matchCompany;
            });
        },

        sortTicketsByPrice: (state) => {
            state.filteredTickets.sort((a, b) => a.price - b.price)
            return state
        },
        getFastestTickets: (state) => {
            state.filteredTickets.sort((a, b) => a.duration - b.duration)
            return state
        }, 
        sortOptimalTickets: (state) => {
            function compareTickets(ticketA: ITicket, ticketB: ITicket) {
                if (ticketA.connections===null || ticketB.connections===null) {
                    ticketA.connections = 0
                    ticketB.connections = 0
                }
                const score1 = (ticketA.duration + ticketA.connections)/ticketA.price
                const score2 = (ticketB.duration + ticketB.connections)/ticketB.price
                return score1 - score2
            }
            state.filteredTickets.sort(compareTickets)
            return state
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTicketsApi.pending, (state: typeof defoultState) => {
            state.status = 'loading'
            state.error = null
        })
        .addCase(fetchTicketsApi.fulfilled, (state: typeof defoultState, action: PayloadAction<ITicket[]>) => {
            state.status = 'resolved'
            state.tickets = action.payload
            state.allTickets = action.payload 
            state.filteredTickets = action.payload           
        })
        .addCase(fetchTicketsApi.rejected, (state: typeof defoultState, action) => {
            state.status = 'rejected'
            state.error = action.error.message || 'Unknown error'
        })
    }

})

export const { actions, reducer } = filterTicketsSlice


