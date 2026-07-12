import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import FormComponents from "../common/FormComponents";
import generateFields from "../../domain/generateFields";
import generateRequired from "../../domain/generateRequired";
import CollectionComponentForm from "./CollectionComponentForm";
import CollectionProductComponent from "./CollectionProductComponent";
import ImageComponent from "./ImageComponent";
import GalleryComponent from "./GalleryComponent";
import TextComponentForm from "./TextComponentForm";
import CategoryComponentForm from "./CategoryComponentForm";
import CategoryProductComponent from "./CategoryProductForm";
function HomepageForm({
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
  let history = useHistory();
  console.log(dropdown_options);
  const [requiredCheck, setRequiredCheck] = useState({});
  const [customData, setCustomData] = useState(null);
  useEffect(() => {
    const newData = generateRequired({ inputFields });
    setRequiredCheck(newData);
  }, []);
  useEffect(() => {
    if (data) {
      const newData = generateFields({ inputFields: inputFields, data: data });
      newData.collection_product_component = {
        product_collection:
          data.collection_product_component &&
          data.collection_product_component.product_collection &&
          data.collection_product_component.product_collection._id,
      };

      newData.collections_component = {
        product_collections:
          data.collections_component &&
          data.collections_component.product_collections,
      };
      newData.image_component = data.image_component;
      newData.gallery_component = data.gallery_component;
      newData.slider_component = data.slider_component;
      newData.text_component = data.text_component;
      newData.category_component = data.category_component;
      newData.category_product_component = data.category_product_component;
      setCustomData(newData);
    }
  }, [data]);
  return (
    <div className="card-body">
      {edit ? (
        customData && (
          <div className="row">
            <Formik
              initialValues={customData ? customData : initialValues}
              validationSchema={Yup.object(requiredCheck)}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);
                await submitForm(values);
                setSubmitting(false);
                resetForm(true);
              }}
            >
              {(formik) => {
                console.log(formik.values);
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
                    {formik.values.display_type == "COLLECTION" && (
                      <CollectionComponentForm
                        formik={formik}
                        dropdown_options={dropdown_options}
                        item="collections_component.product_collections"
                        edit={true}
                        value={formik.values.collections_component}
                      />
                    )}
                    {formik.values.display_type == "COLLECTION PRODUCTS" && (
                      <CollectionProductComponent
                        formik={formik}
                        dropdown_options={dropdown_options}
                        item="collection_product_component.product_collection"
                        value={formik.values.collection_product_component}
                        edit={true}
                      />
                    )}
                    {formik.values.display_type == "CATEGORY" && (
                      <CategoryComponentForm
                        formik={formik}
                        dropdown_options={dropdown_options}
                        item="category_component.product_category"
                        edit={true}
                        value={formik.values.category_component}
                      />
                    )}
                    {formik.values.display_type == "CATAGORY PRODUCTS" && (
                      <CategoryProductComponent
                        formik={formik}
                        dropdown_options={dropdown_options}
                        item="category_product_component.product_category"
                        value={formik.values.category_product_component}
                        edit={true}
                      />
                    )}
                    {formik.values.display_type == "IMAGE" && (
                      <ImageComponent
                        formik={formik}
                        item="image_component"
                        value={formik.values.image_component}
                      />
                    )}
                    {formik.values.display_type == "GALLERY" && (
                      <GalleryComponent
                        formik={formik}
                        item="gallery_component"
                        dropdown_options={dropdown_options}
                        value={formik.values.gallery_component}
                      />
                    )}
                    {formik.values.display_type == "SLIDER" && (
                      <GalleryComponent
                        formik={formik}
                        item="slider_component"
                        dropdown_options={dropdown_options}
                        value={formik.values.slider_component}
                      />
                    )}
                    {formik.values.display_type == "TEXT" && (
                      <TextComponentForm
                        formik={formik}
                        item="text_component"
                        dropdown_options={dropdown_options}
                        value={formik.values.text_component}
                      />
                    )}

                    <div className="row">
                      <div className="col-md-12 text-center m-3">
                        <button type="submit" className="btn btn-success">
                          {formik.isSubmitting
                            ? "Processing..."
                            : edit
                            ? "Edit"
                            : "Save"}
                        </button>
                        <a
                          className="btn btn-secondary m-3"
                          onClick={history.goBack}
                          href="#goback"
                        >
                          <i className="fa fa-angle-left"></i> Go Back
                        </a>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        )
      ) : (
        <div className="row">
          <Formik
            initialValues={customData ? customData : initialValues}
            validationSchema={Yup.object(requiredCheck)}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              await submitForm(values);
              setSubmitting(false);
              resetForm(true);
            }}
          >
            {(formik) => {
              // console.log(formik);
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

                  {formik.values.display_type == "COLLECTION" && (
                    <CollectionComponentForm
                      formik={formik}
                      dropdown_options={dropdown_options}
                      item="collections_component.product_collections"
                    />
                  )}
                  {formik.values.display_type == "COLLECTION PRODUCTS" && (
                    <CollectionProductComponent
                      formik={formik}
                      dropdown_options={dropdown_options}
                      item="collection_product_component.product_collection"
                    />
                  )}
                  {formik.values.display_type == "CATEGORY" && (
                      <CategoryComponentForm
                        formik={formik}
                        dropdown_options={dropdown_options}
                        item="category_component.product_category"
                      />
                    )}
                    {formik.values.display_type == "CATAGORY PRODUCTS" && (
                      <CategoryProductComponent
                        formik={formik}
                        dropdown_options={dropdown_options}
                        item="category_product_component.product_category"
                      />
                    )}
                  {formik.values.display_type == "IMAGE" && (
                    <ImageComponent
                      formik={formik}
                      item="image_component"
                      value={formik.values.image_component}
                    />
                  )}
                  {formik.values.display_type == "GALLERY" && (
                    <GalleryComponent
                      formik={formik}
                      item="gallery_component"
                      dropdown_options={dropdown_options}
                      value={formik.values.gallery_component}
                    />
                  )}
                  {formik.values.display_type == "SLIDER" && (
                    <GalleryComponent
                      formik={formik}
                      item="slider_component"
                      dropdown_options={dropdown_options}
                      value={formik.values.slider_component}
                    />
                  )}
                  {formik.values.display_type == "TEXT" && (
                    <TextComponentForm
                      formik={formik}
                      item="text_component"
                      dropdown_options={dropdown_options}
                      value={formik.values.text_component}
                    />
                  )}

                  <div className="row">
                    <div className="col-md-12 text-center m-3">
                      <button type="submit" className="btn btn-success">
                        {formik.isSubmitting
                          ? "Processing..."
                          : edit
                          ? "Edit"
                          : "Save"}
                      </button>
                      <a
                        className="btn btn-secondary m-3"
                        onClick={history.goBack}
                        href="#goback"
                      >
                        <i className="fa fa-angle-left"></i> Go Back
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

export default HomepageForm;
