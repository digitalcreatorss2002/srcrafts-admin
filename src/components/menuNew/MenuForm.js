//MenuForm.js

import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MenuBuilder from "./MenuBuilder";

export default function MenuForm({ edit, data, submitForm }) {
  return edit ? (
    <EditMenuForm data={data} submitForm={submitForm} />
  ) : (
    <CreateMenuForm submitForm={submitForm} />
  );
}

function CreateMenuForm({ submitForm }) {
  const [menuItems, setMenuItems] = useState([]);

  return (
    <div className="card-body">
      <Formik
        initialValues={{
          name: "",
          published_status: "DRAFT",
          layout: "DEFAULT",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Menu name is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await submitForm({
            ...values,
            items: menuItems,
          });
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <Form className="p-3">
            <MenuCommonFields formik={formik} />

            <MenuBuilder items={menuItems} setItems={setMenuItems} />

            <button type="submit" className="btn btn-success mt-3">
              Save Menu
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}


function EditMenuForm({ data, submitForm }) {
  const [menuItems, setMenuItems] = useState([]);
  console.log(data);
  useEffect(() => {
    if (data?.items) {
      // IMPORTANT: deep clone to avoid mongoose refs
      setMenuItems(JSON.parse(JSON.stringify(data.items)));
    }
  }, [data]);

  return (
    <div className="card-body">
      <Formik
        enableReinitialize
        initialValues={{
          name: data?.name || "",
          published_status: data?.published_status || "DRAFT",
          layout: data?.layout || "DEFAULT",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Menu name is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await submitForm({
            ...values,
            items: menuItems,
          });
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <Form className="p-3">
            <MenuCommonFields formik={formik} disableName />

            <MenuBuilder edit={true} items={menuItems} setItems={setMenuItems} />

            <button type="submit" className="btn btn-primary mt-3">
              Update Menu
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}


function MenuCommonFields({ formik, disableName = false }) {
  return (
    <>
      <div className="form-group">
        <label>Menu Name</label>
        <input
          name="name"
          className="form-control"
          value={formik.values.name}
          onChange={formik.handleChange}
          disabled={disableName}
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          name="published_status"
          className="form-control"
          value={formik.values.published_status}
          onChange={formik.handleChange}
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
      </div>

      <div className="form-group">
        <label>Menu Layout</label>
        <select
          name="layout"
          className="form-control"
          value={formik.values.layout}
          onChange={formik.handleChange}
        >
          <option value="DEFAULT">Default</option>
          <option value="MEGA">Mega Menu</option>
        </select>
      </div>
    </>
  );
}
