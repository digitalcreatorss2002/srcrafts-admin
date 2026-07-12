export const PAGE_TITLE = 'Products';
export const PAGE_SINGLE_TITLE = 'Your Product';
export const LINK_URL = 'products';
export const inputFields = {
  name: {
    type: 'string',
    required: true,
    title: 'Name',
    inputType: 'text',
    slug: true,
  },
  collections: {
    type: 'related',
    required: false,
    title: 'Collections',
    inputType: 'text',
    multiple: true,
  },
  vendor: {
    type: 'related',
    required: true,
    title: 'Vendor',
    inputType: 'text',
  },
  // featured: {
  //   type: 'checkbox',
  //   required: false,
  //   title: 'Featured Product?',
  // },

  // product_status: {
  //   type: 'select',
  //   required: true,
  //   title: 'Product Status',
  //   default: 'Pending',
  //   options: ['Active', 'Pending', 'Rejected'],
  //   hideOnEntry: true,
  // },
  media: {
    type: 'gallery',
    required: false,
    title: 'Media',
    inputType: 'text',
  },
  description: {
    type: 'html',
    required: true,
    title: 'Description',
    inputType: 'text',
  },

  // tax: {
  //   type: 'string',
  //   required: false,
  //   title: 'Tax',
  //   inputType: 'number',
  // },
  inventory_divider: {
    type: 'divider',
    title: 'Inventory',
  },
  sku: {
    type: 'string',
    required: false,
    title: 'Product Unique Code (SKU)',
  },
  hsn_no: {
    type: 'string',
    required: false,
    title: 'HSN No',
  },
  in_stock: {
    type: 'checkbox',
    required: false,
    title: 'Stock in Hand',
  },
  cod_available: {
    type: 'checkbox',
    required: false,
    title: 'COD Available',
  },
  return_available: {
    type: 'checkbox',
    required: false,
    title: 'Return Available',
  },
  exchange_available: {
    type: 'checkbox',
    required: false,
    title: 'Exchange Available',
  },
  stock: {
    type: 'string',
    required: false,
    title: 'Stock',
    inputType: 'number',
  },  
  minQty: {
    type: 'string',
    required: true,
    title: 'Minimum Quantity',
    inputType: 'number',
  },
  specification_divider: {
    type: 'divider',
    title: 'Specifications',
  },
  specifications: {
    type: 'array',
    title: 'Specifications',
    fields: {
      label: {
        type: 'string',
        title: 'Label',
        inputType: 'text',
      },
      value: {
        type: 'string',
        title: 'Value',
        inputType: 'text',
      },
    },
  },

  shipping: {
    type: 'divider',
    title: 'Shipping Details',
  },

  weight: {
    type: 'string',
    required: false,
    title: 'Weight (KG)',
    inputType: 'number',
  },

  length: {
    type: 'string',
    required: false,
    title: 'Length (CM)',
    inputType: 'number',
  },
  width: {
    type: 'string',
    required: false,
    title: 'Width (CM)',
    inputType: 'number',
  },
  height: {
    type: 'string',
    required: false,
    title: 'Height (CM)',
    inputType: 'number',
  },
  seo_divider: {
    type: 'divider',
    title: 'SEO',
  },
  meta_title: {
    type: 'string',
    required: false,
    title: 'Meta Title',
    inputType: 'text',
  },
  meta_description: {
    type: 'text',
    required: false,
    title: 'Meta Description',
    inputType: 'text',
  },
  meta_keywords: {
    type: 'string',
    required: false,
    title: 'Meta Keywords',
  },
  slug: {
    type: 'slug',
    required: true,
    title: 'Slug',
    inputType: 'text',
  },
};
export const initialValues = {
  name: '',
  is_variable_product: false,
};

export const view_all_table = [{ name: 'Name', value: 'name' }];

export const SIDEBAR_OPTIONS = [
  {
    id: 'name',
    field: 'name',
    label: 'Name',
    type: 'string',
    search_type: 'search',
    inputType: 'text',
    condition: '',
  },
  {
    id: 'product_id',
    field: 'product_id',
    label: 'Product ID',
    type: 'string',
    search_type: 'exact',
    inputType: 'text',
    condition: '',
  },
  {
    id: 'product_status',
    field: 'product_status',
    label: 'Product Status',
    type: 'select',
    search_type: 'exact',
    inputType: 'text',
    condition: '',
    options: ['Active', 'Pending', 'Rejected'],
  },
  {
    id: 'product_category',
    field: 'product_category',
    label: 'Category',
    type: 'related',
    search_type: 'exact',
    inputType: 'text',
    condition: '',
  },
  {
    id: 'sub_category',
    field: 'sub_category',
    label: 'Sub Category',
    type: 'related',
    search_type: 'exact',
    inputType: 'text',
    condition: '',
  },
  {
    id: 'sub_sub_category',
    field: 'sub_sub_category',
    label: 'Sub Sub Category',
    type: 'related',
    search_type: 'exact',
    inputType: 'text',
    condition: '',
  },
];
export const inputFieldsForExport = {
  product_id: {
    type: 'string',
    required: true,
    title: 'Program ID',
    inputType: 'text',
  },
  name: {
    type: 'string',
    required: true,
    title: 'Title',
    inputType: 'text',
  },
  description: {
    type: 'string',
    required: true,
    title: 'Description',
    inputType: 'text',
  },
  is_stock: {
    type: 'checkbox',
    required: true,
    title: 'Availability',
    inputType: 'text',
  },
  regular_price: {
    type: 'text',
    required: true,
    title: 'MRP',
    inputType: 'text',
  },
  sale_price: {
    type: 'text',
    required: true,
    title: 'Sale Price',
    inputType: 'text',
  },
  slug: {
    type: 'text',
    required: true,
    title: 'Link',
    inputType: 'text',
  },

  media: {
    type: 'array_field',
    required: true,
    title: 'Sale Price',
    inputType: 'text',
  },
  vendor: {
    type: 'related',
    required: true,
    title: 'Vendor',
    inputType: 'text',
    field: 'vendor',
    sub_field: 'store_name',
  },
  product_category: {
    type: 'related',
    required: false,
    title: 'Category',
    inputType: 'text',
    // multiple: true,
    field: 'name',
  },
  sub_category: {
    type: 'related',
    required: false,
    title: 'Sub Category',
    inputType: 'text',
    // multiple: true,
    field: 'name',
  },
  sub_sub_category: {
    type: 'related',
    required: false,
    title: 'Sub Sub Category',
    inputType: 'text',
    // multiple: true,
    field: 'name',
  },
};
