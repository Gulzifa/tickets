import { ITicket } from "../../types/tickets.type";
import styles from './TicketItem.module.css'

interface TicketItemProps {
    tickets: ITicket[],

  }

const TicketItem: React.FC<TicketItemProps> = ( {tickets} ) => {
    const durationFormat = (duration: number) => {
        const hours = Math.floor(duration / 60)
        const minutes = duration % 60
        return `${hours} ч ${minutes} мин`
    }

    const priceFormat = (price: number): string => {
        return `${price.toLocaleString('ru-RU')} Р`; // Форматируем цену
    };



    return (
        <div className={styles.ticketsItem_wrap}>
            {tickets.map(ticket => (
                    <div key={ticket.id} className={styles.ticketItem}>
                        <div className={styles.ticketPriceLogo}>
                            <h3>{priceFormat(ticket.price)}</h3>
                            <img src={ticket.image} alt={ticket.company} className={styles.ticketLogo} />
                        </div>
                        <div className={styles.ticketInfo}>
                            <div className={styles.info_wrap}>
                                <p className={styles.info_header}>{ticket.from} - {ticket.to}</p> 
                                <p className={styles.info}>{`${ticket.time.startTime} - ${ticket.time.endTime}`}</p>
                            </div>
                            <div className={styles.info_wrap}>
                                <p className={styles.info_header}>В пути</p>
                                <p>{durationFormat(ticket.duration)}</p>
                            </div>
                            <div className={styles.info_wrap}>
                                <p className={styles.info_header}>Пересадки</p>
                                <p>{ticket.connections ? `${ticket.connections} пересадки` : 'Без пересадок'}</p>
                            </div>
                        </div>
                    </div>
                    ))
            }
        </div>
    )
}

export default TicketItem