import React, { useEffect } from 'react';
import './assets/css/bootstrap.min.css';
import './assets/css/app.min.css';
// import './assets/css/style.css';
import './assets/css/custom.css';
import './assets/css/wysiwyg.css';
import './assets/css/responsive.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/actions/auth';
import setAuthToken from './domain/setAuthToken';
import BeforeLoginRoutes from './shared/Routes/BeforeLoginRoutes';
import PrivateRoutes from './shared/Routes/PrivateRoutes';

import PageNotFound from './containers/notfound/PageNotFound';
import Login from './containers/login/Login';
import Dashboard from './containers/dashboard/Dashboard';
import Profile from './containers/profile/Profile';

import AddBanner from './containers/banners/AddBanner';
import AllBanners from './containers/banners/AllBanners';
import ViewBanner from './containers/banners/ViewBanner';
import EditBanner from './containers/banners/EditBanner';

import AddContact from './containers/contacts/AddContact';
import AllContacts from './containers/contacts/AllContacts';
import ViewContact from './containers/contacts/ViewContact';
import EditContact from './containers/contacts/EditContact';

import AddNewsletter from './containers/newsletters/AddNewsletter';
import AllNewsletters from './containers/newsletters/AllNewsletters';
import ViewNewsletter from './containers/newsletters/ViewNewsletter';
import EditNewsletter from './containers/newsletters/EditNewsletter';

import AddProduct from './containers/products/AddProduct';
import AllProducts from './containers/products/AllProducts';
import ViewProduct from './containers/products/ViewProduct';
import EditProduct from './containers/products/EditProduct';
import AddBulkProducts from './containers/products/AddBulkProducts';

import AddPage from './containers/pages/AddPage';
import AllPages from './containers/pages/AllPages';
import ViewPage from './containers/pages/ViewPage';
import EditPage from './containers/pages/EditPage';

import AddCategory from './containers/categorys/AddCategory';
import AllCategorys from './containers/categorys/AllCategorys';
import ViewCategory from './containers/categorys/ViewCategory';
import EditCategory from './containers/categorys/EditCategory';

import AddBlog from './containers/blogs/AddBlog';
import AllBlogs from './containers/blogs/AllBlogs';
import ViewBlog from './containers/blogs/ViewBlog';
import EditBlog from './containers/blogs/EditBlog';

import AddCoupon from './containers/coupons/AddCoupon';
import AllCoupons from './containers/coupons/AllCoupons';
import ViewCoupon from './containers/coupons/ViewCoupon';
import EditCoupon from './containers/coupons/EditCoupon';

import AddOrder from './containers/orders/AddOrder';
import AllOrders from './containers/orders/AllOrders';
import ViewOrder from './containers/orders/ViewOrder';
import EditOrder from './containers/orders/EditOrder';

import AddCustomer from './containers/customers/AddCustomer';
import AllCustomers from './containers/customers/AllCustomers';
import ViewCustomer from './containers/customers/ViewCustomer';
import EditCustomer from './containers/customers/EditCustomer';

import AddCollection from './containers/collections/AddCollection';
import AllCollections from './containers/collections/AllCollections';
import ViewCollection from './containers/collections/ViewCollection';
import EditCollection from './containers/collections/EditCollection';

import AddReturnrequest from './containers/returnrequests/AddReturnrequest';
import AllReturnrequests from './containers/returnrequests/AllReturnrequests';
import ViewReturnrequest from './containers/returnrequests/ViewReturnrequest';
import EditReturnrequest from './containers/returnrequests/EditReturnrequest';

import AddMobilebanner from './containers/mobilebanners/AddMobilebanner';
import AllMobilebanners from './containers/mobilebanners/AllMobilebanners';
import ViewMobilebanner from './containers/mobilebanners/ViewMobilebanner';
import EditMobilebanner from './containers/mobilebanners/EditMobilebanner';

import AddSitepage from './containers/sitepages/AddSitepage';
import AllSitepages from './containers/sitepages/AllSitepages';
import ViewSitepage from './containers/sitepages/ViewSitepage';
import EditSitepage from './containers/sitepages/EditSitepage';

