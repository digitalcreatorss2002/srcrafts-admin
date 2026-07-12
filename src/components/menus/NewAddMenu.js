//NewAddMenu.js
import React from "react";
import { useEffect, useState } from "react";
import { useSelectAllCollection } from "../../shared/hooks/UseCollection";
import { useSelectAllPage } from "../../shared/hooks/UsePage";

import Select from "react-select";
import { useAllCategorys } from "../../shared/hooks/UseCategory";
function NewAddMenu({
  showAddMenu,
  setShowAddMenu,
  setMenuTitle,
  menuTitle,
  menuLink,
  setMenuLink,
  menuClass,
  setMenuClass,
  addMainItem,
  items,
  menuType,
  setMenuType,
  menuName,
}) {
  // const data = useAllCategorys();
  const [collection_data] = useSelectAllCollection();
  const { all_collections, all_collections_loading } = collection_data;
  const [page_data] = useSelectAllPage();
  const { all_pages, all_pages_loading } = page_data;
  const [dropdownOptions, setDropdownOptions] = useState(null);
  const [pagesDropdownOptions, setPagesDropdownOptions] = useState(null);

  // useEffect(() => {
  //   if (all_collections) {
  //     const mapData = all_collections.map((item) => {
  //       return {
  //         value: item,
  //         label: item.name,
  //       };
  //     });
  //     setDropdownOptions(mapData);
  //   }
  // }, [all_collections]);
  useEffect(() => {
    if (all_collections) {
      const mapData = all_collections.map((item) => {
        return {
          value: item,
          label: item.name,
        };
      });
      setDropdownOptions(mapData);
    }
  }, [all_collections]);
  useEffect(() => {
    if (all_pages) {
      const mapData = all_pages.map((item) => {
        return {
          value: item,
          label: item.title,
        };
      });
      setPagesDropdownOptions(mapData);
    }
  }, [all_pages]);

  return (
    <div
      style={{
        border: "1px dashed #666",
        marginTop: "10px",
        background:
          menuName == "Sub Sub Menu"
            ? "#EEEEEE"
            : menuName == "Sub Menu"
            ? "#D2DAFF"
            : "#F7E9D7",

        // "#D2DAFF",
        // "#F7E9D7",
      }}
    >
      {showAddMenu ? (
        <div className="card">
          <div className="card-body">
            <div
              style={{
                borderBottom: "1px solid #f1f1f1",
                padding: "10px 0px",
                marginBottom: "10px",
              }}
            >
              Add Main Menu{" "}
              <span style={{ float: "right" }}>
                <a
                  className="btn btn-sm btn-danger"
                  onClick={() => {
                    setMenuType(null);
                    setShowAddMenu(false);
                  }}
                >
                  {" "}
                  <i className="fa fa-trash"></i>{" "}
                </a>
              </span>{" "}
            </div>
            {!menuType && (
              <div className="row">
                <div className="col-md-4">
                  <label htmlFor=""> Menu Type </label>
                  <select
                    className="form-control"
                    onChange={(e) => setMenuType(e.target.value)}
                  >
                    <option value={null}></option>
                    <option value="STATIC"> Static </option>
                    <option value="COLLECTIONS"> Collections </option>
                    <option value="PAGES"> Pages </option>
                  </select>
                </div>
              </div>
            )}
            <>
              {menuType && menuType == "STATIC" && (
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor=" "> Title </label>
                    <input
                      type="text"
                      value={menuTitle}
                      className="form-control"
                      onChange={(e) => setMenuTitle(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor=" "> Link </label>
                    <input
                      type="text"
                      value={menuLink}
                      className="form-control"
                      onChange={(e) => setMenuLink(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor=" "> Class </label>
                    <input
                      type="text"
                      value={menuClass}
                      className="form-control"
                      onChange={(e) => setMenuClass(e.target.value)}
                    />
                  </div>
                </div>
              )}
              {menuType && menuType == "COLLECTIONS" && (
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor=" "> Title </label>
                    <Select
                      styles={{
                        // Fixes the overlapping problem of the component
                        menu: (provided) => ({ ...provided, zIndex: 9999 }),
                      }}
                      options={dropdownOptions}
                      // onChange={formik.handleChange}
                      onChange={(e) => {
                        if (e) {
                          setMenuLink(`collections/${e.value.slug}`);
                          setMenuTitle(e.value.name);
                        }
                      }}
                    />
                  </div>
                </div>
              )}
              {menuType && menuType == "PAGES" && (
                <div className="row">
                  <div className="col-md-4">
                    <label htmlFor=" "> Title </label>
                    <Select
                      styles={{
                        // Fixes the overlapping problem of the component
                        menu: (provided) => ({ ...provided, zIndex: 9999 }),
                      }}
                      options={pagesDropdownOptions}
                      // onChange={formik.handleChange}
                      onChange={(e) => {
                        if (e) {
                          setMenuLink(`pages/${e.value.slug}`);
                          setMenuTitle(e.value.title);
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <button
                  className="btn btn-success m-1"
                  onClick={() => {
                    addMainItem({
                      id: `main-item-${items.length}`,
                      title: menuTitle,
                      link: menuLink,
                      className: menuClass,
                    });
                  }}
                >
                  {" "}
                  Add{" "}
                </button>
              </div>
            </>
          </div>
        </div>
      ) : (
        <div
          style={{ padding: "20px 20px", textAlign: "center" }}
          onClick={() => {
            setShowAddMenu(true);
          }}
        >
          <div> Click to Add {menuName ? menuName : "Menu"} </div>
        </div>
      )}
    </div>
  );
}

export default NewAddMenu;
