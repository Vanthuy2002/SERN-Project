import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

function Pagination({ onClick, pageCount }) {
  return (
    <ReactPaginate
      nextLabel='Next'
      onPageChange={onClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel='Prev'
      pageClassName='page-item'
      pageLinkClassName='page-link'
      previousClassName='page-item'
      previousLinkClassName='page-link'
      nextClassName='page-item'
      nextLinkClassName='page-link'
      breakLabel='...'
      breakClassName='page-item'
      breakLinkClassName='page-link'
      containerClassName='pagination justify-content-end'
      activeClassName='active'
      renderOnZeroPageCount={null}
    />
  );
}

Pagination.propTypes = {
  onClick: PropTypes.func,
  pageCount: PropTypes.number,
};

export default Pagination;
