//menuRecorder.js
import { Form, Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as Yup from "yup";
import NewAddMenu from "./NewAddMenu";
import SubMenuReorder from "./SubMenuReorder";

function MenuReorder({ menuItem, setMenuItem }) {
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

  const [items, setItems] = useState(menuItem);
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
  };

  const removeItem = (id) => {
    const newArray = items.filter((val) => val.id !== id);
    // const itemInFormik = newArray.map((item) => item.dataURL);
    // formik.setFieldValue(item, itemInFormik);
    setItems(newArray);
  };
  const addMainItem = ({ id, title, link, className }) => {
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

  const [menuTitle, setMenuTitle] = useState("");
  const [menuLink, setMenuLink] = useState("");
  const [menuClass, setMenuClass] = useState("");
  const [menuType, setMenuType] = useState(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // console.log("Reorder Items", items);

  useEffect(() => {
    setMenuItem(items);
  }, [items]);

  const setArray = (data) => {
    console.log("CHANGE IN ITEMS", data);

    setItems(data);
  };

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
                                    <div className="col-md-4">
                                      <label> Menu Title </label>
                                      <input
                                        type="text"
                                        value={item.data.title}
                                        className="form-control"
                                      />
                                    </div>
                                    <div className="col-md-4">
                                      <label> Menu Link </label>
                                      <input
                                        type="text"
                                        value={item.data.link}
                                        className="form-control"
                                      />
                                    </div>
                                    <div className="col-md-4">
                                      <label> Class </label>
                                      <input
                                        type="text"
                                        value={item.data.class}
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

                          {item.data && item.data.menu && (
                            <div style={{ paddingLeft: "20px" }}>
                              <SubMenuReorder
                                menu={item.data.menu}
                                setArray={setArray}
                                main_index={index}
                                main_array={items}
                              />
                            </div>
                          )}
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
                />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default MenuReorder;
