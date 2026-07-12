// ViewMenu.js
import React, { useEffect } from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import Spinner from "../../components/layout/Spinner";
import {
  inputFields,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
} from "../../shared/enums/menus_enum";
import SingleView from "../../components/common/SingleView";
import { useSingleMenu } from "../../shared/hooks/UseMenu";
const ViewMenu = ({ match }) => {
  const [data] = useSingleMenu(match.params.id);
  const { menu_loading, menu } = data;
  return (
    <div className="pace-done">
      <div>
        <Header />
        <BreadCrumb
          title={PAGE_SINGLE_TITLE}
          mainLinkTitle={PAGE_TITLE}
          mainLinkUrl={LINK_URL}
          activeLink="View"
        />
        {!menu_loading ? (
          menu && (
            <SingleView
              data={menu}
              inputFields={inputFields}
              label={PAGE_SINGLE_TITLE}
              link={LINK_URL}
              id={menu._id}
              SIDEBAR_OPTIONS={SIDEBAR_OPTIONS}
            />
          )
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMenu;