import AddTestimonial from './containers/testimonials/AddTestimonial';
import AllTestimonials from './containers/testimonials/AllTestimonials';
import ViewTestimonial from './containers/testimonials/ViewTestimonial';
import EditTestimonial from './containers/testimonials/EditTestimonial';

import AddReview from './containers/reviews/AddReview';
import AllReviews from './containers/reviews/AllReviews';
import ViewReview from './containers/reviews/ViewReview';
import EditReview from './containers/reviews/EditReview';

import Menu from './containers/menus-old/Menu';
import Settings from './containers/settings/Settings';

import AddVendor from './containers/vendors/AddVendor';
import AllVendors from './containers/vendors/AllVendors';
import ViewVendor from './containers/vendors/ViewVendor';
import EditVendor from './containers/vendors/EditVendor';
import VendorProfile from './containers/vendors/VendorProfile';

import AddMenu from './containers/menuNew/AddMenu';
import AllMenus from './containers/menuNew/AllMenus';
import ViewMenu from './containers/menuNew/ViewMenu';
import EditMenu from './containers/menuNew/EditMenu';
import AllMenusOld from './containers/menus-old/AllMenus';

import AddHomepage from './containers/homepages/AddHomepage';
import AllHomepages from './containers/homepages/AllHomepages';
import ViewHomepage from './containers/homepages/ViewHomepage';
import EditHomepage from './containers/homepages/EditHomepage';

import AddTemplate from './containers/templates/AddTemplate';
import AllTemplates from './containers/templates/AllTemplates';
import ViewTemplate from './containers/templates/ViewTemplate';
import EditTemplate from './containers/templates/EditTemplate';

// import AddVariation from "./containers/variations/AddVariation";

import AddVariation from './containers/variations/AddVariation';
import AllVariations from './containers/variations/AllVariations';
import ViewVariation from './containers/variations/ViewVariation';
import EditVariation from './containers/variations/EditVariation';

import AddProductcategory from './containers/productcategorys/AddProductcategory';
import AllProductcategorys from './containers/productcategorys/AllProductcategorys';
import ViewProductcategory from './containers/productcategorys/ViewProductcategory';
import EditProductcategory from './containers/productcategorys/EditProductcategory';

import AddFrame from './containers/frames/AddFrame';
import AllFrames from './containers/frames/AllFrames';
import ViewFrame from './containers/frames/ViewAllFrames';
import EditFrame from './containers/frames/EditFrame';

import AddSubCategory from './containers/subcategorys/AddSubCategory';
import AllSubCategorys from './containers/subcategorys/AllSubCategorys';
import ViewSubCategory from './containers/subcategorys/ViewSubCategory';
import EditSubCategory from './containers/subcategorys/EditSubCategory';

import AddSubSubCategory from './containers/subsubcategorys/AddSubSubCategory';
import AllSubSubCategorys from './containers/subsubcategorys/AllSubSubCategorys';
import ViewSubSubCategory from './containers/subsubcategorys/ViewSubSubCategory';
import EditSubSubCategory from './containers/subsubcategorys/EditSubSubCategory';

import AddSubSubSubCategory from './containers/subsubsubcategorys/AddSubSubSubCategory';
import AllSubSubSubCategorys from './containers/subsubsubcategorys/AllSubSubSubCategorys';
import ViewSubSubSubCategory from './containers/subsubsubcategorys/ViewSubSubSubCategory';
import EditSubSubSubCategory from './containers/subsubsubcategorys/EditSubSubSubCategory';

import AddSubSubSubSubCategory from './containers/subsubsubsubcategorys/AddSubSubSubSubCategory';
import AllSubSubSubSubCategorys from './containers/subsubsubsubcategorys/AllSubSubSubSubCategorys';
import ViewSubSubSubSubCategory from './containers/subsubsubsubcategorys/ViewSubSubSubSubCategory';
import EditSubSubSubSubCategory from './containers/subsubsubsubcategorys/EditSubSubSubSubCategory';

import AddColor from './containers/colors/AddColor';
import AllColors from './containers/colors/AllColors';
import ViewColor from './containers/colors/ViewColor';
import EditColor from './containers/colors/EditColor';

import AddSize from './containers/sizes/AddSize';
import AllSizes from './containers/sizes/AllSizes';
import ViewSize from './containers/sizes/ViewSize';
import EditSize from './containers/sizes/EditSize';

