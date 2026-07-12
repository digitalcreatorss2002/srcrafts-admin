// EditMenu.js
import React from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import { useHistory, Link } from "react-router-dom";
import Spinner from "../../components/layout/Spinner";
import MenuForm from "../../components/menuNew/MenuForm";
import {
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from "../../shared/enums/menus_enum";
import { useUpdateMenu, useSingleMenu } from "../../shared/hooks/UseMenu";

const EditMenu = ({ match }) => {
  const history = useHistory();
  const [singleData] = useSingleMenu(match.params.id);
  const [updateMenu] = useUpdateMenu();

  const { menu, menu_loading } = singleData;

  const submitFormClicked = async (values) => {
    await updateMenu(menu._id, values);
    history.push(`/${LINK_URL}`);
  };

  return (
    <div className="pace-done">
      <Header />
      <BreadCrumb
        title={`Edit ${PAGE_SINGLE_TITLE}`}
        mainLinkTitle={PAGE_TITLE}
        mainLinkUrl={LINK_URL}
        activeLink="Edit"
      />

      <div className="container-fluid">
        <div className="col-lg-9">
          <div className="card">
            {!menu_loading && menu ? (
              <>
                <div className="card-header">
                  <h4 className="card-title">{menu.name}</h4>
                  <Link to={`/${LINK_URL}`} className="btn btn-soft-light">
                    ← Back
                  </Link>
                </div>

                <MenuForm
                  edit={true}
                  data={menu}
                  submitForm={submitFormClicked}
                />
              </>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
