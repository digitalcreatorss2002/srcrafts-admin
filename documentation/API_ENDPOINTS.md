# API Route Endpoints Documentation

This document maps frontend routes to their corresponding API endpoints and describes the data flow.

---

## Table of Contents

1. [Authentication Endpoints](#authentication-endpoints)
2. [Product Endpoints](#product-endpoints)
3. [Category Endpoints](#category-endpoints)
4. [Order Endpoints](#order-endpoints)
5. [Customer Endpoints](#customer-endpoints)
6. [Vendor Endpoints](#vendor-endpoints)
7. [Content Management Endpoints](#content-management-endpoints)
8. [Marketing Endpoints](#marketing-endpoints)
9. [Common Patterns](#common-patterns)

---

## Authentication Endpoints

### Login

- **Frontend Route**: `/`
- **API Endpoint**: `POST /api/auth/login` or `POST /api/admin/login`
- **Request Body**:
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "jwt-token-here",
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
  ```

### Load User (Verify Token)

- **Frontend Route**: All protected routes
- **API Endpoint**: `GET /api/auth/user` or `GET /api/admin/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
  ```json
  {
    "success": true,
    "user": {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
  ```

### Logout

- **Frontend Route**: Profile menu
- **API Endpoint**: `POST /api/auth/logout` (optional)
- **Action**: Remove token from localStorage and Redux store

---

## Product Endpoints

### List All Products

- **Frontend Route**: `/products`
- **API Endpoint**: `GET /api/products`
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 10)
  - `search`: Search query
  - `category`: Filter by category
  - `vendor`: Filter by vendor
  - `status`: Filter by status (active/inactive)
  - `sort`: Sort field (name, price, createdAt)
  - `order`: Sort order (asc/desc)
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "Product Name",
        "sku": "SKU-001",
        "price": 99.99,
        "vendor": { "id": 1, "name": "Vendor Name" },
        "category": { "id": 1, "name": "Category Name" },
        "stock": 50,
        "status": "active"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10
    }
  }
  ```

### Get Single Product

- **Frontend Route**: `/products/:id/view`
- **API Endpoint**: `GET /api/products/:id`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Product Name",
      "description": "Full description",
      "sku": "SKU-001",
      "price": 99.99,
      "comparePrice": 129.99,
      "cost": 50.00,
      "vendor": { "id": 1, "name": "Vendor Name" },
      "categories": [...],
      "images": [
        { "url": "image1.jpg", "isPrimary": true },
        { "url": "image2.jpg", "isPrimary": false }
      ],
      "variations": [
        {
          "id": 1,
          "color": "Red",
          "size": "L",
          "sku": "SKU-001-RED-L",
          "stock": 10,
          "price": 99.99
        }
      ],
      "seo": {
        "metaTitle": "Product Meta Title",
        "metaDescription": "Product Meta Description",
        "keywords": ["keyword1", "keyword2"]
      }
    }
  }
  ```

### Create Product

- **Frontend Route**: `/products/add`
- **API Endpoint**: `POST /api/products`
- **Request Body**:
  ```json
  {
    "name": "Product Name",
    "description": "Product description",
    "sku": "SKU-001",
    "price": 99.99,
    "comparePrice": 129.99,
    "cost": 50.00,
    "vendorId": 1,
    "categoryId": 1,
    "subCategoryId": 2,
    "images": ["image1.jpg", "image2.jpg"],
    "variations": [...],
    "seo": {...}
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Product created successfully",
    "data": { "id": 1, ... }
  }
  ```

### Update Product

- **Frontend Route**: `/products/:id/edit`
- **API Endpoint**: `PUT /api/products/:id` or `PATCH /api/products/:id`
- **Request Body**: Same as create
- **Response**:
  ```json
  {
    "success": true,
    "message": "Product updated successfully",
    "data": { "id": 1, ... }
  }
  ```

### Delete Product

- **Frontend Route**: `/products` (via delete button)
- **API Endpoint**: `DELETE /api/products/:id`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Product deleted successfully"
  }
  ```

### Bulk Upload Products

- **Frontend Route**: `/products/bulk-upload`
- **API Endpoint**: `POST /api/products/bulk-upload`
- **Request**: Multipart form data with CSV file
- **Response**:
  ```json
  {
    "success": true,
    "message": "Bulk upload completed",
    "results": {
      "total": 100,
      "success": 95,
      "failed": 5,
      "errors": [
        { "row": 23, "error": "Invalid SKU" },
        { "row": 45, "error": "Missing required field" }
      ]
    }
  }
  ```

---

## Category Endpoints

### Main Categories

- **Frontend Routes**: `/categorys/*`
- **API Base**: `/api/categories`

### Sub Categories (All Levels)

- **Level 1**: `/api/sub-categories` (Frontend: `/sub-categories/*`)
- **Level 2**: `/api/sub-sub-categories` (Frontend: `/sub-sub-categories/*`)
- **Level 3**: `/api/sub-sub-sub-categories` (Frontend: `/sub-sub-sub-categories/*`)
- **Level 4**: `/api/sub-sub-sub-sub-categories` (Frontend: `/sub-sub-sub-sub-categories/*`)

### Standard Category Operations

#### List Categories

- **Method**: `GET`
- **Query Parameters**: `page`, `limit`, `search`, `parentId`
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "Category Name",
        "slug": "category-name",
        "description": "Description",
        "image": "category.jpg",
        "parent": { "id": null, "name": null },
        "productsCount": 150,
        "status": "active"
      }
    ]
  }
  ```

#### Get Single Category

- **Method**: `GET /:id`
- **Response**: Single category with children and products

#### Create Category

- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Category Name",
    "slug": "category-name",
    "description": "Description",
    "image": "category.jpg",
    "parentId": null,
    "seo": {...}
  }
  ```

#### Update Category

- **Method**: `PUT /:id` or `PATCH /:id`

#### Delete Category

- **Method**: `DELETE /:id`

### Get Category Tree

- **API Endpoint**: `GET /api/categories/tree`
- **Response**: Hierarchical category structure
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "Clothing",
        "children": [
          {
            "id": 2,
            "name": "Men's",
            "children": [...]
          }
        ]
      }
    ]
  }
  ```

---

## Order Endpoints

### List Orders

- **Frontend Route**: `/orders`
- **API Endpoint**: `GET /api/orders`
- **Query Parameters**:
  - `page`, `limit`
  - `status`: pending, processing, shipped, delivered, cancelled
  - `customerId`: Filter by customer
  - `vendorId`: Filter by vendor
  - `dateFrom`, `dateTo`: Date range
  - `search`: Order ID or customer name
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "orderNumber": "ORD-2024-001",
        "customer": {
          "id": 1,
          "name": "John Doe",
          "email": "john@example.com"
        },
        "items": 3,
        "total": 299.99,
        "status": "processing",
        "paymentStatus": "paid",
        "createdAt": "2024-11-01T10:30:00Z"
      }
    ],
    "pagination": {...}
  }
  ```

### Get Order Details

- **Frontend Route**: `/orders/:id/view`
- **API Endpoint**: `GET /api/orders/:id`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "orderNumber": "ORD-2024-001",
      "customer": {...},
      "items": [
        {
          "id": 1,
          "product": {...},
          "variation": {...},
          "quantity": 2,
          "price": 99.99,
          "total": 199.98
        }
      ],
      "subtotal": 199.98,
      "shipping": 10.00,
      "tax": 21.00,
      "discount": 0,
      "total": 230.98,
      "shippingAddress": {...},
      "billingAddress": {...},
      "paymentMethod": "credit_card",
      "paymentStatus": "paid",
      "status": "processing",
      "statusHistory": [
        {
          "status": "pending",
          "timestamp": "2024-11-01T10:30:00Z",
          "note": "Order placed"
        }
      ]
    }
  }
  ```

### Update Order Status

- **Frontend Route**: `/orders/:id/edit`
- **API Endpoint**: `PATCH /api/orders/:id/status`
- **Request Body**:
  ```json
  {
    "status": "shipped",
    "note": "Order shipped via FedEx",
    "trackingNumber": "1234567890"
  }
  ```

### Track Order

- **Frontend Route**: `/orders/:id/track`
- **API Endpoint**: `GET /api/orders/:id/tracking`
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "orderId": 1,
      "trackingNumber": "1234567890",
      "carrier": "FedEx",
      "currentStatus": "in_transit",
      "estimatedDelivery": "2024-11-05",
      "history": [
        {
          "status": "picked_up",
          "location": "Warehouse A",
          "timestamp": "2024-11-01T14:00:00Z"
        },
        {
          "status": "in_transit",
          "location": "Distribution Center B",
          "timestamp": "2024-11-02T08:30:00Z"
        }
      ]
    }
  }
  ```

---

## Customer Endpoints

### List Customers

- **Frontend Route**: `/customers`
- **API Endpoint**: `GET /api/customers`
- **Query Parameters**: `page`, `limit`, `search`, `status`
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "totalOrders": 15,
        "totalSpent": 2499.85,
        "status": "active",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ]
  }
  ```

### Get Customer Details

- **Frontend Route**: `/customers/:id/view`
- **API Endpoint**: `GET /api/customers/:id`
- **Response**: Customer details + order history + addresses

### Update Customer

- **Frontend Route**: `/customers/:id/edit`
- **API Endpoint**: `PUT /api/customers/:id`

---

## Vendor Endpoints

### List Vendors

- **Frontend Route**: `/vendors`
- **API Endpoint**: `GET /api/vendors`
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "businessName": "ABC Store",
        "contactPerson": "Jane Smith",
        "email": "vendor@abc.com",
        "phone": "+1234567890",
        "productsCount": 250,
        "totalSales": 15000.0,
        "status": "active",
        "verificationStatus": "verified"
      }
    ]
  }
  ```

### Get Vendor Profile

- **Frontend Route**: `/vendors/:id/view` or `/vendor-profile`
- **API Endpoint**: `GET /api/vendors/:id` or `GET /api/vendors/me`
- **Response**: Complete vendor profile with business details, bank info, products

### Update Vendor

- **Frontend Route**: `/vendors/:id/edit`
- **API Endpoint**: `PUT /api/vendors/:id`

---

## Content Management Endpoints

### Banners

#### Desktop Banners

- **Frontend Base**: `/banners/*`
- **API Base**: `/api/banners`

#### Mobile Banners

- **Frontend Base**: `/mobilebanners/*`
- **API Base**: `/api/mobile-banners`

**Standard Operations**:

- `GET /` - List all
- `GET /:id` - Get single
- `POST /` - Create
- `PUT /:id` - Update
- `DELETE /:id` - Delete

**Response Example**:

```json
{
  "id": 1,
  "title": "Summer Sale",
  "image": "banner.jpg",
  "link": "/collections/summer",
  "position": 1,
  "startDate": "2024-06-01",
  "endDate": "2024-08-31",
  "status": "active"
}
```

### Blogs

- **Frontend Base**: `/blogs/*`
- **API Base**: `/api/blogs`
- **Response includes**: Content, category, author, tags, SEO data

### Pages (Site Pages)

- **Frontend Base**: `/pages/*`
- **API Base**: `/api/pages` or `/api/site-pages`
- **Response includes**: Page content, template, SEO data

### Testimonials

- **Frontend Base**: `/testimonials/*`
- **API Base**: `/api/testimonials`
- **Response**:
  ```json
  {
    "id": 1,
    "customerName": "John Doe",
    "rating": 5,
    "comment": "Great service!",
    "image": "customer.jpg",
    "isApproved": true
  }
  ```

---

## Marketing Endpoints

### Coupons

- **Frontend Base**: `/coupons/*`
- **API Base**: `/api/coupons`
- **Response**:
  ```json
  {
    "id": 1,
    "code": "SUMMER20",
    "type": "percentage",
    "value": 20,
    "minOrderValue": 100,
    "maxDiscount": 50,
    "startDate": "2024-06-01",
    "endDate": "2024-08-31",
    "usageLimit": 1000,
    "usageCount": 450,
    "status": "active"
  }
  ```

### Collections

- **Frontend Base**: `/collections/*`
- **API Base**: `/api/collections`
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Summer Collection",
    "slug": "summer-collection",
    "description": "Hot summer picks",
    "type": "manual",
    "products": [...],
    "productsCount": 25
  }
  ```

### Newsletters

- **Frontend Base**: `/newsletters/*`
- **API Base**: `/api/newsletters`
- **Response**:
  ```json
  {
    "id": 1,
    "email": "subscriber@example.com",
    "status": "subscribed",
    "subscribedAt": "2024-01-15T10:00:00Z"
  }
  ```

---

## Site Configuration Endpoints

### Menus

- **Frontend Base**: `/menus/*`
- **API Base**: `/api/menus`
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Main Menu",
    "location": "header",
    "items": [
      {
        "id": 1,
        "label": "Shop",
        "url": "/shop",
        "type": "link",
        "children": [
          {
            "id": 2,
            "label": "Men's",
            "url": "/shop/mens"
          }
        ]
      }
    ]
  }
  ```

### Homepage

- **Frontend Base**: `/homepages/*`
- **API Base**: `/api/homepages`
- **Response**: Homepage configuration with sections

### Settings

- **Frontend Route**: `/settings`
- **API Endpoint**: `GET /api/settings` and `PUT /api/settings`
- **Response**:
  ```json
  {
    "siteName": "My Store",
    "siteUrl": "https://mystore.com",
    "contactEmail": "info@mystore.com",
    "currency": "USD",
    "timezone": "America/New_York",
    "seo": {...},
    "smtp": {...},
    "payment": {...}
  }
  ```

---

## Product Attributes Endpoints

### Colors

- **Frontend Base**: `/colors/*`
- **API Base**: `/api/colors`
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Red",
    "code": "#FF0000",
    "status": "active"
  }
  ```

### Sizes

- **Frontend Base**: `/sizes/*`
- **API Base**: `/api/sizes`
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Large",
    "code": "L",
    "sortOrder": 3
  }
  ```

### Variations

- **Frontend Base**: `/variations/*`
- **API Base**: `/api/variations`
- **Response**:
  ```json
  {
    "id": 1,
    "name": "Size-Color",
    "options": [
      { "name": "Size", "values": ["S", "M", "L"] },
      { "name": "Color", "values": ["Red", "Blue"] }
    ]
  }
  ```

---

## Return & Review Endpoints

### Return Requests

- **Frontend Base**: `/return-requests/*`
- **API Base**: `/api/return-requests`
- **Response**:
  ```json
  {
    "id": 1,
    "orderId": 1,
    "orderNumber": "ORD-2024-001",
    "customer": {...},
    "items": [...],
    "reason": "Damaged product",
    "description": "Product arrived with scratches",
    "images": ["image1.jpg"],
    "status": "pending",
    "requestedAt": "2024-11-01T10:00:00Z"
  }
  ```

### Reviews

- **Frontend Base**: `/reviews/*`
- **API Base**: `/api/reviews`
- **Response**:
  ```json
  {
    "id": 1,
    "productId": 1,
    "customer": {...},
    "rating": 5,
    "title": "Excellent product",
    "comment": "Very satisfied with the purchase",
    "images": ["review1.jpg"],
    "isVerifiedPurchase": true,
    "isApproved": true,
    "createdAt": "2024-11-01T10:00:00Z"
  }
  ```

---

## Contact & Support Endpoints

### Contacts

- **Frontend Base**: `/contacts/*`
- **API Base**: `/api/contacts`
- **Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "Product inquiry",
    "message": "I have a question about...",
    "status": "pending",
    "createdAt": "2024-11-01T10:00:00Z"
  }
  ```

### Franchises

- **Frontend Base**: `/franchises/*`
- **API Base**: `/api/franchises`
- **Response**:
  ```json
  {
    "id": 1,
    "name": "ABC Franchise",
    "location": "New York",
    "contactPerson": "Jane Smith",
    "email": "franchise@abc.com",
    "status": "active"
  }
  ```

---

## Common Patterns

### Pagination

All list endpoints support pagination:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalItems": 100,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "message": "Error message",
    "code": "ERROR_CODE",
    "details": {...}
  }
}
```

### File Upload

Endpoints that accept file uploads use multipart/form-data:

```
POST /api/products
Content-Type: multipart/form-data

{
  name: "Product Name",
  images: [File, File],
  ...
}
```

### Search & Filter

Most list endpoints support:

- `search`: Text search
- `filter[field]`: Filter by field
- `sort`: Sort field
- `order`: asc/desc
- `page`: Page number
- `limit`: Items per page

### Status Updates

Many resources have status updates:

```
PATCH /api/{resource}/:id/status
{
  "status": "active|inactive|pending|approved"
}
```

---

## Authentication Headers

All protected endpoints require:

```
Authorization: Bearer <jwt-token>
```

Optionally:

```
X-Requested-With: XMLHttpRequest
Content-Type: application/json
```

---

## Rate Limiting

API endpoints may have rate limiting:

- **Limit**: 100 requests per minute per IP
- **Response Headers**:
  - `X-RateLimit-Limit: 100`
  - `X-RateLimit-Remaining: 95`
  - `X-RateLimit-Reset: 1234567890`

---

**Last Updated**: November 4, 2025
**Version**: 1.0.0
