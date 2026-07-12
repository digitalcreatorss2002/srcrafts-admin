import React, { useState, useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { useHistory } from "react-router-dom";
import ProductForm from "../../components/products/ProductForm";
import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from "../../shared/enums/products_enum";
import {
  useCreateProduct,
  useGetDropdownOptions,
} from "../../shared/hooks/UseProduct";
// import { useSelectAllProduct } from "../../shared/hooks/UseProduct";

const AddProduct = ({ }) => {
  let history = useHistory();
  const [product, addData] = useCreateProduct();
  const { add_product_loading } = product;
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState(null);

  const submitFormClicked = async (values) => {
    console.log(values);
    await addData(values);
    history.push(`/${LINK_URL}`);
  };

  const [dropdownOptions, loadOptions] = useGetDropdownOptions();

  return (
    <div className="pace-done">
      <div>
        <Header />
        <BreadCrumb
          title={`Add ${PAGE_SINGLE_TITLE}`}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink="Add"
        />
      </div>
      <div className="container-fluid">
        <div className="col-lg-9">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title"> {PAGE_SINGLE_TITLE} </h4>
              <p className="card-title-desc">
                Enter Details to add {PAGE_SINGLE_TITLE}
              </p>
            </div>
            <ProductForm
              edit={false}
              featuredImage={featuredImage}
              gallery={gallery}
              setFeaturedImage={setFeaturedImage}
              setGallery={setGallery}
              submitForm={submitFormClicked}
              inputFields={inputFields}
              initialValues={initialValues}
              dropdown_options={dropdownOptions}
              loading={add_product_loading}
              loadOptions={loadOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
