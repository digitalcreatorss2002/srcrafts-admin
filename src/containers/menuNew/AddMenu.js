// AddMenu.js
import React from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { useHistory } from "react-router-dom";
import MenuForm from "../../components/menuNew/MenuForm";
import {
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from "../../shared/enums/menus_enum";
import { useCreateMenu } from "../../shared/hooks/UseMenu";

const AddMenu = () => {
  const history = useHistory();
  const [, createMenu] = useCreateMenu();

  const submitFormClicked = async (values) => {
    await createMenu(values);
    history.push(`/${LINK_URL}`);
  };

  return (
    <div className="pace-done">
      <Header />
      <BreadCrumb
        title={`Add ${PAGE_SINGLE_TITLE}`}
        mainLinkTitle={PAGE_TITLE}
        mainLinkUrl={LINK_URL}
        activeLink="Add"
      />

      <div className="container-fluid ">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title ">{PAGE_SINGLE_TITLE}</h4>
            </div>

            <MenuForm
              submitForm={submitFormClicked}
              initialValues={{
                name: "",
                published_status: "DRAFT",
                layout: "DEFAULT",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
