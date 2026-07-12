// AllMenus.js
import React from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
import Pagination from "../../components/common/Pagination";
import AddBtn from "../../components/common/AddBtn";
import DataTable from "../../components/common/DataTable";
import {
  view_all_table,
  PAGE_TITLE,
  PAGE_SINGLE_TITLE,
  LINK_URL,
  SIDEBAR_OPTIONS,
  inputFields,
} from "../../shared/enums/menus_enum";

import { useAllMenus } from "../../shared/hooks/UseMenu";

const AllMenus = () => {
  const [data, setPageNumber, deleteBtnClicked] = useAllMenus();
  const { menus, menus_loading, page, pages, total_menus } = data;

  return (
    <div className="pace-done">
      <Header />
      <BreadCrumb
        title={PAGE_TITLE}
        mainLinkTitle="Dashboard"
        mainLinkUrl="/dashboard"
        activeLink={PAGE_TITLE}
      />

      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <AddBtn item={LINK_URL} title={PAGE_SINGLE_TITLE} />

            <DataTable
              keys={view_all_table}
              data={menus}
              field={LINK_URL}
              page={page}
              deleteBtnClicked={deleteBtnClicked}
              loading={menus_loading}
              hideQVBtn={true}
              hideViewBtn={true}
            />

            <Pagination
              page={page}
              pages={pages}
              count={total_menus}
              setPage={setPageNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMenus;
