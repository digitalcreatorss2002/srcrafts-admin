import React from "react";
// import Select from "react-select";
import { FileUpload, TextInput } from "../Form/Form";
function ImageComponent({ formik, item, value, edit }) {
  console.log("VALUES", value, item);
  return (
    <div className="row">
      <div className="p-2 mt-2 mb-2 bg-light">
        <p className="font-weight-bold">Image Component</p>
      </div>
      <div className="col-md-6">
        <FileUpload
          title={"Image"}
          item={`${item}.image`}
          formik={formik}
          value={value && value.image ? value.image : ""}
        />
      </div>
      <div className="col-md-6">
        <TextInput label="Link" name={`${item}.link`} type="text" />
      </div>
    </div>
  );
}

export default ImageComponent;
