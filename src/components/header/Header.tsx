
interface HeaderProps {
  className?: string
}

export default function Header({ className}: HeaderProps) {
    return (
      <div className={className}>
        <img src="/logoTickets.svg" alt="logo" />
        <p>Поиск авиабилетов</p>
      </div>
    )
  }
  