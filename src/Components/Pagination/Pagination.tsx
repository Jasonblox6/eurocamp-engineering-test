import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './Pagination.css';

//Reusable Pagination Component

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button className="prev-btn" onClick={handlePrevPage} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <span className="page-info">{currentPage} / {totalPages}</span>
      <button className="next-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Pagination;
