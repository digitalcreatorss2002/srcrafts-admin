# Documentation Index

Welcome to the Multivendor Admin Panel documentation. This directory contains comprehensive documentation about the application's routing system and data flow.

---

## Documentation Files

### 1. [ROUTES.md](./ROUTES.md)

**Complete Routes Reference**

A comprehensive listing of all routes in the application, organized by functional area. This document provides:

- Detailed route tables for each module
- Route protection levels (Public vs Private)
- Description of each route's purpose
- Standard CRUD patterns
- Authentication flow
- Error handling

**Use this when you need to:**

- Find a specific route path
- Understand route protection
- See all routes for a particular module
- Learn the standard route naming conventions

---

### 2. [ROUTE_FLOW_DIAGRAM.md](./ROUTE_FLOW_DIAGRAM.md)

**Visual Flow Diagrams**

Visual representations of user journeys and data flows through the application. Includes ASCII diagrams for:

- Authentication flow
- Product management workflow
- Order processing flow
- Category hierarchy management
- Vendor onboarding process
- Content publishing workflow
- Customer support handling
- Return request processing
- Navigation menu structure
- State management flow

**Use this when you need to:**

- Understand the user journey for a specific feature
- See how different routes connect together
- Visualize the flow of data through the system
- Understand multi-step processes
- Onboard new developers to the application flow

---

### 3. [API_ENDPOINTS.md](./API_ENDPOINTS.md)

**API Endpoint Documentation**

Complete documentation of backend API endpoints that correspond to frontend routes. Includes:

- Request/response formats
- Query parameters
- Request body schemas
- Example responses
- Authentication requirements
- Error handling
- Common patterns

**Use this when you need to:**

- Integrate with the backend API
- Understand data structures
- Debug API calls
- Implement new features
- See example request/response payloads

---

## Quick Reference

### Finding Routes by Feature

