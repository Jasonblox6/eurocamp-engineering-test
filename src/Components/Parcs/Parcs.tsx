import React, { useState, useEffect } from 'react';
import ParcsTable from './ParcsTable';
import Pagination from '../Pagination/Pagination';
import './Parcs.css';

interface Parc {
    id: string;
    name: string;
    description: string;
}

const Parcs: React.FC = () => {

  //State variables
   const [parcs, setParcs] = useState<Parc[]>([]);
   const [loading, setLoading] = useState(true);
   const [errorCount, setErrorCount] = useState(0);

   //Similar logic to bookings
   useEffect(() => {
    const fetchParcs = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/1/parcs');
        if (!response.ok) {
          throw new Error('Failed to fetch parcs');
        }
        const data = await response.json();
        setParcs(data.data);
        setLoading(false);
        setErrorCount(0); 
      } catch (error) {
        console.error('Error fetching parcs:', error);
        setErrorCount(errorCount + 1);
        setLoading(true);
      }
    };

    if (errorCount < 3) {
      fetchParcs();
    } else {
      setLoading(false);
    }
  }, [errorCount]);

     //Similar logic to bookings
    const itemsPerPage = 10;
    const totalPages = Math.ceil((parcs? parcs.length : 0) / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentParcs = (parcs && parcs.length > 0) ? parcs.slice(indexOfFirstItem, indexOfLastItem) : [];

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    //Similar logic to bookings
    return (
      <div className="main-content">

        <div className='page-header'>
          <div className='page-title'>Parcs</div>
          <div className='page-summary'>This is a listing of all Parcs in the system. Click the button below to add more.</div>
        </div>

        <button disabled className='create-parcs-btn' onClick={() => console.log('Create New Parc')}>Add New Parc</button>

        {loading ? (
          <>
            <div>Loading...</div>
          </>
        ) : (
          <>
          {parcs && parcs.length > 0 ? (
            <>
              <ParcsTable parcs={currentParcs} />
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          ) : (
          <p>No Parcs Found...</p>
          )}
        </>    
        )}
      </div>
    );
};

export default Parcs;
