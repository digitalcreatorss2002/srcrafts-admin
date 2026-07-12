export const MENU = [
  {
    label: 'Dashboard',
    link: '/dashboard',
    roles: ['SUPER ADMIN', 'VENDOR', 'FRANCHISE'],
  },
  {
    label: 'Products',
    link: '#',
    roles: ['SUPER ADMIN', 'VENDOR'],
    menu: [
      {
        label: 'Collections',
        link: '/collections',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Product Category',
        link: '/productcategorys',
        roles: ['SUPER ADMIN'],
      },
      // {
      //   label: 'Product Sub Category',
      //   link: '/sub-categories',
      //   roles: ['SUPER ADMIN'],
      // },
      // {
      //   label: 'Product Sub Sub Category',
      //   link: '/sub-sub-categories',
      //   roles: ['SUPER ADMIN'],
      // },

      {
        label: 'Products',
        link: '/products',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },

      {
        label: 'Banners',
        link: '/banners',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Mobile Banners',
        link: '/mobilebanners',
        roles: ['SUPER ADMIN'],
      },
    ],
  },

  {
    label: 'My Orders',
    link: '#',
    roles: ['SUPER ADMIN', 'VENDOR'],
    menu: [
      {
        label: 'Orders',
        link: '/orders',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },
      {
        label: 'Customers',
        link: '/customers',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Coupons',
        link: '/coupons',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Return Requests',
        link: '/return-requests',
        roles: ['SUPER ADMIN', 'VENDOR'],
      },
    ],
  },
  {
    label: 'Profile',
    link: '/vendor-profile',
    roles: ['VENDOR'],
  },
  {
    label: 'Blogs',
    link: '#',
    roles: ['SUPER ADMIN'],
    menu: [
      {
        label: 'Categories',
        link: '/categorys',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Blogs',
        link: '/blogs',
        roles: ['SUPER ADMIN'],
      },
    ],
  },
  {
    label: 'Contacts',
    link: '#',
    roles: ['SUPER ADMIN'],
    menu: [
      {
        label: 'Contacts',
        link: '/contacts',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Newsletters',
        link: '/newsletters',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Testimonials',
        link: '/testimonials',
        roles: ['SUPER ADMIN'],
      },
      {
        label: 'Reviews',
        link: '/reviews',
        roles: ['SUPER ADMIN'],
      },
    ],
  },
  // {
  //   label: 'Pages',
  //   link: '/pages',
  //   roles: ['SUPER ADMIN'],
  // },
  {
    label: 'Vendors',
    link: '/vendors',
    roles: ['SUPER ADMIN'],
  },
  {
    label: 'Customers',
    link: '/customers',
    roles: ['SUPER ADMIN'],
  },
  {
    label: 'Menu',
    link: '/menus',
    roles: ['SUPER ADMIN'],
  },
  {
    label: 'Settings',
    // link: "/homepages",
    link: '#',
    roles: ['SUPER ADMIN'],
    menu: [
      {
        label: 'Homepage',
        link: '/homepages',
        roles: ['SUPER ADMIN'],
      },
      // {
      //   label: 'Color',
      //   link: '/colors',
      //   roles: ['SUPER ADMIN'],
      // },
      // {
      //   label: 'Size',
      //   link: '/sizes',
      //   roles: ['SUPER ADMIN'],
      // },
      // {
      //   label: 'Template',
      //   link: '/templates',
      //   roles: ['SUPER ADMIN'],
      // },
      // {
      //   label: 'Variation',
      //   link: '/variations',
      //   roles: ['SUPER ADMIN'],
      // },
      // {
      //   label: 'Frames',
      //   link: '/frames',
      //   roles: ['SUPER ADMIN'],
      // },
    ],
  },
  // {
  //   label: 'Franchise',
  //   link: '/franchises',
  //   roles: ['SUPER ADMIN'],
  // },
];
