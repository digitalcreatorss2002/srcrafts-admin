export const PAGE_TITLE = "Reviews";
export const PAGE_SINGLE_TITLE = "Review";
export const LINK_URL = "reviews";
export const inputFields = {
  name: {
    type: "string",
    required: true,
    title: "Name",
    inputType: "text",
  },
  email: {
    type: "string",
    required: true,
    title: "Email",
    inputType: "text",
  },
  product: {
    type: "related",
    required: false,
    title: "Product",
    inputType: "text",
    field: "name",
  },
  ratings: {
    type: "string",
    required: true,
    title: "Rating",
    inputType: "number",
  },
  message: {
    type: "string",
    required: true,
    title: "Message",
    inputType: "text",
  },
  approved: {
    type: "checkbox",
    required: true,
    title: "Approved",
    inputType: "text",
  },
};
export const initialValues = {
  name: "",
};

export const view_all_table = [
  { name: "Name", value: "name" },
  { name: "Ratings", value: "ratings" },
  { name: "Approved", value: "approved", boolean: true },
  { name: "Product", value: "product", related: true, field: "name" },
];

export const SIDEBAR_OPTIONS = [
  {
    id: "name",
    field: "name",
    label: "Name",
    type: "string",
    search_type: "search",
    inputType: "text",
    condition: "",
  },
];
