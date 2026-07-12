import React, { useEffect } from 'react';
import BreadCrumb from '../../components/template/BreadCrumb';
import Header from '../../components/template/Header';
import Spinner from '../../components/layout/Spinner';
import {
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
} from '../../shared/enums/orders_enum';
import SingleView from '../../components/common/SingleView';
import {
  useSingleOrder,
  useUpdateOrder,
  useUpdateOrderStatus,
  useUpdatePaymentStatus,
  useUpdateDeliveryCharges,
  useUpdatePayoutStatus,
  useUpdatePickupAddress,
} from '../../shared/hooks/UseOrder';
import * as qs from 'qs';
import {
  useSelectAllNotification,
  useUpdateNotification,
} from '../../shared/hooks/UseNotification';
import moment from 'moment';
import { ORDER_STATUS, URI } from '../../domain/constant';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { SelectBox } from '../../components/Form/Form';
import { useLoggedInUser } from '../../shared/hooks/UseAuth';
import { OrderUpdateCard } from '../../components/orders/OrderUpdateCard';
import { OrderDimension } from '../../components/orders/OrderDimension';
import { Link } from 'react-router-dom';

const ViewOrder = ({ match }) => {
  const queryParams = qs.parse(window.location.search.replace('?', ''));
  const [data, reloadData] = useSingleOrder(match.params.id);
  const { order_loading, order, edit_order_loading } = data;
  const [user_data] = useLoggedInUser();
  const { user } = user_data;
  const [updateData] = useUpdateNotification();
  const [notificationParam, setNotificationParam] = useState(null);
  const [editingPickupAddress, setEditingPickupAddress] = useState(false);
  const [notificatiton_data, reloadNotificationData] =
    useSelectAllNotification();
  const [updateOrderData] = useUpdateOrderStatus();
  const { updatePickupAddress } = useUpdatePickupAddress();
  useEffect(() => {
    if (notificationParam) {
      updateData(notificationParam, { is_read: true });
      reloadNotificationData();
    }
  }, [notificationParam]);
  console.log('QUERY PARAMS', queryParams);

  useEffect(() => {
    if (queryParams.notification) {
      setNotificationParam(queryParams.notification);
    }
  }, [queryParams && queryParams.notification]);

  const [editing, setEditing] = useState(false);

  const submitFormClicked = async (values) => {
    await updateOrderData(order._id, values);
    reloadData(order._id);
    setEditing(false);
  };

  const updatePickupAddressHandler = async (values) => {
    updatePickupAddress(order._id, values);
    reloadData(order._id);
  };

  return (
    <div className='pace-done'>
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_SINGLE_TITLE}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink='View'
        />

        {order && !order.courier_details && (
          <div className='pr-2'>
            <p
              className='text-danger'
              style={{ textAlign: 'right', padding: '10px' }}
            >
              * Please update the dimensions of order package
            </p>
          </div>
        )}

        {!order_loading ? (
          order && (
            <div className='container-fluid'>
              <div className='row'>
                <div className='col-md-9'>
                  <div className='card'>
                    <div className='card-header'>
                      <h4 className='card-title'>
                        {' '}
                        Order No #{order.order_id}{' '}
                      </h4>
                      <div className='card-body'>
                        <table className='table table-striped'>
                          <thead>
                            <tr>
                              <th> Item Summary </th>
                              <th> Qty </th>
                              <th>Price</th>
                              <th> Total Price </th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products &&
                              order.products.map((item) => {
                                return (
                                  <tr>
                                    <td>
                                      {' '}
                                      <img
                                        src={`${URI}${item.image}`}
                                        style={{
                                          height: '75px',
                                          width: '75px',
                                          objectFit: 'contain',
                                        }}
                                      />{' '}
                                      {item.name}{' '}
                                    </td>
                                    <td> x {item.quantity} </td>
                                    <td>
                                      {' '}
                                      ₹{item.sale_price}{' '}
                                      <span
                                        style={{
                                          textDecoration: 'line-through',
                                        }}
                                      >
                                        {item.regular_price}
                                      </span>{' '}
                                    </td>
                                    <td>
                                      {' '}
                                      ₹{item.quantity * item.sale_price}{' '}
                                    </td>
                                  </tr>
                                );
                              })}
                            <tr></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='card'>
                        <div className='card-header'>
                          <h4 className='card-title'> Customer Details </h4>
                        </div>
                        <div className='card-body'>
                          <div className='d-flex justify-content-between'>
                            <div> Name </div>
                            <div>
                              <strong>
                                {order.customer && order.customer.name}
                              </strong>
                            </div>
                          </div>
                          <hr />
                          {user && user.role === 'SUPER ADMIN' && (
                            <>
                              <div className='d-flex justify-content-between'>
                                <div> Phone </div>
                                <div>
                                  <strong>
                                    {order.customer && order.customer.phone}
                                  </strong>
                                </div>
                              </div>
                              <hr />
                              <div className='d-flex justify-content-between'>
                                <div> Email </div>
                                <div>
                                  <strong>
                                    {order.customer && order.customer.email}
                                  </strong>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className='card'>
                        <div className='card-header'>
                          <h4 className='card-title'> Vendor Details </h4>
                        </div>
                        <div className='card-body'>
                          <div className='d-flex justify-content-between'>
                            <div> Store Name </div>
                            <div>
                              <strong>
                                {order.vendor &&
                                order.vendor.vendor &&
                                order.vendor.vendor.store_name
                                  ? order.vendor.vendor.store_name
                                  : order.vendor.name}
                              </strong>
                            </div>
                          </div>
                          <hr />
                          <div className='d-flex justify-content-between'>
                            <div> Phone </div>
                            <div>
                              <strong>
                                {order.vendor && order.vendor.phone}
                              </strong>
                            </div>
                          </div>
                          <hr />
                          <div className='d-flex justify-content-between'>
                            <div> Email </div>
                            <div>
                              <strong>
                                {order.vendor && order.vendor.email}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='card'>
                        <div className='card-header'>
                          <h4 className='card-title'>
                            <div className='d-flex justify-content-between'>
                              <div>Pickup Address Details</div>
                              <div>
                                {' '}
                                <button
                                  className='btn btn-primary btn-block'
                                  onClick={() => {
                                    setEditingPickupAddress(true);
                                  }}
                                >
                                  Update
                                </button>{' '}
                              </div>
                            </div>
                          </h4>
                        </div>
                        <div className='card-body'>
                          {editingPickupAddress || !order?.pickup_address ? (
                            <div>
                              <div>Select Address</div>
                              <div class='d-grid gap-2 pt-2 '>
                                {order?.vendor?.vendor?.pickup_address &&
                                  order?.vendor?.vendor?.pickup_address.map(
                                    (address) => {
                                      return (
                                        <button
                                          className='btn btn-primary btn-block'
                                          onClick={() => {
                                            updatePickupAddressHandler(address);
                                          }}
                                        >
                                          {address?.address_1}{' '}
                                          {address?.address_2}{' '}
                                          {address?.landmark} {address?.city}{' '}
                                          {address?.state} {address?.pin}
                                        </button>
                                      );
                                    }
                                  )}
                              </div>
                            </div>
                          ) : (
                            <div>
                              Address: {order.pickup_address.address_1}{' '}
                              {order.pickup_address.address_2}{' '}
                              {order.pickup_address.landmark}{' '}
                              {order.pickup_address.city}{' '}
                              {order.pickup_address.state}{' '}
                              {order.pickup_address.pin}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='card'>
                        <div className='card-header'>
                          <h4 className='card-title'> Delivery Address </h4>
                        </div>
                        <div className='card-body'>
                          <div className='d-flex justify-content-between'>
                            <div> Address 1</div>
                            <div>
                              <strong>
                                {order.address && order.address.address_1}
                              </strong>
                            </div>
                          </div>
                          <hr />
                          <div className='d-flex justify-content-between'>
                            <div> Address 2</div>
                            <div>
                              <strong>
                                {order.address && order.address.address_2}
                              </strong>
                            </div>
                          </div>
                          <hr />
                          <div className='d-flex justify-content-between'>
                            <div> Landmark</div>
                            <div>
                              <strong>
                                {order.address && order.address.landmark}
                              </strong>
                            </div>
                          </div>
                          <hr />
                          <div className='d-flex justify-content-between'>
                            <div> City</div>
                            <div>
                              <strong>
                                {order.address && order.address.landmark}{' '}
                                {order.address && order.address.state}{' '}
                                {order.address && order.address.pin}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                      {user && user.role === 'SUPER ADMIN' && (
                        <div className='card'>
                          <div className='card-header'>
                            <h4 className='card-title'> Payout </h4>
                          </div>
                          <div className='card-body'>
                            <div className='d-flex justify-content-between'>
                              <div> Order Total</div>
                              <div>
                                <strong> ₹{order.total_amount}</strong>
                              </div>
                            </div>

                            <hr />
                            <div className='d-flex justify-content-between'>
                              <div>
                                {' '}
                                Platform Fee (
                                {order.commission &&
                                  order.commission.commission_percentage}
                                %){' '}
                              </div>
                              <div>
                                <strong>
                                  ₹
                                  {order.commission &&
                                    order.commission.commission_amount}
                                </strong>
                              </div>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between'>
                              <div> GST(18%)</div>
                              <div>
                                <strong>
                                  ₹
                                  {order.commission &&
                                    order.commission.tax &&
                                    parseFloat(order.commission.tax).toFixed(2)}
                                </strong>
                              </div>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between'>
                              <div>
                                <strong> Platform Fee with GST </strong>
                              </div>
                              <div>
                                <strong>
                                  ₹
                                  {order.commission &&
                                    order.commission.sub_commission_amount &&
                                    parseFloat(
                                      order.commission.sub_commission_amount
                                    ).toFixed(2)}
                                </strong>
                              </div>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between'>
                              <div> Delivery Charges</div>
                              <div>
                                <strong>
                                  ₹
                                  {order.commission &&
                                    order.commission.delivery_charges &&
                                    parseFloat(
                                      order.commission.delivery_charges
                                    ).toFixed(2)}
                                </strong>
                              </div>
                            </div>
                            <hr />

                            <div className='d-flex justify-content-between'>
                              <div>
                                {' '}
                                <strong> Total Receivable Payout </strong>{' '}
                              </div>
                              <div>
                                <strong>
                                  {order.commission &&
                                  order.commission.total_commission_amount
                                    ? '₹' +
                                      parseFloat(
                                        order.total_amount -
                                          order.commission
                                            .total_commission_amount
                                      ).toFixed(2)
                                    : 'Check once delivery charges updated'}
                                </strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='col-md-3'>
                  <OrderUpdateCard
                    order={order}
                    reloadData={reloadData}
                    user={user}
                  />
                  {/* <OrderDimension order={order} /> */}

                  <div className='card'>
                    <div className='card-header'>
                      <h4 className='card-title'> Order Summary </h4>
                    </div>
                    <div className='card-body'>
                      <div className='d-flex justify-content-between'>
                        <div> Order Date </div>
                        <div>
                          <strong>
                            {moment(order.order_date).format('DD-MMM-YYYY')}
                          </strong>
                        </div>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <div> Sub Total </div>
                        <div>
                          <strong>{order.sub_total}</strong>
                        </div>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <div> Tax </div>
                        <div>
                          <strong>{order.tax}</strong>
                        </div>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <div> Delivery Charges </div>
                        <div>
                          <strong>{order.delivery_charges}</strong>
                        </div>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <div> Discount </div>
                        <div>
                          <strong>-{order.discount}</strong>
                        </div>
                      </div>
                      <hr />
                      <div className='d-flex justify-content-between'>
                        <div> Total Amount </div>
                        <div>
                          <strong>₹{order.total_amount}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* {order.shipping_details && (
                    <div className='card'>
                      <div className='card-header'>
                        <h4 className='card-title'> Shipment Tracking </h4>
                      </div>
                      <div className='card-body'>
                        <div className='d-flex justify-content-between'>
                          <div> Shipping Order ID </div>
                          <div>
                            <strong>{order.shipping_details.order_id}</strong>
                          </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                          <div> AWB </div>
                          <div>
                            <strong>{order.shipping_details.awb}</strong>
                          </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                          <div> Current Status </div>
                          <div>
                            <strong>
                              {order.shipping_details.current_status}
                            </strong>
                          </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                          <div> Shipment Status </div>
                          <div>
                            <strong>
                              {order.shipping_details.shipment_status}
                            </strong>
                          </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                          <div> Courier Name </div>
                          <div>
                            <strong>
                              {order.shipping_details.courier_name}
                            </strong>
                          </div>
                        </div>
                        <hr />
                        <h4 className='card-title'> Order Tracking </h4>
                        {order.shipping_details.scans &&
                          order.shipping_details.scans.map((item, index) => {
                            return (
                              <div>
                                <div className='d-flex justify-content-between'>
                                  <div> Date </div>
                                  <div>
                                    <strong>{item.date}</strong>
                                  </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                  <div> Activity </div>
                                  <div>
                                    <strong>{item.activity}</strong>
                                  </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                  <div> Location </div>
                                  <div>
                                    <strong>{item.location}</strong>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  )} */}
                  {/* <div className='card'>
                    <div className='card-body'>
                      <Link
                        to={`/orders/${order._id}/track`}
                        className='btn btn-success'
                      >
                        {' '}
                        Track Order{' '}
                      </Link>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ViewOrder;
