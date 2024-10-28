import SidebarItem from "./SidebarItem";
import { useTickets } from "../../hooks/useTickets";
import { useDispatch } from "react-redux";
import { actions } from "../../store/filterTickets/sortAndFilterTickets.slice";
import { useMemo, useState } from "react";


interface SidebarProps {
  className?: string
}
interface IFilters {
  connections: number[]; 
  company: string;
}

function Sidebar( {className}: SidebarProps) {
  const {allTickets} = useTickets();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<IFilters>({connections: [], company: ''});

  const handleConnectionsChange = (event: React.ChangeEvent<HTMLInputElement>, connection: number) => {
    const newConnections = event.target.checked
    ? [...filters.connections, connection]
    : filters.connections.filter(c => c !== connection);

  setFilters(prevFilters => ({...prevFilters,connections: newConnections}));

  dispatch(actions.filterTickets({ connections: newConnections, company: filters.company }));
};

  const handleCompanyChange = (
    event: React.ChangeEvent<HTMLInputElement>, company: string) => {
    const newCompany = event.target.checked ? company : '';
    
    setFilters(prevFilters => ({
      ...prevFilters,
      company: newCompany
    }));
  
    dispatch(actions.filterTickets({ ...filters, company: newCompany }));
  }


  const connectionsArray = useMemo(() => {
    const connections = allTickets.map((ticket) => {
      if (ticket.connections === null) {
        ticket.connections = 0;
      }
      return ticket?.connections;
    });
    return [...new Set(connections)].sort((a, b) => a - b);
  }, [allTickets]);
  
  const companyArray = useMemo(() => {
    const companies = allTickets.map((ticket) => {
      return ticket?.company;
    });
    return [...new Set(companies)];
  }, [allTickets]);



  return (
    <div className={className}>
      <SidebarItem
        label="Количество пересадок"
        filterByConnections={connectionsArray}
        handleConnectionsChange={handleConnectionsChange}
      />
      <SidebarItem
        label="Компании"
        filterByCompany={companyArray}
        handleCompanyChange={handleCompanyChange}
        selectedCompany={filters.company}
      />
    </div>
  );
}

export default Sidebar;
