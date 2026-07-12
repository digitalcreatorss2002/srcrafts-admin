// ViewMenu.js
import React from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import Spinner from "../../components/layout/Spinner";
import {
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
} from "../../shared/enums/menus_enum";
import { useSingleMenu } from "../../shared/hooks/UseMenu";

const ViewMenu = ({ match }) => {
  const [data] = useSingleMenu(match.params.id);
  const { menu, menu_loading } = data;

  return (
    <div className="pace-done">
      <Header />
      <BreadCrumb
        title={PAGE_SINGLE_TITLE}
        mainLinkTitle={PAGE_TITLE}
        mainLinkUrl={LINK_URL}
        activeLink="View"
      />

      {!menu_loading && menu ? (
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <h4>{menu.name}</h4>

              <pre style={{ background: "#f8f9fa", padding: 15 }}>
                {JSON.stringify(menu.items, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ViewMenu;
