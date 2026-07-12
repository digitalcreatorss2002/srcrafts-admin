import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import * as qs from 'qs';

function Pagination({ data, count, pages, loading }) {
  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState(null);

  const handlePageChange = (page) => {
    const queryParams = qs.parse(window.location.search.replace('?', ''));
    queryParams['pageNumber'] = page;
    const query = qs.stringify(queryParams, {
      encodeValuesOnly: true,
    });

    history.push(`${location.pathname}?${query}`);
  };
  useEffect(() => {
    if (pages && count > 0) {
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      let newPage = queryParams.pageNumber;
      let numberToShow = newPage ? (newPage !== page ? Number(newPage) : 1) : 1;
      console.log('numberToShow', numberToShow);
      setPage(numberToShow);
    }
  }, [window.location.search, pages]);
  useEffect(() => {
    console.log(page, pages);
    if (pages && page > pages) {
      const queryParams = qs.parse(window.location.search.replace('?', ''));
      queryParams['pageNumber'] = 1;
      const query = qs.stringify(queryParams, {
        encodeValuesOnly: true,
      });

      history.push(`${location.pathname}?${query}`);
    }
  }, [page, pages]);

  const [pageArray, setPageArray] = useState(null);

  useEffect(() => {
    if (pages) {
      let newArray = Array.from({ length: pages }, (_, i) => i + 1);
      setPageArray(newArray);
    }
  }, [pages]);

  return (
    <div>
      {!loading && count > 0 && (
        <div className='row'>
          <div className='col-md-4'></div>
          <div className='col-md-8'>
            <nav className=''>
              <ul className='pagination'>
                <li
                  className={
                    page == 1
                      ? `paginate_button page-item previous disabled`
                      : `paginate_button page-item previous`
                  }
                >
                  <a
                    className='page-link'
                    tabIndex={-1}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Previous
                  </a>
                </li>
                {pages &&
                  pageArray &&
                  pageArray.map((item, index) => {
                    return (
                      <li
                        className={
                          page == index + 1
                            ? `paginate_button page-item active`
                            : `paginate_button page-item`
                        }
                        key={index}
                      >
                        <a
                          className='page-link'
                          onClick={() => handlePageChange(index + 1)}
                          style={{ cursor: 'pointer' }}
                        >
                          {index + 1}
                        </a>
                      </li>
                    );
                  })}
                {/* <li className="paginate_button page-item">
                  <a className="page-link">{page}</a>
                </li> */}

                <li
                  className={
                    page == pages
                      ? `paginate_button page-item next disabled`
                      : `paginate_button page-item next`
                  }
                >
                  <a
                    className='page-link'
                    onClick={() => handlePageChange(page + 1)}
                    style={{ cursor: 'pointer' }}
                  >
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pagination;