import AddFranchise from './containers/franchises/AddFranchise';
import AllFranchises from './containers/franchises/AllFranchises';
import ViewFranchise from './containers/franchises/ViewFranchise';
import EditFranchise from './containers/franchises/EditFranchise';
import { TrackOrder } from './containers/orders/TrackOrder';

function App() {
  useEffect(() => {
    //First we have to bring(get that) token, which is saved in local storage
    const token = localStorage.getItem('token');
    //then we will pass that token in setAuthToken method
    setAuthToken(token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <BeforeLoginRoutes exact path='/' component={Login} />
          <PrivateRoutes exact path='/dashboard' component={Dashboard} />
          <PrivateRoutes exact path='/profile' component={Profile} />

          <PrivateRoutes exact path='/banners' component={AllBanners} />
          <PrivateRoutes exact path='/banners/add' component={AddBanner} />
          <PrivateRoutes
            exact
            path='/banners/:id/view'
            component={ViewBanner}
          />
          <PrivateRoutes
            exact
            path='/banners/:id/edit'
            component={EditBanner}
          />

          <PrivateRoutes exact path='/contacts' component={AllContacts} />
          <PrivateRoutes exact path='/contacts/add' component={AddContact} />
          <PrivateRoutes
            exact
            path='/contacts/:id/view'
            component={ViewContact}
          />
          <PrivateRoutes
            exact
            path='/contacts/:id/edit'
            component={EditContact}
          />

          <PrivateRoutes exact path='/newsletters' component={AllNewsletters} />
          <PrivateRoutes
            exact
            path='/newsletters/add'
            component={AddNewsletter}
          />
          <PrivateRoutes
            exact
            path='/newsletters/:id/view'
            component={ViewNewsletter}
          />
          <PrivateRoutes
            exact
            path='/newsletters/:id/edit'
            component={EditNewsletter}
          />

          <PrivateRoutes exact path='/products' component={AllProducts} />
          <PrivateRoutes exact path='/products/add' component={AddProduct} />
          <PrivateRoutes
            exact
            path='/products/bulk-upload'
            component={AddBulkProducts}
          />
          <PrivateRoutes
            exact
            path='/products/:id/view'
            component={ViewProduct}
          />
          <PrivateRoutes
            exact
            path='/products/:id/edit'
            component={EditProduct}
          />

          {/* <PrivateRoutes exact path="/pages" component={AllPages} />
          <PrivateRoutes exact path="/pages/add" component={AddPage} />
          <PrivateRoutes exact path="/pages/:id/view" component={ViewPage} />
          <PrivateRoutes exact path="/pages/:id/edit" component={EditPage} /> */}

          <PrivateRoutes exact path='/categorys' component={AllCategorys} />
          <PrivateRoutes exact path='/categorys/add' component={AddCategory} />
          <PrivateRoutes
            exact
            path='/categorys/:id/view'
            component={ViewCategory}
          />
          <PrivateRoutes
            exact
            path='/categorys/:id/edit'
            component={EditCategory}
          />

          <PrivateRoutes exact path='/blogs' component={AllBlogs} />
          <PrivateRoutes exact path='/blogs/add' component={AddBlog} />
          <PrivateRoutes exact path='/blogs/:id/view' component={ViewBlog} />
          <PrivateRoutes exact path='/blogs/:id/edit' component={EditBlog} />

          <PrivateRoutes exact path='/coupons' component={AllCoupons} />
          <PrivateRoutes exact path='/coupons/add' component={AddCoupon} />
          <PrivateRoutes
            exact
            path='/coupons/:id/view'
            component={ViewCoupon}
          />
          <PrivateRoutes
            exact
            path='/coupons/:id/edit'
            component={EditCoupon}
          />

          <PrivateRoutes exact path='/orders' component={AllOrders} />
          <PrivateRoutes exact path='/orders/add' component={AddOrder} />
          <PrivateRoutes exact path='/orders/:id/view' component={ViewOrder} />
          <PrivateRoutes
            exact
            path='/orders/:id/track'
            component={TrackOrder}
          />
          <PrivateRoutes exact path='/orders/:id/edit' component={EditOrder} />

          <Route exact path='/frames' component={AllFrames} />
          <Route exact path='/frames/add' component={AddFrame} />
          <Route exact path='/frames/:id/view' component={ViewFrame} />
          <Route exact path='/frames/:id/edit' component={EditFrame} />

          <PrivateRoutes exact path='/customers' component={AllCustomers} />
          <PrivateRoutes exact path='/customers/add' component={AddCustomer} />
          <PrivateRoutes
            exact
            path='/customers/:id/view'
            component={ViewCustomer}
          />
          <PrivateRoutes
            exact
            path='/customers/:id/edit'
            component={EditCustomer}
          />

          <PrivateRoutes
            exact
            path='/return-requests'
            component={AllReturnrequests}
          />
          <PrivateRoutes
            exact
            path='/return-requests/add'
            component={AddReturnrequest}
          />
          <PrivateRoutes
            exact
            path='/return-requests/:id/view'
            component={ViewReturnrequest}
          />
          <PrivateRoutes
            exact
            path='/return-requests/:id/edit'
            component={EditReturnrequest}
          />

          <PrivateRoutes exact path='/collections' component={AllCollections} />
          <PrivateRoutes
            exact
            path='/collections/add'
            component={AddCollection}
          />
          <PrivateRoutes
            exact
            path='/collections/:id/view'
            component={ViewCollection}
          />
          <PrivateRoutes
            exact
            path='/collections/:id/edit'
            component={EditCollection}
          />
          {/* <PrivateRoutes exact path="/menus/:slug/edit" component={Menu} />
          <PrivateRoutes exact path="/menus/add" component={Menu} />
          <PrivateRoutes exact path="/menus" component={Menu} /> */}

          <PrivateRoutes exact path='/menus' component={AllMenus} />
          <PrivateRoutes exact path='/menus/add' component={AddMenu} />
          <PrivateRoutes exact path='/menus/:id/view' component={ViewMenu} />
          <PrivateRoutes exact path='/menus/:id/edit' component={EditMenu} />
          <PrivateRoutes exact path='/settings' component={Settings} />

          <PrivateRoutes exact path='/menusOld' component={AllMenusOld} />
          <PrivateRoutes exact path='/menuss' component={Menu} />


          <PrivateRoutes
            exact
            path='/mobilebanners'
            component={AllMobilebanners}
          />
          <PrivateRoutes
            exact
            path='/mobilebanners/add'
            component={AddMobilebanner}
          />
          <PrivateRoutes
            exact
            path='/mobilebanners/:id/view'
            component={ViewMobilebanner}
          />
          <PrivateRoutes
            exact
            path='/mobilebanners/:id/edit'
            component={EditMobilebanner}
          />
          <PrivateRoutes exact path='/pages' component={AllSitepages} />
          <PrivateRoutes exact path='/pages/add' component={AddSitepage} />
          <PrivateRoutes
            exact
            path='/pages/:id/view'
            component={ViewSitepage}
          />
          <PrivateRoutes
            exact
            path='/pages/:id/edit'
            component={EditSitepage}
          />
          <PrivateRoutes
            exact
            path='/testimonials'
            component={AllTestimonials}
          />
          <PrivateRoutes
            exact
            path='/testimonials/add'
            component={AddTestimonial}
          />
          <PrivateRoutes
            exact
            path='/testimonials/:id/view'
            component={ViewTestimonial}
          />
          <PrivateRoutes
            exact
            path='/testimonials/:id/edit'
            component={EditTestimonial}
          />

          <PrivateRoutes exact path='/reviews' component={AllReviews} />
          <PrivateRoutes exact path='/reviews/add' component={AddReview} />
          <PrivateRoutes
            exact
            path='/reviews/:id/view'
            component={ViewReview}
          />
          <PrivateRoutes
            exact
            path='/reviews/:id/edit'
            component={EditReview}
          />

          <PrivateRoutes
            exact
            path='/vendor-profile'
            component={VendorProfile}
          />
          <PrivateRoutes exact path='/vendors' component={AllVendors} />
          <PrivateRoutes exact path='/vendors/add' component={AddVendor} />
          <PrivateRoutes
            exact
            path='/vendors/:id/view'
            component={ViewVendor}
          />
          <PrivateRoutes
            exact
            path='/vendors/:id/edit'
            component={EditVendor}
          />

          <PrivateRoutes exact path='/homepages' component={AllHomepages} />
          <PrivateRoutes exact path='/homepages/add' component={AddHomepage} />
          <PrivateRoutes
            exact
            path='/homepages/:id/view'
            component={ViewHomepage}
          />
          <PrivateRoutes
            exact
            path='/homepages/:id/edit'
            component={EditHomepage}
          />

          <PrivateRoutes exact path='/templates' component={AllTemplates} />
          <PrivateRoutes exact path='/templates/add' component={AddTemplate} />
          <PrivateRoutes
            exact
            path='/templates/:id/view'
            component={ViewTemplate}
          />
          <PrivateRoutes
            exact
            path='/templates/:id/edit'
            component={EditTemplate}
          />

          {
            // <PrivateRoutes exact path="/variations/add" component={AddVariation} />
          }

          <PrivateRoutes exact path='/variations' component={AllVariations} />
          <PrivateRoutes
            exact
            path='/variations/add'
            component={AddVariation}
          />
          <PrivateRoutes
            exact
            path='/variations/:id/view'
            component={ViewVariation}
          />
          <PrivateRoutes
            exact
            path='/variations/:id/edit'
            component={EditVariation}
          />

          <PrivateRoutes
            exact
            path='/productcategorys'
            component={AllProductcategorys}
          />
          <PrivateRoutes
            exact
            path='/productcategorys/add'
            component={AddProductcategory}
          />
          <PrivateRoutes
            exact
            path='/productcategorys/:id/view'
            component={ViewProductcategory}
          />
          <PrivateRoutes
            exact
            path='/productcategorys/:id/edit'
            component={EditProductcategory}
          />

          <PrivateRoutes
            exact
            path='/sub-categories'
            component={AllSubCategorys}
          />
          <PrivateRoutes
            exact
            path='/sub-categories/add'
            component={AddSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-categories/:id/view'
            component={ViewSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-categories/:id/edit'
            component={EditSubCategory}
          />

          <PrivateRoutes
            exact
            path='/sub-sub-categories'
            component={AllSubSubCategorys}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-categories/add'
            component={AddSubSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-categories/:id/view'
            component={ViewSubSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-categories/:id/edit'
            component={EditSubSubCategory}
          />

          <PrivateRoutes
            exact
            path='/sub-sub-sub-categories'
            component={AllSubSubSubCategorys}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-sub-categories/add'
            component={AddSubSubSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-sub-categories/:id/view'
            component={ViewSubSubSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-sub-categories/:id/edit'
            component={EditSubSubSubCategory}
          />

          <PrivateRoutes
            exact
            path='/sub-sub-sub-sub-categories'
            component={AllSubSubSubSubCategorys}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-sub-sub-categories/add'
            component={AddSubSubSubSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-sub-sub-categories/:id/view'
            component={ViewSubSubSubSubCategory}
          />
          <PrivateRoutes
            exact
            path='/sub-sub-sub-sub-categories/:id/edit'
            component={EditSubSubSubSubCategory}
          />

          <PrivateRoutes exact path='/sizes' component={AllSizes} />
          <PrivateRoutes exact path='/sizes/add' component={AddSize} />
          <PrivateRoutes exact path='/sizes/:id/view' component={ViewSize} />
          <PrivateRoutes exact path='/sizes/:id/edit' component={EditSize} />

          <PrivateRoutes exact path='/colors' component={AllColors} />
          <PrivateRoutes exact path='/colors/add' component={AddColor} />
          <PrivateRoutes exact path='/colors/:id/view' component={ViewColor} />
          <PrivateRoutes exact path='/colors/:id/edit' component={EditColor} />

          <PrivateRoutes exact path='/franchises' component={AllFranchises} />
          <PrivateRoutes
            exact
            path='/franchises/add'
            component={AddFranchise}
          />
          <PrivateRoutes
            exact
            path='/franchises/:id/view'
            component={ViewFranchise}
          />
          <PrivateRoutes
            exact
            path='/franchises/:id/edit'
            component={EditFranchise}
          />

          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
