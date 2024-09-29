import React from 'react'
import styles from './board.module.css';
import CardContainer from './CardContainer';
import { useGroupPriority } from '../../providers/GroupPriorityProvider';
import useFetch from '../../hooks/useFetch';

const Board = () => {
  const { grouping, priority } =
    useGroupPriority();

    let { data, loading, error } = useFetch('https://api.quicksell.co/v1/internal/frontend-assignment');

    
    if (loading) {
      return <div>Loading...</div>;
    }

    data.tickets = sortTickets(data?.tickets, priority);

    if (error) {
      return <div>Error: {error}</div>;
    }

    // console.log('data from board', data);
  switch (grouping) {
    case 'STATUS':
      return BoardByStatus(data, grouping);
    case 'USER':
      return BoardByUser(data, grouping);
    case 'PRIORITY':
      return BoardByPriority(data, grouping);
    default:
      return BoardByStatus(data, grouping);
  }    
}

function sortTickets(tickets, sortBy) {
  const ticketsCopy = [...tickets];

  return ticketsCopy.sort((a, b) => {
    if (sortBy === "PRIORITY") {
      return b.priority - a.priority; 
    } else if (sortBy === "TITLE") {
      return a.title.localeCompare(b.title); 
    } else {
      return 0; 
    }
  });
}

function groupTicketsByStatus(tickets) {
  return tickets.reduce((acc, ticket) => {
    const status = ticket.status === "In progress" ? "IN_PROGRESS" : ticket.status.toUpperCase();
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(ticket);
    return acc;
  }, {});
}

function groupTicketsByUser(tickets) {
  return tickets.reduce((acc, ticket) => {
    const userId = ticket.userId; // Get the userId from the ticket

    // Initialize an array for the user if it doesn't exist
    if (!acc[userId]) {
      acc[userId] = [];
    }

    // Push the ticket into the corresponding user's array
    acc[userId].push(ticket);
    return acc;
  }, {});
}

function groupTicketsByPriority(tickets) {
  return tickets.reduce((acc, ticket) => {
    const priority = ticket.priority; // Get the priority from the ticket

    // Initialize an array for the priority if it doesn't exist
    if (!acc[priority]) {
      acc[priority] = [];
    }

    // Push the ticket into the corresponding priority's array
    acc[priority].push(ticket);
    return acc;
  }, {});
}


const BoardByStatus = (data, grouping, priority) => {
  const STATUS_OPTIONS = [ "BACKLOG", "TODO", "IN_PROGRESS", "DONE", "CANCELLED"];
  const groupedTickets = groupTicketsByStatus(data?.tickets);
  return (
    <div className={styles.boardContainer}>
      { STATUS_OPTIONS.map((status) => {
        return <CardContainer grouping={grouping} status={status} data={groupedTickets[status]} />
      }) }
    </div>
  );
};

const BoardByUser = (data, grouping) => {
  const groupedTickets = groupTicketsByUser(data?.tickets);
  console.log('groupedTickets', groupedTickets);
  return (
    <div className={styles.boardContainer}>

      { data?.users.map((userData) => {
        console.log('userData', userData.id);
        return <CardContainer grouping={grouping} data={groupedTickets[userData.id]} userData={userData} />
      }) }
    </div>
  );
}

const BoardByPriority = (data, grouping) => {
  const groupedTickets = groupTicketsByPriority(data?.tickets);
  console.log('groupedTickets', groupedTickets);
  return (
    <div className={styles.boardContainer}>
      { [0, 4, 3, 2, 1].map((priority) => {
        return <CardContainer grouping={grouping} data={groupedTickets[priority]} priority={priority} />
      }) }
    </div>
  );
}


export default Board;