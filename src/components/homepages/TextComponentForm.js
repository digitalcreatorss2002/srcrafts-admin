import { FieldArray } from "formik";
import React, { useState } from "react";
// import Select from "react-select";
import { FileUpload, HTMLEditor, TextArea, TextInput } from "../Form/Form";
import Select from "react-select";

function TextComponentForm({ formik, item, value, edit, dropdown_options }) {
  console.log("VALUES", value, item);
  const [menuType, setMenuType] = useState(null);
  return (
    <div className="row">
      <div className="p-2 mt-2 mb-2 bg-light">
        <p className="font-weight-bold">Text Component</p>
      </div>
      <FieldArray name={item}>
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps;
          const { values } = form;
          const arrayValues = value ? value : [];
          return (
            <div
              style={{
                border: "1px solid #f1f1f1",
                margin: "10px 10px",
                padding: "10px",
              }}
            >
              {arrayValues.map((single, fieldIndex) => (
                <div key={fieldIndex} className="row">
                  <div
                    className="d-flex justify-content-between"
                    style={{
                      background: "#f1f1f1",
                      padding: "10px 10px",
                      marginTop: "0px",
                    }}
                  >
                    <div></div>
                    <div>
                      {fieldIndex > 0 ? (
                        <a
                          className="btn btn-sm btn-danger"
                          onClick={() => remove(fieldIndex)}
                        >
                          -
                        </a>
                      ) : (
                        <a
                          className="btn btn-sm btn-danger"
                          onClick={() => remove(fieldIndex)}
                        >
                          -
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      label="Title"
                      name={`${item}[${fieldIndex}].title`}
                      type="text"
                    />
                  </div>
                  <div className="col-md-6">
                    <FileUpload
                      title={"Image"}
                      item={`${item}[${fieldIndex}].image`}
                      formik={formik}
                      value={value[fieldIndex].image}
                    />
                  </div>

                  <div className="col-md-12">
                    <HTMLEditor
                      title={"Content"}
                      item={`${item}[${fieldIndex}].content`}
                      formik={formik}
                      value={
                        formik.values[item] && formik.values[item][fieldIndex]
                          ? formik.values[item][fieldIndex]["content"]
                          : ""
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <TextInput
                      label="Link"
                      name={`${item}[${fieldIndex}].link`}
                      type="text"
                    />
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #f1f1f1" }}>
                <a
                  className="btn btn-sm btn-success"
                  onClick={() =>
                    push({
                      image: "",
                      link: "",
                    })
                  }
                >
                  + Add Another Option
                </a>
              </div>
            </div>
          );
        }}
      </FieldArray>
    </div>
  );
}

export default TextComponentForm;