| Feature        | Routes Doc Section                                         | Flow Diagram                                                      | API Endpoints                                                        |
| -------------- | ---------------------------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| Authentication | [Authentication Routes](./ROUTES.md#authentication-routes) | [Auth Flow](./ROUTE_FLOW_DIAGRAM.md#authentication-flow)          | [Auth Endpoints](./API_ENDPOINTS.md#authentication-endpoints)        |
| Products       | [Product Management](./ROUTES.md#product-management)       | [Product Flow](./ROUTE_FLOW_DIAGRAM.md#product-management-flow)   | [Product Endpoints](./API_ENDPOINTS.md#product-endpoints)            |
| Orders         | [Order Management](./ROUTES.md#order-management)           | [Order Flow](./ROUTE_FLOW_DIAGRAM.md#order-processing-flow)       | [Order Endpoints](./API_ENDPOINTS.md#order-endpoints)                |
| Categories     | [Category Management](./ROUTES.md#category-management)     | [Category Flow](./ROUTE_FLOW_DIAGRAM.md#category-management-flow) | [Category Endpoints](./API_ENDPOINTS.md#category-endpoints)          |
| Vendors        | [Vendor Management](./ROUTES.md#vendor-management)         | [Vendor Flow](./ROUTE_FLOW_DIAGRAM.md#vendor-onboarding-flow)     | [Vendor Endpoints](./API_ENDPOINTS.md#vendor-endpoints)              |
| Content        | [Content Management](./ROUTES.md#content-management)       | [Content Flow](./ROUTE_FLOW_DIAGRAM.md#content-publishing-flow)   | [Content Endpoints](./API_ENDPOINTS.md#content-management-endpoints) |

---

## Architecture Overview

### Technology Stack

**Frontend:**

- React 17+
- React Router DOM v5
- Redux for state management
- Axios for API calls

**Authentication:**

- JWT token-based authentication
- Token stored in localStorage
- Automatic token refresh

**Route Protection:**

- `BeforeLoginRoutes` - Only accessible when not authenticated
- `PrivateRoutes` - Requires authentication

---

## Key Concepts

### Route Pattern Convention

All CRUD routes follow this standard pattern:

```
/{resource}              → List all items
/{resource}/add          → Create new item
/{resource}/:id/view     → View single item details
/{resource}/:id/edit     → Edit single item
```

### Route Types

1. **Public Routes** - Accessible without authentication (e.g., `/frames`)
2. **BeforeLogin Routes** - Only accessible when not logged in (e.g., `/` login page)
3. **Private Routes** - Require authentication (most admin routes)

### Category Hierarchy

The application supports 5 levels of category nesting:

```
Category (Level 0)
└── Sub-Category (Level 1)
    └── Sub-Sub-Category (Level 2)
        └── Sub-Sub-Sub-Category (Level 3)
            └── Sub-Sub-Sub-Sub-Category (Level 4)
```

---

## Common Workflows

### 1. Adding a New Product

```
/products → Click "Add Product" → /products/add
→ Fill form → Submit → /products (with success message)
```

### 2. Processing an Order

```
/orders → Select order → /orders/:id/view
→ Update status → /orders/:id/edit → Save
→ Track shipment → /orders/:id/track
```

### 3. Managing Vendors

```
/vendors → Add vendor → /vendors/add → Submit
→ Review application → /vendors/:id/view
→ Approve/Reject → Update status
```

### 4. Publishing Content

```
/banners → Add banner → /banners/add
→ Upload image → Set schedule → Publish
→ View on website
```

---

## State Management

The application uses Redux for centralized state management:

**Store Structure:**

- `auth` - Authentication state (user, token)
- `products` - Product data and filters
- `orders` - Order data and filters
- `categories` - Category tree
- `vendors` - Vendor data
- `ui` - UI state (modals, notifications)

**Key Actions:**

- `loadUser()` - Validate token and load user data
- `setAuthToken()` - Set Axios default headers
- CRUD actions for each resource type

---

## Development Guidelines

### Adding a New Route

1. **Define the route in App.js**

   ```jsx
   <PrivateRoutes exact path="/newresource" component={AllNewresources} />
   <PrivateRoutes exact path="/newresource/add" component={AddNewresource} />
   <PrivateRoutes exact path="/newresource/:id/view" component={ViewNewresource} />
   <PrivateRoutes exact path="/newresource/:id/edit" component={EditNewresource} />
   ```

2. **Create the component files**

   - `/containers/newresource/AllNewresources.js`
   - `/containers/newresource/AddNewresource.js`
   - `/containers/newresource/ViewNewresource.js`
   - `/containers/newresource/EditNewresource.js`

3. **Create the form component**

   - `/components/newresource/NewresourceForm.js`

4. **Add Redux actions and reducers**

   - `/store/actions/newresource.js`
   - `/store/reducers/newresource.js`
   - `/store/types/newresource.js`

5. **Update the navigation menu**

   - `/shared/menu.js`

6. **Document the route**
   - Update ROUTES.md
   - Add flow diagram if needed
   - Document API endpoints

### Best Practices

1. **Route Naming**

   - Use kebab-case for URLs
   - Use plural for list routes
   - Use descriptive names

2. **Component Organization**

   - Keep containers separate from components
   - Containers handle data fetching and state
   - Components are presentational

3. **Error Handling**

   - Always handle API errors
   - Show user-friendly error messages
   - Implement proper validation

4. **Authentication**
   - Always protect admin routes
   - Check permissions on backend
   - Handle token expiration

---

## Troubleshooting

### Common Issues

**Issue: Route not found (404)**

- Check if route is defined in App.js
- Verify path spelling and casing
- Ensure PrivateRoutes wrapper is used

**Issue: Unauthorized on protected route**

- Check if token is present in localStorage
- Verify token is valid and not expired
- Check if setAuthToken was called

**Issue: Component not rendering**

- Check console for errors
- Verify component import path
- Ensure component is exported correctly

---

## Contributing

When contributing to the routing system:

1. **Follow conventions** - Use existing patterns
2. **Update documentation** - Keep docs in sync with code
3. **Add tests** - Test route protection and navigation
4. **Review impact** - Consider effects on existing routes

---

## Version History

- **v1.0.0** (November 4, 2025) - Initial documentation
  - Complete route listing
  - Flow diagrams
  - API endpoint documentation

---

## Additional Resources

### External Documentation

- [React Router v5 Docs](https://v5.reactrouter.com/)
- [Redux Documentation](https://redux.js.org/)
- [Axios Documentation](https://axios-http.com/)

### Internal Resources

- `/src/App.js` - Main route definitions
- `/src/shared/Routes/` - Route wrapper components
- `/src/store/` - Redux store configuration

---

## Support

For questions or issues:

1. Check this documentation first
2. Review the code comments in App.js
3. Check the flow diagrams for your feature
4. Contact the development team

---

**Last Updated**: November 4, 2025
**Maintained by**: Development Team
