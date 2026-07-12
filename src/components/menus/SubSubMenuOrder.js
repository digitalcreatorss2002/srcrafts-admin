//SubSubMenueOrder.js
import { Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as Yup from "yup";
import NewAddMenu from "./NewAddMenu";

function SubSubMenuOrder({
  menu,
  setArray,
  main_index,
  main_array,
  sub_index,
  sub_array,
}) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const grid = 2;

  const getItemStyle = (isDragging, draggableStyle) => ({
    //   userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    width: "100%",
    background: isDragging ? "lightblue" : "#fff",
    borderRadius: 5,
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "#fff",
    padding: grid,
    width: "100%",
  });

  const [items, setItems] = useState(menu);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    console.log({ reorderedItems });

    const itemInFormik = reorderedItems.map((item) => item.dataURL);
    // formik.setFieldValue(item, itemInFormik);
    setItems(reorderedItems);
    resetMenu({
      items: reorderedItems,
      main_array,
      main_index,
      sub_index,
      sub_array,
    });
  };

  const removeItem = (id) => {
    const newArray = items.filter((val) => val.id !== id);
    // const itemInFormik = newArray.map((item) => item.dataURL);
    // formik.setFieldValue(item, itemInFormik);
    setItems(newArray);
    resetMenu({
      items: newArray,
      main_array,
      main_index,
      sub_index,
      sub_array,
    });
  };

  const addMainItem = ({ id, title, link, className }) => {
    resetMenu({
      items: [
        ...items,
        {
          id: id,
          data: {
            title: title,
            link: link,
            class: className,
            menu: [],
          },
        },
      ],
      main_array,
      main_index,
      sub_index,
      sub_array,
    });
    setItems([
      ...items,
      {
        id: id,
        data: {
          title: title,
          link: link,
          class: className,
          menu: [],
        },
      },
    ]);
    setMenuTitle("");
    setMenuLink("");
    setMenuClass("");
    setMenuType(null);
    setShowAddMenu(false);
  };

  const resetMenu = ({
    items,
    main_array,
    main_index,
    sub_index,
    sub_array,
  }) => {
    // console.log("Main Array", main_array, main_index);
    if (
      items &&
      main_array &&
      main_array[main_index] &&
      main_array[main_index].data &&
      main_array[main_index].data.menu &&
      main_array[main_index].data.menu[sub_index] &&
      main_array[main_index].data.menu[sub_index].data
    ) {
      main_array[main_index].data.menu[sub_index].data.menu = items;
      console.log("ITEMS INSIDE SUB MENU", main_array);
      setArray(main_array);
    }
  };

  const [menuTitle, setMenuTitle] = useState("");
  const [menuLink, setMenuLink] = useState("");
  const [menuClass, setMenuClass] = useState("");
  const [menuType, setMenuType] = useState(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <div>
      {" "}
      <div style={{}}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        style={{
                          marginBottom: "10px",
                          border: "1px dashed #333",
                        }}
                      >
                        <div>
                          <div
                            className="card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <div style={{ padding: "10px 10px" }}>
                              <div
                                onClick={() => {
                                  activeMenu == index
                                    ? setActiveMenu(null)
                                    : setActiveMenu(index);
                                }}
                              >
                                {item.data.title}
                                <span style={{ float: "right" }}>
                                  {" "}
                                  <i
                                    className={
                                      activeMenu == index
                                        ? "fa fa-angle-down"
                                        : "fa fa-angle-right"
                                    }
                                  ></i>{" "}
                                </span>
                              </div>

                              {activeMenu == index && (
                                <div
                                  style={{
                                    borderTop: "1px solid #f1f1f1",
                                    marginTop: "10px",
                                    padding: "10px 10px",
                                  }}
                                >
                                  <div className="row">
                                    <div className="col-md-6">
                                      <label> Menu Title </label>
                                      <input
                                        type="text"
                                        value={item.data.title}
                                        className="form-control"
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <label> Menu Link </label>
                                      <input
                                        type="text"
                                        value={item.data.title}
                                        className="form-control"
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <label> Class </label>
                                      <input
                                        type="text"
                                        value={item.data.title}
                                        className="form-control"
                                      />
                                    </div>
                                    <div
                                      style={{
                                        textAlign: "right",
                                        borderTop: "1px solid #f1f1f1",
                                        marginTop: "10px",
                                        padding: "10px 10px",
                                      }}
                                    >
                                      <a
                                        className="btn-sm btn-danger"
                                        onClick={() => removeItem(item.id)}
                                      >
                                        <i className="fa fa-trash"> </i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <NewAddMenu
                  showAddMenu={showAddMenu}
                  setShowAddMenu={setShowAddMenu}
                  setMenuTitle={setMenuTitle}
                  menuTitle={menuTitle}
                  menuLink={menuLink}
                  setMenuLink={setMenuLink}
                  menuClass={menuClass}
                  setMenuClass={setMenuClass}
                  addMainItem={addMainItem}
                  items={items}
                  menuType={menuType}
                  setMenuType={setMenuType}
                  menuName="Sub Sub Menu"
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default SubSubMenuOrder;
