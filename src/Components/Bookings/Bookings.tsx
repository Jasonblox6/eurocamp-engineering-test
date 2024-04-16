import React, { useState, useEffect } from 'react';
import BookingsTable from './BookingsTable';
import Pagination from '../Pagination/Pagination';
import Modal from '../Modal/Modal';
import './Bookings.css';

export interface Booking {
    id: string;
    user: string;
    parc: string;
    bookingdate: string;
    comments: string;
}

const Bookings: React.FC = () => {

  //State variables
   const [bookings, setBookings] = useState<Booking[]>([]);
   const [showModal, setShowModal] = useState(false);
   const [loading, setLoading] = useState(true);
   const [errorCount, setErrorCount] = useState(0);

  //Fetch the bookings data from the API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/1/bookings');
        //Throw an error if there's an issue
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        //Set the bookings
        setBookings(data.data);
        //Set loading to false
        setLoading(false);
        //Reset error count
        setErrorCount(0);
        //In case of error
      } catch (error) {
        console.error('Error fetching bookings:', error);
        //Increment error count and retry
        setErrorCount(errorCount + 1);
        setLoading(true);
      }
    };

    //This will initially fetch, and then refetch on error count increase
    if (errorCount < 3) {
      fetchBookings();
    } else {
      //If the count has failed three times, give up on loading
      setLoading(false);
    }
  }, [errorCount]);

    //Set row count
    const itemsPerPage = 10;
    //Calculate total page count
    const totalPages = Math.ceil((bookings? bookings.length : 0) / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBookings = (bookings && bookings.length > 0) ? bookings.slice(indexOfFirstItem, indexOfLastItem) : [];

    //Function to handle creation of a new booking - called via onSubmit of modal
    const handleCreateBooking = async (bookingData: Booking) => {
      try {
        const response = await fetch('http://localhost:3001/api/1/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(bookingData),
        });
  
        if (response.ok) {
          //Bit hacky, but if the post is successful, increase error count so the tably refreshes - would ideally use a new state variable
          setErrorCount(1);
          //Close the modal (visual confirmation would be nice e.g. a banner)
          setShowModal(false);
          //Go to the last page
          setCurrentPage(Math.ceil((bookings.length + 1) / itemsPerPage));
  
        } else {
          throw new Error('Failed to create booking');
        }
      } catch (error) {
        console.error('Error creating booking:', error);
        //Simply close the modal
        setShowModal(false);
      }
    };

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <div className="main-content">
        <div className='page-header'>
          <div data-testid="bookings-header" className='page-title'>Bookings</div>
          <div data-testid="bookings-summary" className='page-summary'>This is a listing of all Bookings in the system. Click the button below to add more.</div>
        </div>

        <button data-testid="create-booking" className="create-booking-btn" onClick={() => setShowModal(true)}>Add New Booking</button>

        <Modal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleCreateBooking}/>

        {loading ? (
          <>
            <div>Loading...</div>
          </>
        ) : (    
          <>   
            {bookings && bookings.length > 0 ? (
              <>
                <BookingsTable bookings={currentBookings} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            ) : (
            <p>No Bookings Found...</p>
            )}
          </>    
          )}
      </div>
    );
};

export default Bookings;
