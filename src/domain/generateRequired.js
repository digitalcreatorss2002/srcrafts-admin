import * as Yup from "yup";

const generateRequired = ({ inputFields: inputFields }) => {
  if (inputFields) {
    if (Object.keys(inputFields)) {
      const newRequiredCheck = {};
      Object.keys(inputFields).map((item, index) => {
        if (inputFields[item].required) {
          console.log(item);
          newRequiredCheck[item] = Yup.string().required("Required");
        }
      });
      return newRequiredCheck;
    }
  }
};

export default generateRequired;
