import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import FormComponents from '../common/FormComponents';
import moment from 'moment';
import VariableOptions from './VariableOptions';
import VariationTable from './VariationTable';
import { CheckBox, SelectBox, TextInput } from '../Form/Form';
import CommissionForm from './CommissionForm';
import { useSelector, useDispatch } from 'react-redux';
import {
  useAllVendors,
  useGetDropdownOptions,
} from '../../shared/hooks/UseVendor';
import { useLoadUser } from '../../shared/hooks/UseAuth';

function ProductForm({
  data,
  edit,
  submitForm,
  setFeaturedImage,
  setGallery,
  inputFields,
  initialValues,
  dropdown_options,
  loadOptions,
}) {
  console.log(data);
  const auth_data = useSelector((state) => state.auth);
  let history = useHistory();
  let newInitialValues = {
    name: '',
    collections: [],
    product_category: '',
    description: '',
    media: [],
    regular_price: '',
    sale_price: '',
    tax: '',
    sku: '',
    in_stock: true,
    cod_available: true,
    return_available: true,
    exchange_available: true,
    stock: 100,
    minQty:1,
    weight: '',
    length: '',
    width: '',
    height: '',
    featured: false,
    is_variable_product: false,
    variation_attrs: [
      {
        label: '',
        options: [],
      },
    ],
    variations: null,
  };

  const [vendor_data, setPageNumber, deleteBtnClicked] = useAllVendors();
  const { vendors_loading, vendors, total_vendors, page, pages } = vendor_data;

  const [user_data] = useLoadUser();

  const { user } = user_data;
  return (
    <div className='card-body'>
      {edit ? (
        <div className='row'>
          <Formik
            initialValues={{
              name: data?.name || '',
              slug: data?.slug || '',
              product_status: data?.product_status || 'Active',
            
              vendor: data?.vendor?._id || '',
            
              collections: data?.collections || [],
              // 🔥 FINAL category ID only
              category_path: data?.category_path || [],
              product_category: data?.product_category_id || '',
              // 🔥 Commission snapshot
              commission: data?.category_commission || 0,
            
              description: data?.description || '',
              media: data?.media || [],
            
              featured: !!data?.featured,
            
              published_date: data?.published_date
                ? moment(data.published_date).format('YYYY-MM-DD')
                : '',
                specifications: data?.specifications,
              regular_price: data?.regular_price || '',
              sale_price: data?.sale_price || '',
              tax: data?.tax || '',
            
              sku: data?.sku || '',
            
              in_stock: !!data?.in_stock,
              stock: data?.stock || 0,
              minQty:data?.minQty || 1,
            
              weight: data?.weight || '',
              length: data?.length || '',
              width: data?.width || '',
              height: data?.height || '',
            
              is_variable_product: !!data?.variations,
              variation_attrs: data?.variation_attrs || null,
              variations: data?.variations || null,
            
              cod_available: !!data?.cod_available,
              return_available: !!data?.return_available,
              exchange_available: !!data?.exchange_available,
            }}
            
            validationSchema={Yup.object({
              name: Yup.string().required('Required'),
              product_category: Yup.string().required('Required'),
              vendor: Yup.string().required('Required'),
              regular_price: Yup.number()
                .positive('Numbers Only')
                .required('Required'),
              sale_price: Yup.number()
                .positive('Numbers Only')
                .required('Required'),
                specifications: Yup.array().of(
                  Yup.object({
                    label: Yup.string().trim().required('Label is required'),
                    value: Yup.string().trim().required('Value is required')
                  })
                ),

              weight: Yup.number().positive('Numbers Only'),
              length: Yup.number().positive('Numbers Only'),
              height: Yup.number().positive('Numbers Only'),
              width: Yup.number().positive('Numbers Only'),
              stock: Yup.number().positive('Numbers Only'),
              minQty: Yup.number().positive('Numbers Only'),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              values.is_variable_product = values?.variations?.length == 0 ? false:true;
              await submitForm(values);
              setSubmitting(false);
              resetForm(true);
            }}
          >
            {(formik) => {
              return (
                <Form>
                  <FormComponents
                    formik={formik}
                    inputFields={inputFields}
                    setFeaturedImage={setFeaturedImage}
                    dropdown_options={dropdown_options}
                    setGallery={setGallery}
                    edit={edit}
                    loadOptions={loadOptions} 
                  />

                  {user && user.role === 'SUPER ADMIN' ? (
                    <div className='row'>
                      <div className='col-md-6'>
                        <CheckBox label='Featured' name='featured'></CheckBox>
                      </div>
                      <div className='col-md-6'>
                        <TextInput
                          label='Published Date'
                          name='published_date'
                          type='date'
                        ></TextInput>
                      </div>
                      <div className='col-md-6'>
                        <SelectBox
                          label={'product_status'}
                          name='product_status'
                        >
                          <option value=''></option>
                          <option value='Active'>Active</option>
                          <option value='Pending'>Pending</option>
                          <option value='Rejected'>Rejected</option>
                        </SelectBox>
                      </div>
                    </div>
                  ) : null}

                  <CommissionForm
                    edit={edit}
                    formik={formik}
                    dropdown_options={dropdown_options}
                  />
                  {formik.values.is_variable_product && (
                    <>
                      <VariableOptions
                        formik={formik}
                        item='variation_attrs'
                        inputFields={inputFields}
                      />
                      <VariationTable formik={formik} item='variations' />
                    </>
                  )}
                  <div className='row'>
                    <div className='col-md-12 text-center m-3'>
                      <button type='submit' className='btn btn-success'>
                        {formik.isSubmitting
                          ? 'Processing...'
                          : edit
                          ? 'Save & Continue'
                          : 'Save'}
                      </button>
                      <a
                        className='btn btn-secondary m-3'
                        onClick={history.goBack}
                        href='#goback'
                      >
                        <i className='fa fa-angle-left'></i> Go Back
                      </a>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      ) : (
        <div className='row'>
          <Formik
            initialValues={newInitialValues}
            validationSchema={Yup.object({
              name: Yup.string().required('Required'),
              product_category: Yup.string().required('Required'),
              regular_price: Yup.number()
                .positive('Numbers Only')
                .required('Required'),
              sale_price: Yup.number()
                .positive('Numbers Only')
                .required('Required'),
              tax: Yup.number().positive('Numbers Only'),
              weight: Yup.number().positive('Numbers Only'),
              length: Yup.number().positive('Numbers Only'),
              height: Yup.number().positive('Numbers Only'),
              width: Yup.number().positive('Numbers Only'),
              stock: Yup.number().positive('Numbers Only'),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              values.is_variable_product = values?.variations?.length == 0 ? false:true;
              await submitForm(values);
              setSubmitting(false);
              resetForm(true);
            }}
          >
            {(formik) => {
              return (
                <Form>
                  <FormComponents
                    formik={formik}
                    inputFields={inputFields}
                    setFeaturedImage={setFeaturedImage}
                    dropdown_options={dropdown_options}
                    setGallery={setGallery}
                    edit={edit}
                    loadOptions={loadOptions}
                  />

                  {user && user.role === 'SUPER ADMIN' ? (
                    <div className='row'>
                      <div className='col-md-6'>
                        <CheckBox label='Featured' name='featured'></CheckBox>
                      </div>
                      <div className='col-md-6'>
                        <TextInput
                          label='Published Date'
                          name='published_date'
                          type='date'
                        ></TextInput>
                      </div>
                      <div className='col-md-6'>
                        <SelectBox
                          label={'Product Status '}
                          name='product_status'
                        >
                          <option value=''></option>
                          <option value='Active'>Active</option>
                          <option value='Pending'>Pending</option>
                          <option value='Rejected'>Rejected</option>
                        </SelectBox>
                      </div>
                    </div>
                  ) : null}

                  <CommissionForm
                    formik={formik}
                    dropdown_options={dropdown_options}
                  />

                  <div className='col-md-12'>
                    <div
                      className='d-flex justify-content-between'
                      style={{
                        background: '#f1f1f1',
                        padding: '10px 10px',
                        marginTop: '20px',
                        border: '1px solid #f1f1f1',
                      }}
                    >
                      <div>
                        {' '}
                        Variations (Have multiple options like color,size){' '}
                      </div>
                      <div></div>
                    </div>
                  </div>

                  <div>
                    <CheckBox
                      label='Is Variable Product'
                      name='is_variable_product'
                    ></CheckBox>
                  </div>

                  {formik.values.is_variable_product && (
                    <>
                      <VariableOptions
                        formik={formik}
                        item='variation_attrs'
                        inputFields={inputFields}
                      />
                      <VariationTable formik={formik} item='variations' />
                    </>
                  )}
                  <div className='row'>
                    <div className='col-md-12 text-center m-3'>
                      <button type='submit' className='btn btn-success'>
                        {formik.isSubmitting
                          ? 'Processing...'
                          : edit
                          ? 'Edit'
                          : 'Save'}
                      </button>
                      <a
                        className='btn btn-secondary m-3'
                        onClick={history.goBack}
                        href='#goback'
                      >
                        <i className='fa fa-angle-left'></i> Go Back
                      </a>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default ProductForm;
