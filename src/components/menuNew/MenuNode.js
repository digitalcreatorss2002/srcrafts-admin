//MenuNode.js
import React, { useState } from "react";
import NewAddMenu from "./NewAddMenu";

export default function MenuNode(props) {
  return props.edit ? (
    <EditMenuNode {...props} />
  ) : (
    <CreateMenuNode {...props} />
  );
}


function CreateMenuNode({ item, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);

  const updateChild = (index, updated) => {
    const children = [...item.children];
    children[index] = updated;
    onUpdate({ ...item, children });
  };

  const removeChild = (id) => {
    onUpdate({
      ...item,
      children: item.children.filter((c) => c.id !== id),
    });
  };

  return (
    <div style={{ border: "1px dashed #999", padding: 10, marginBottom: 10 }}>
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        <strong>{item.label}</strong> <small>({item.type})</small>
        <span style={{ float: "right" }}>▾</span>
      </div>

      {open && (
        <>
          <div className="row mt-2">
            <div className="col-md-6">
              <label>Label</label>
              <input
                className="form-control"
                value={item.label}
                disabled={item.type !== "STATIC"}
                onChange={(e) =>
                  onUpdate({ ...item, label: e.target.value })
                }
              />
            </div>

            {item.type === "STATIC" && (
              <div className="col-md-6">
                <label>URL</label>
                <input
                  className="form-control"
                  value={item.url || ""}
                  onChange={(e) =>
                    onUpdate({ ...item, url: e.target.value })
                  }
                />
              </div>
            )}
          </div>

          <button
            className="btn btn-sm btn-danger mt-2"
            onClick={onDelete}
          >
            Delete
          </button>

          <div style={{ marginLeft: 20, marginTop: 10 }}>
            {item.children.map((child, index) => (
              <MenuNode
                key={child.id}
                item={child}
                onUpdate={(u) => updateChild(index, u)}
                onDelete={() => removeChild(child.id)}
              />
            ))}

            <NewAddMenu
              parentType={item.type}
              parentRef={item.ref}
              onAdd={(child) =>
                onUpdate({
                  ...item,
                  children: [...item.children, child],
                })
              }
              label="Add Sub Menu"
            />
          </div>
        </>
      )}
    </div>
  );
}


export function EditMenuNode({ item, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);

  // Helper: Jab koi child update ho, toh current item ki children list update karo
  const handleChildUpdate = (index, updatedChild) => {
    const updatedChildren = [...(item.children || [])];
    updatedChildren[index] = updatedChild;
    onUpdate({ ...item, children: updatedChildren });
  };

  // Helper: Child ko list se bahar nikalna
  const handleChildDelete = (id) => {
    onUpdate({
      ...item,
      children: item.children.filter((c) => c.id !== id),
    });
  };

  return (
    <div className="card mb-2 shadow-sm border-light">
      <div 
        className="card-header d-flex justify-content-between align-items-center bg-white" 
        style={{ cursor: "pointer", padding: "10px 15px" }}
        onClick={() => setOpen(!open)}
      >
        <div className="d-flex align-items-center">
          <span className={`me-2 transition ${open ? 'rotate-90' : ''}`}>
            {item.children?.length > 0 ? (open ? "▼" : "▶") : "•"}
          </span>
          <span className="fw-bold text-dark">{item.label || "Untitled Item"}</span>
          <span className="badge bg-info text-white ms-2" style={{ fontSize: '10px' }}>
            {item.type}
          </span>
        </div>
        
        <button 
          className="btn btn-outline-danger btn-sm border-0" 
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
        >
          <i className="fa fa-trash"></i> Delete
        </button>
      </div>

      {open && (
        <div className="card-body bg-light">
          {/* Item Details Row */}
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <label className="form-label small fw-bold">Label</label>
              <input
                className="form-control form-control-sm"
                value={item.label || ""}
                onChange={(e) => onUpdate({ ...item, label: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">URL / Path</label>
              <input
                className="form-control form-control-sm"
                value={item.url || ""}
                disabled={item.type !== "STATIC"}
                onChange={(e) => onUpdate({ ...item, url: e.target.value })}
                placeholder={item.type !== "STATIC" ? "Locked by Ref" : "/custom-url"}
              />
            </div>
          </div>

          {/* RECURSION: Rendering nested levels */}
          <div className="ms-4 ps-3 border-start border-primary border-2">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <small className="text-muted fw-bold">SUB-MENU ITEMS</small>
            </div>

            {item.children?.map((child, index) => (
              <EditMenuNode
                key={child.id || index}
                item={child}
                onUpdate={(updated) => handleChildUpdate(index, updated)}
                onDelete={() => handleChildDelete(child.id)}
              />
            ))}

            {/* Sub-menu Add Button */}
            <div className="mt-2">
              <NewAddMenu
                parentType={item.type}
                parentRef={item.ref}
                onAdd={(newChild) =>
                  onUpdate({
                    ...item,
                    children: [...(item.children || []), newChild],
                  })
                }
                label={`Add Sub-item to ${item.label}`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

