# Route Flow Diagrams

This document provides visual flow diagrams for major user journeys through the admin panel.

---

## Table of Contents

1. [Authentication Flow](#authentication-flow)
2. [Product Management Flow](#product-management-flow)
3. [Order Processing Flow](#order-processing-flow)
4. [Category Management Flow](#category-management-flow)
5. [Vendor Onboarding Flow](#vendor-onboarding-flow)
6. [Content Publishing Flow](#content-publishing-flow)

---

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     APPLICATION START                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────┐
                    │ App Component  │
                    │   useEffect    │
                    └────────┬───────┘
                             │
                             ▼
              ┌──────────────────────────┐
              │ Check localStorage       │
              │ for 'token'              │
              └──────┬─────────┬─────────┘
                     │         │
          ┌──────────┘         └──────────┐
          │                               │
          ▼                               ▼
   ┌─────────────┐              ┌─────────────────┐
   │ Token Exists│              │ No Token        │
   └──────┬──────┘              └────────┬────────┘
          │                              │
          ▼                              ▼
   ┌──────────────────┐         ┌───────────────────┐
   │ setAuthToken()   │         │ User visits /     │
   │ Set Axios header │         │ (Login Page)      │
   └──────┬───────────┘         └────────┬──────────┘
          │                              │
          ▼                              │
   ┌──────────────────┐                 │
   │ loadUser()       │                 │
   │ Validate token   │                 │
   └──────┬───────────┘                 │
          │                              │
          ├──────┬──────────────────────┘
          │      │
          ▼      ▼
   ┌─────────────────┐           ┌──────────────────┐
   │ Valid Token     │           │ Login Form       │
   │ Load user data  │           │ Submit           │
   └────────┬────────┘           └────────┬─────────┘
            │                             │
            │                             ▼
            │                    ┌─────────────────┐
            │                    │ POST /api/login │
            │                    └────────┬────────┘
            │                             │
            │                    ┌────────┴────────┐
            │                    │                 │
            │                    ▼                 ▼
            │           ┌─────────────┐   ┌────────────┐
            │           │ Success     │   │ Failed     │
            │           │ Get Token   │   │ Show Error │
            │           └──────┬──────┘   └────────────┘
            │                  │
            │                  ▼
            │         ┌────────────────────┐
            │         │ Save to localStorage│
            │         │ setAuthToken()     │
            │         │ loadUser()         │
            │         └──────┬─────────────┘
            │                │
            └────────────────┘
                     │
                     ▼
         ┌───────────────────────┐
         │ Redirect to           │
         │ /dashboard            │
         └───────────────────────┘
```

---

## Product Management Flow

### Adding a New Product

```
/products (List View)
      │
      ▼
┌─────────────┐
│ Click "Add  │
│  Product"   │
└──────┬──────┘
       │
       ▼
/products/add
       │
       ├──────────────────────────────────────┐
       │                                      │
       ▼                                      ▼
┌──────────────┐                    ┌─────────────────┐
│ Fill Basic   │                    │ Upload Images   │
│ Information: │                    │ - Main Image    │
│ - Name       │                    │ - Gallery       │
│ - SKU        │                    └─────────────────┘
│ - Price      │
│ - Vendor     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Select       │
│ Categories:  │
│ - Category   │
│ - SubCat     │
│ - SubSubCat  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Add          │
│ Variations:  │
│ - Color      │
│ - Size       │
│ - Stock      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Description  │
│ & SEO Info   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Submit Form  │
└──────┬───────┘
       │
       ├────────────┬─────────────┐
       │            │             │
       ▼            ▼             ▼
   Success      Validation     Server
   Create       Error          Error
       │
       ▼
/products (Redirect)
       │
       ▼
┌──────────────┐
│ Success      │
│ Message      │
└──────────────┘
```

### Bulk Product Upload

```
/products
      │
      ▼
┌─────────────────┐
│ Click "Bulk     │
│  Upload"        │
└────────┬────────┘
         │
         ▼
/products/bulk-upload
         │
         ├───────────────────────────┐
         │                           │
         ▼                           ▼
┌──────────────────┐        ┌────────────────┐
│ Download CSV     │        │ View Upload    │
│ Template         │        │ Instructions   │
└────────┬─────────┘        └────────────────┘
         │
         ▼
┌──────────────────┐
│ Fill CSV with    │
│ Product Data     │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Upload CSV File  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Server Validates │
│ & Processes      │
└────────┬─────────┘
         │
         ├──────────┬──────────┐
         │          │          │
         ▼          ▼          ▼
    Success    Partial     Complete
    All        Success     Failure
    Created    Some        None
               Failed      Created
         │
         ▼
┌──────────────────┐
│ Show Results     │
│ Download Report  │
└──────────────────┘
```

---

## Order Processing Flow

```
/orders (All Orders)
      │
      ├─────────────┬──────────────┬──────────────┐
      │             │              │              │
      ▼             ▼              ▼              ▼
  ┌────────┐  ┌─────────┐   ┌──────────┐  ┌──────────┐
  │ Pending│  │Processing│   │ Shipped  │  │Delivered │
  └───┬────┘  └────┬────┘   └────┬─────┘  └────┬─────┘
      │            │             │             │
      │            │             │             │
      └────────────┴─────────────┴─────────────┘
                   │
                   ▼
          ┌────────────────┐
          │ Select Order   │
          └────────┬───────┘
                   │
                   ▼
          /orders/:id/view
                   │
      ┌────────────┼────────────┬────────────┐
      │            │            │            │
      ▼            ▼            ▼            ▼
┌──────────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐
│View Order│ │Track     │ │Edit     │ │Print     │
│Details   │ │Shipment  │ │Order    │ │Invoice   │
└──────────┘ └────┬─────┘ └────┬────┘ └──────────┘
                  │            │
                  ▼            ▼
         /orders/:id/track  /orders/:id/edit
                  │            │
                  │            ▼
                  │     ┌─────────────┐
                  │     │Update Status│
                  │     │Add Notes    │
                  │     │Modify Items │
                  │     └──────┬──────┘
                  │            │
                  │            ▼
                  │     ┌─────────────┐
                  │     │Save Changes │
                  │     └──────┬──────┘
                  │            │
                  └────────────┴───────────┐
                               │           │
                               ▼           ▼
                        ┌──────────┐  ┌─────────┐
                        │Send Email│  │Update   │
                        │to Customer│  │Inventory│
                        └──────────┘  └─────────┘
```

---

## Category Management Flow

### Creating Category Hierarchy

```
Start
  │
  ▼
/categorys (Main Categories)
  │
  ├────────────────────────────────┐
  │                                │
  ▼                                ▼
Add Main Category           Edit Existing
  │                                │
  ▼                                │
/categorys/add                     │
  │                                │
  ├────────────────────────────────┘
  │
  ▼
┌────────────────────┐
│ Main Category      │
│ Created            │
│ (e.g., "Clothing") │
└──────┬─────────────┘
       │
       ▼
/sub-categories
       │
       ▼
┌────────────────────┐
│ Add Sub-Category   │
│ Link to Parent     │
│ (e.g., "Men's")    │
└──────┬─────────────┘
       │
       ▼
/sub-sub-categories
       │
       ▼
┌────────────────────┐
│ Add Sub-Sub-Cat    │
│ Link to Parent     │
│ (e.g., "Shirts")   │
└──────┬─────────────┘
       │
       ▼
/sub-sub-sub-categories
       │
       ▼
┌────────────────────┐
│ Add Level 3        │
│ (e.g., "Casual")   │
└──────┬─────────────┘
       │
       ▼
/sub-sub-sub-sub-categories
       │
       ▼
┌────────────────────┐
│ Add Level 4        │
│ (e.g., "Cotton")   │
└──────┬─────────────┘
       │
       ▼
┌────────────────────┐
│ Category Hierarchy │
│ Complete           │
│                    │
│ Clothing >         │
│   Men's >          │
│     Shirts >       │
│       Casual >     │
│         Cotton     │
└────────────────────┘
```

---

## Vendor Onboarding Flow

```
/vendors (All Vendors)
      │
      ▼
┌─────────────┐
│ Click "Add  │
│  Vendor"    │
└──────┬──────┘
       │
       ▼
/vendors/add
       │
       ▼
┌────────────────────┐
│ Step 1:            │
│ Basic Information  │
│ - Business Name    │
│ - Contact Person   │
│ - Email            │
│ - Phone            │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Step 2:            │
│ Business Details   │
│ - Registration No  │
│ - Tax ID           │
│ - Address          │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Step 3:            │
│ Bank Information   │
│ - Account Details  │
│ - IFSC Code        │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Step 4:            │
│ Upload Documents   │
│ - Business License │
│ - Tax Certificate  │
│ - ID Proof         │
└────────┬───────────┘
         │
         ▼
┌────────────────────┐
│ Submit for         │
│ Verification       │
└────────┬───────────┘
         │
         ▼
/vendors/:id/view
         │
         ├───────────────┬──────────────┐
         │               │              │
         ▼               ▼              ▼
┌────────────┐   ┌──────────────┐  ┌──────────┐
│ Approve    │   │ Request More │  │ Reject   │
│ Vendor     │   │ Information  │  │ Vendor   │
└─────┬──────┘   └──────┬───────┘  └────┬─────┘
      │                 │               │
      ▼                 │               │
┌────────────┐          │               │
│ Send       │          │               │
│ Credentials│          │               │
└─────┬──────┘          │               │
      │                 │               │
      └─────────────────┴───────────────┘
                        │
                        ▼
                  ┌───────────┐
                  │ Update    │
                  │ Status    │
                  └───────────┘
```

---

## Content Publishing Flow

### Banner Management

```
/banners
   │
   ▼
┌──────────────┐
│ Add Banner   │
└──────┬───────┘
       │
       ▼
/banners/add
       │
       ├────────────────────────┐
       │                        │
       ▼                        ▼
┌──────────────┐        ┌──────────────┐
│ Desktop      │        │ Mobile       │
│ Banner       │        │ Banner       │
└──────┬───────┘        └──────┬───────┘
       │                       │
       │                       ▼
       │              /mobilebanners/add
       │
       ▼
┌──────────────────┐
│ Upload Image     │
│ (1920x600 px)    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Set Link/CTA     │
│ - URL            │
│ - Open in new    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Display Settings │
│ - Start Date     │
│ - End Date       │
│ - Position       │
│ - Status         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Preview Banner   │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Submit & Publish │
└────────┬─────────┘
         │
         ├─────────┬────────┐
         │         │        │
         ▼         ▼        ▼
     Active    Scheduled  Draft
         │
         ▼
  Live on Website
```

### Blog Publishing

```
/blogs
   │
   ▼
/blogs/add
   │
   ├────────────────────────────┐
   │                            │
   ▼                            ▼
┌─────────────┐          ┌──────────────┐
│ Write       │          │ SEO          │
│ Content     │          │ Optimization │
│ - Title     │          │ - Meta Title │
│ - Body      │          │ - Meta Desc  │
│ - Featured  │          │ - Keywords   │
│   Image     │          │ - URL Slug   │
└──────┬──────┘          └──────┬───────┘
       │                        │
       └────────────┬───────────┘
                    │
                    ▼
             ┌──────────────┐
             │ Categorize   │
             │ - Category   │
             │ - Tags       │
             │ - Author     │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐
             │ Preview      │
             └──────┬───────┘
                    │
                    ├──────────┬────────────┐
                    │          │            │
                    ▼          ▼            ▼
             ┌──────────┐  ┌──────┐  ┌─────────┐
             │ Publish  │  │ Save │  │ Schedule│
             │ Now      │  │ Draft│  │ Publish │
             └────┬─────┘  └──────┘  └────┬────┘
                  │                       │
                  └───────────────────────┘
                            │
                            ▼
                   /blogs/:id/view
                            │
                            ▼
                      Live on Blog
```

---

## Homepage Configuration Flow

```
/homepages
      │
      ▼
/homepages/add
      │
      ▼
┌────────────────────────┐
│ Select Template        │
└──────────┬─────────────┘
           │
           ▼
┌────────────────────────┐
│ Configure Sections:    │
│                        │
│ ┌────────────────────┐ │
│ │ Hero Banner        │ │
│ └────────────────────┘ │
│           │            │
│           ▼            │
│ ┌────────────────────┐ │
│ │ Featured Products  │ │
│ └────────────────────┘ │
│           │            │
│           ▼            │
│ ┌────────────────────┐ │
│ │ Collections        │ │
│ └────────────────────┘ │
│           │            │
│           ▼            │
│ ┌────────────────────┐ │
│ │ Testimonials       │ │
│ └────────────────────┘ │
│           │            │
│           ▼            │
│ ┌────────────────────┐ │
│ │ Blog Posts         │ │
│ └────────────────────┘ │
└──────────┬─────────────┘
           │
           ▼
┌────────────────────────┐
│ Drag & Drop to         │
│ Reorder Sections       │
└──────────┬─────────────┘
           │
           ▼
┌────────────────────────┐
│ Configure Each Section │
│ - Select Content       │
│ - Set Display Options  │
│ - Style Settings       │
└──────────┬─────────────┘
           │
           ▼
┌────────────────────────┐
│ Preview Homepage       │
└──────────┬─────────────┘
           │
           ▼
┌────────────────────────┐
│ Set as Active Homepage │
└──────────┬─────────────┘
           │
           ▼
    Live on Website
```

---

## Customer Support Flow

### Handling Contact Inquiry

```
Customer submits form
on website
      │
      ▼
Saved to database
      │
      ▼
/contacts (Admin Panel)
      │
      ▼
Admin receives notification
      │
      ▼
/contacts/:id/view
      │
      ├────────────────────────────┐
      │                            │
      ▼                            ▼
┌─────────────┐            ┌──────────────┐
│ View        │            │ Reply via    │
│ Customer    │            │ Email        │
│ Details     │            └──────┬───────┘
└─────────────┘                   │
      │                           │
      ▼                           │
/contacts/:id/edit                │
      │                           │
      ▼                           │
┌─────────────┐                   │
│ Add Notes   │                   │
│ Update      │                   │
│ Status      │                   │
└──────┬──────┘                   │
       │                          │
       ▼                          │
┌─────────────┐                   │
│ Mark as:    │                   │
│ - Resolved  │                   │
│ - Pending   │                   │
│ - Escalated │                   │
└──────┬──────┘                   │
       │                          │
       └──────────────────────────┘
                 │
                 ▼
          ┌──────────────┐
          │ Track in CRM │
          │ or ticket    │
          │ system       │
          └──────────────┘
```

---

## Return Request Processing

```
Customer initiates return
on website
      │
      ▼
/return-requests
      │
      ▼
/return-requests/:id/view
      │
      ├────────────────────────────┐
      │                            │
      ▼                            ▼
┌──────────────┐          ┌──────────────┐
│ View Request │          │ Check Order  │
│ Details      │          │ History      │
└──────┬───────┘          └──────────────┘
       │
       ▼
┌──────────────┐
│ Review:      │
│ - Product    │
│ - Reason     │
│ - Images     │
│ - Timeline   │
└──────┬───────┘
       │
       ▼
/return-requests/:id/edit
       │
       ├─────────────┬──────────────┬─────────────┐
       │             │              │             │
       ▼             ▼              ▼             ▼
┌──────────┐  ┌───────────┐  ┌──────────┐  ┌──────────┐
│ Approve  │  │ Request   │  │ Reject   │  │ Partial  │
│ Full     │  │ More Info │  │ Request  │  │ Approve  │
│ Return   │  └───────────┘  └──────────┘  └──────────┘
└────┬─────┘
     │
     ▼
┌──────────────┐
│ Generate     │
│ Return Label │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Send to      │
│ Customer     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Await        │
│ Shipment     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Receive &    │
│ Inspect      │
└──────┬───────┘
       │
       ├───────────┬────────────┐
       │           │            │
       ▼           ▼            ▼
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Process  │ │ Issue    │ │ Restock  │
│ Refund   │ │ Credit   │ │ Product  │
└──────────┘ └──────────┘ └──────────┘
       │
       ▼
┌──────────────┐
│ Update       │
│ Customer     │
└──────────────┘
```

---

## Navigation Menu Structure

```
Admin Dashboard
│
├── Dashboard
│
├── Products
│   ├── All Products
│   ├── Add Product
│   └── Bulk Upload
│
├── Categories
│   ├── Main Categories
│   ├── Sub Categories (L1)
│   ├── Sub-Sub Categories (L2)
│   ├── Sub-Sub-Sub Categories (L3)
│   └── Sub-Sub-Sub-Sub Categories (L4)
│
├── Orders
│   ├── All Orders
│   ├── Add Order
│   └── Order Tracking
│
├── Customers
│   ├── All Customers
│   └── Add Customer
│
├── Vendors
│   ├── All Vendors
│   ├── Add Vendor
│   └── Vendor Profile
│
├── Marketing
│   ├── Coupons
│   ├── Collections
│   └── Newsletters
│
├── Content
│   ├── Banners
│   ├── Mobile Banners
│   ├── Blogs
│   ├── Pages
│   └── Testimonials
│
├── Reviews & Returns
│   ├── Reviews
│   └── Return Requests
│
├── Attributes
│   ├── Colors
│   ├── Sizes
│   ├── Variations
│   └── Frames
│
├── Site Config
│   ├── Menus
│   ├── Homepage
│   ├── Templates
│   └── Settings
│
├── Support
│   ├── Contacts
│   └── Franchises
│
└── Profile
    ├── My Profile
    └── Logout
```

---

## State Management Flow

```
┌─────────────────────────────────────────┐
│           Redux Store                   │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────┐  ┌──────────┐           │
│  │   Auth   │  │ Products │           │
│  │  State   │  │  State   │           │
│  └────┬─────┘  └────┬─────┘           │
│       │             │                  │
│  ┌────┴─────┐  ┌────┴─────┐           │
│  │ Orders   │  │Categories│           │
│  │  State   │  │  State   │           │
│  └────┬─────┘  └────┬─────┘           │
│       │             │                  │
│  ┌────┴─────┐  ┌────┴─────┐           │
│  │ Vendors  │  │   UI     │           │
│  │  State   │  │  State   │           │
│  └──────────┘  └──────────┘           │
│                                         │
└────────────┬────────────────────────────┘
             │
             ▼
    ┌─────────────────┐
    │   Components    │
    │   Subscribe to  │
    │   Store         │
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │   Dispatch      │
    │   Actions       │
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │   Reducers      │
    │   Update State  │
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │   Components    │
    │   Re-render     │
    └─────────────────┘
```

---

**Last Updated**: November 4, 2025
**Version**: 1.0.0
