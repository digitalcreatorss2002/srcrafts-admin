import React, { useState, useEffect } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import Pagination from '../../components/common/Pagination';
import AddBtn from '../../components/common/AddBtn';
import {
  view_all_table,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
  inputFields,
  inputFieldsForExport,
} from '../../shared/enums/products_enum';
import DataTable from '../../components/common/DataTable';
import {
  useAllProducts,
  useGetDropdownOptions,
  useBulkDeleteProduct,
} from '../../shared/hooks/UseProduct';
import SidebarFilter from '../../components/common/SidebarFilter';
import { URI } from '../../domain/constant';
import { Link } from 'react-router-dom';
import TableViewBtn from '../../components/common/TableViewBtn';
import TableEditBtn from '../../components/common/TableEditBtn';
import TableDeleteBtn from '../../components/common/TableDeleteBtn';
import { UseDataForExcel, UseFilter } from '../../shared/hooks/UseExcel';
import ExportComponent from '../../components/common/ExportComponent';
import ReactModal from 'react-modal';

const AllProducts = ({}) => {
  const [modal, setModal] = useState(false);
  const [data, setPageNumber, deleteBtnClicked] = useAllProducts();
  const [handleDeleteBulkProducts] = useBulkDeleteProduct();
  const { products_loading, products, total_products, page, pages } = data;
  const [dropdownOptions, loadOptions] = useGetDropdownOptions();
  const [isChecked, setisChecked] = useState([]);
  const [delmsg, setDelmsg] = useState('');

  const [exportXLSXData] = UseFilter();

  const [convertToReadable, exportData] = UseDataForExcel();

  useEffect(() => {
    if (products) {
      convertToReadable(products, inputFieldsForExport);
    }
  }, [products]);

  const handleOnExport = () => {
    exportXLSXData(exportData, 'Products', 'products');
  };

  const handlecheckbox = (e) => {
    const { value, checked } = e.target;
    console.log(value);
    if (checked) {
      setisChecked([...new Set([...isChecked, value])]);
    } else {
      setisChecked(isChecked.filter((e) => e !== value));
    }
  };

  const handleShowModel = () => {
    if (isChecked.length !== 0) {
      setModal(true);
    } else {
      alert('please Select at least one check box !');
    }
  };

  const alldelete = async () => {
    console.log(isChecked);
    if (isChecked.length !== 0) {
      handleDeleteBulkProducts(isChecked);
      setisChecked([]);
      setModal(false);
    } else {
      alert('please Select at least one check box !');
    }
  };

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_TITLE}
          mainLinkTitle='Dashboard'
          mainLinkUrl={LINK_URL}
          activeLink={PAGE_TITLE}
        />
        <ExportComponent handleOnExport={handleOnExport} />

        <div className='container-fluid'>
          <div className='row'>
            {SIDEBAR_OPTIONS && (
              <SidebarFilter
                SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
                dropdown_options={dropdownOptions}
                loadOptions={loadOptions}
              />
            )}
            <div className='col-lg-10'>
              <div
                className='card'
                style={{ boxShadow: 'rgb(227 233 243) 0px 4px 22px' }}
              >
                <div className='card-body'>
                  <div className='d-flex justify-content-between'>
                    <div>
                      <AddBtn item={LINK_URL} title={PAGE_SINGLE_TITLE} />
                    </div>
                    <div>
                      <Link
                        to='/products/bulk-upload'
                        className='btn btn-primary'
                        style={{ marginRight: '10px' }}
                      >
                        Bulk Import
                      </Link>
                    </div>
                  </div>
                  {total_products} records found
                  <button
                    className='btn btn-danger'
                    onClick={() => handleShowModel()}
                  >
                    Delete
                  </button>
                  <div className='table-responsive'>
                    <table className='table table-striped'>
                      <thead>
                        <tr>
                          <th>
                            {/* <input
                              type='checkbox'
                            // onChange={(e) => handlecheckbox(e)}
                            /> */}
                          </th>
                          <th> # </th>
                          <th> Image </th>
                          <th> Product Name </th>
                          <th> Price </th>
                          <th> Collections </th>
                          <th> In Stock </th>
                          <th> Have Variations? </th>
                          <th>Product Status </th>
                          <th>Vendor </th>
                          <th> Action </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products &&
                          products.map((item, product_index) => {
                            return (
                              <tr>
                                <td>
                                  <input
                                    type='checkbox'
                                    value={item._id}
                                    checked={isChecked.includes(item._id)}
                                    onChange={(e) => handlecheckbox(e)}
                                  />
                                </td>

                                <td> {product_index + 1} </td>
                                <td>
                                  {item.media &&
                                    item.media.map((image, image_index) => {
                                      if (image_index < 2) {
                                        return (
                                          <img
                                            src={`${URI}${image}`}
                                            style={{
                                              width: '75px',
                                              height: '75px',
                                              objectFit: 'cover',
                                              borderRadius: '75px',
                                            }}
                                          />
                                        );
                                      }
                                    })}
                                  {item.media &&
                                    item.media.length > 2 &&
                                    `+ ${item.media.length - 2} More`}
                                </td>
                                <td> {item.name} </td>
                                <td>
                                  {item.sale_price < item.regular_price && (
                                    <label
                                      style={{
                                        textDecoration: 'line-through',
                                        paddingRight: '10px',
                                      }}
                                    >
                                      {item.regular_price}{' '}
                                    </label>
                                  )}

                                  {item.sale_price}
                                </td>
                                <td>
                                  {item.collections &&
                                    item.collections.map((collection) => {
                                      return (
                                        <div>
                                          <span className='badge bg-warning'>
                                            {collection.name}
                                          </span>
                                        </div>
                                      );
                                    })}
                                </td>
                                <td>
                                  <label
                                    className={
                                      item.in_stock
                                        ? 'badge bg-success'
                                        : 'badge bg-danger'
                                    }
                                  >
                                    {item.in_stock ? 'YES' : 'NO'}
                                  </label>
                                </td>
                                <td>
                                  <label
                                    className={
                                      item.is_variable_product
                                        ? 'badge bg-success'
                                        : 'badge bg-danger'
                                    }
                                  >
                                    {item.is_variable_product ? 'YES' : 'NO'}
                                  </label>
                                </td>
                                <td>
                                  <label
                                    className={
                                      item.product_status === 'Active'
                                        ? 'badge bg-success'
                                        : item.product_status === 'Pending'
                                        ? 'badge  bg-warning'
                                        : 'badge  bg-danger'
                                    }
                                  >
                                    {item.product_status
                                      ? item.product_status
                                      : null}
                                  </label>
                                </td>
                                <td>
                                  {item.vendor && item.vendor.vendor
                                    ? item.vendor.vendor.store_name
                                      ? item.vendor.vendor.store_name
                                      : item.vendor.name
                                    : null}
                                </td>
                                <td>
                                  <TableViewBtn id={item._id} item={LINK_URL} />
                                  <TableEditBtn id={item._id} item={LINK_URL} />
                                  <a
                                    className='btn btn-soft-light'
                                    target='_blank'
                                    href={`https://pickkro.com/product/${products[product_index].slug}`}
                                  >
                                    <i className='fa fa-location-arrow' />
                                  </a>
                                  <TableDeleteBtn
                                    id={item._id}
                                    deleteBtnClicked={deleteBtnClicked}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        {products && products.length === 0 && (
                          <tr>
                            <td colSpan={20}>No result found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {/* <DataTable
                      keys={view_all_table}
                      data={products}
                      field={LINK_URL}
                      page={page}
                      deleteBtnClicked={deleteBtnClicked}
                      loading={products_loading}
                      inputFields={inputFields}
                      PAGE_TITLE={PAGE_TITLE}
                      PAGE_SINGLE_TITLE={PAGE_SINGLE_TITLE}
                    /> */}

                    <Pagination
                      data={products}
                      page={page}
                      pages={pages}
                      count={total_products}
                      setPage={setPageNumber}
                      loading={products_loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={modal}
        contentLabel='Modal'
        className='Modal'
        overlayClassName='Overlay'
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <div className='quick-view'>
          <div className='qv-header'>
            <div className='title'> Confirm </div>
            <button
              onClick={() => {
                setModal(false);
              }}
              className='btn btn-primary'
            >
              <i className='fa fa-times'></i>
            </button>
          </div>
          <div className='qv-body'>
            <div style={{ padding: '50px 50px' }}>
              <div>
                <h3>Do You really want to delete? </h3>
                <div
                  className='d-flex justify-content-center'
                  style={{ gap: '20px' }}
                >
                  <div>
                    <button
                      className='btn btn-danger'
                      onClick={() => alldelete()}
                    >
                      YES{' '}
                    </button>
                  </div>
                  <div>
                    <button
                      className='btn btn-secondary'
                      onClick={() => setModal(false)}
                    >
                      {' '}
                      NO{' '}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default AllProducts;
