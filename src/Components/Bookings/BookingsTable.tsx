import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Booking {
  id: string;
  user: string;
  parc: string;
  bookingdate: string;
  comments: string;
}

interface BookingsTableProps {
  bookings: Booking[];
}

const BookingsTable: React.FC<BookingsTableProps> = ({ bookings }) => {

  //Probably a redundant guard now
  if (!bookings) {
    return null;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Booking Reference</th>
          <th>Parc</th>
          <th>Booking Date</th>
          <th>Comments</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {
        bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{"EUR" + (booking.id.slice(0,3) + booking.user.slice(0,3) + booking.bookingdate.slice(20,23)).toUpperCase()}</td>
              <td>{booking.parc}</td>
              <td>{new Date(booking.bookingdate).toLocaleDateString()}</td>
              <td>{booking.comments}</td>
              <td><FontAwesomeIcon icon={faEdit} className="icon edit-icon" /></td>
              <td><FontAwesomeIcon icon={faTrash} className="icon delete-icon" /></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default BookingsTable;
