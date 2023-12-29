import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({
  pageCount,
  onPageChange,
  currentPage,
  todosLength,
  PAGE_SIZE,
}) => {
  return (
    <>
      {todosLength > PAGE_SIZE && (
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={onPageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          renderOnZeroPageCount={null}
          forcePage={currentPage}
        />
      )}
    </>
  );
};

export default Pagination;
