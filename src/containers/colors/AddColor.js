import React, { useState, useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { useHistory } from "react-router-dom";
import ColorForm from "../../components/colors/ColorForm";

import {
  initialValues,
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from "../../shared/enums/colors_enum";
import { useCreateColor,useGetDropdownOptions } from "../../shared/hooks/UseColor";
// import { useSelectAllColor } from "../../shared/hooks/UseColor";

const AddColor = ({}) => {
  let history = useHistory();
  const [color, addData] = useCreateColor();
  const { add_color_loading } = color;
  const [featuredImage, setFeaturedImage] = useState(null);
  const [gallery, setGallery] = useState(null);
 
 

  const submitFormClicked = async (values) => {
    await addData(values);
    history.push(`/${LINK_URL}`);
  };

  const [dropdownOptions,loadOptions] = useGetDropdownOptions();

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
            <ColorForm
              edit={false}
              featuredImage={featuredImage}
              gallery={gallery}
              setFeaturedImage={setFeaturedImage}
              setGallery={setGallery}
              submitForm={submitFormClicked}
              inputFields={inputFields}
              initialValues={initialValues}
              dropdown_options={dropdownOptions}
              loading={add_color_loading}
              loadOptions={loadOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddColor;
