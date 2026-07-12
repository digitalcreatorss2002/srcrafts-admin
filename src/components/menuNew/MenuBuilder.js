//MenuBuilder
import React from "react";
import MenuNode from "./MenuNode";
import NewAddMenu from "./NewAddMenu";
import {EditMenuNode} from "./MenuNode";


export default function MenuBuilder({ edit, items, setItems }) {
  return edit ? (
    <EditMenuBuilder edit={edit} items={items} setItems={setItems} />
  ) : (
    <CreateMenuBuilder edit={edit} items={items} setItems={setItems} />
  );
}



function CreateMenuBuilder({edit, items, setItems }) {
  const updateItem = (index, updated) => {
    const next = [...items];
    next[index] = updated;
    setItems(next);
  };

  const removeItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="mt-4">
      <h5>Menu Structure</h5>

      {items.map((item, index) => (
        <MenuNode
          edit={edit}
          key={item.id}
          item={item}
          onUpdate={(u) => updateItem(index, u)}
          onDelete={() => removeItem(item.id)}
        />
      ))}

      {/* Create mode ONLY */}
      <NewAddMenu onAdd={(item) => setItems([...items, item])} />
    </div>
  );
}



function EditMenuBuilder({ items, setItems }) {
  
  const updateTopLevelItem = (index, updatedItem) => {
    const nextItems = [...items];
    nextItems[index] = updatedItem;
    setItems(nextItems);
  };

  const removeTopLevelItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  const addTopLevelItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div className="menu-builder-container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Menu Structure (Drag & Drop Ready)</h5>
        <NewAddMenu onAdd={addTopLevelItem} label="Add Top Level Item" />
      </div>

      <div className="items-wrapper">
        {items.length === 0 ? (
          <div className="text-center p-5 border rounded bg-light text-muted">
            No items in this menu yet.
          </div>
        ) : (
          items.map((item, index) => (
            <EditMenuNode
              key={item.id || index}
              item={item}
              onUpdate={(updated) => updateTopLevelItem(index, updated)}
              onDelete={() => removeTopLevelItem(item.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}


