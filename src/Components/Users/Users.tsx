import React, { useState, useEffect } from 'react';
import UsersTable from './UsersTable';
import Pagination from '../Pagination/Pagination';
import './Users.css';

interface User {
    id: string;
    name: string;
    email: string;
}

const Users: React.FC = () => {
    
  //Set state variables
   const [users, setUsers] = useState<User[]>([]);
   const [loading, setLoading] = useState(true);
   const [errorCount, setErrorCount] = useState(0);

    //Similar logic to bookings
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/1/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.data);
        setLoading(false);
        setErrorCount(0); // Reset error count if successful
      } catch (error) {
        console.error('Error fetching parcs:', error);
        setErrorCount(errorCount + 1); // Increment error count
        setLoading(true); // Set loading to true to retry
      }
    };

    // Fetch bookings when component mounts or when error occurs
    if (errorCount < 3) {
      fetchUsers();
    } else {
      setLoading(false);
    }
  },[errorCount]);

    //Similar logic to bookings
    const itemsPerPage = 10;
    const totalPages = Math.ceil((users? users.length : 0) / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = (users && users.length > 0) ? users.slice(indexOfFirstItem, indexOfLastItem) : [];

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <div className="main-content">

        <div className='page-header'>
          <div className='page-title'>Users</div>
          <div className='page-summary'>This is a listing of all Users in the system. Click the button below to add more.</div>
        </div>

        <button disabled className='create-users-btn' onClick={() => console.log('Create New User')}>Add New User</button>

        {loading ? (
          <>
            <div>Loading...</div>
          </>
        ) : (
          <>
            {users && users.length > 0 ? (
              <>
                <UsersTable users={currentUsers} />
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
            ) : (
            <p>No Users Found...</p>
            )}
          </>    
          )}
      </div>
    );
};

export default Users;
