import { combineReducers } from 'redux';
import alert from './alert_reducer';
import auth from './auth_reducer';
import { banner_reducer } from './banner_reducer';
import { contact_reducer } from './contact_reducer';
import { newsletter_reducer } from './newsletter_reducer';
import { product_reducer } from './product_reducer';
import { page_reducer } from './page_reducer';
import { category_reducer } from './category_reducer';
import { blog_reducer } from './blog_reducer';
import { coupon_reducer } from './coupon_reducer';
import { customer_reducer } from './customer_reducer';
import { returnrequest_reducer } from './returnrequest_reducer';
import { collection_reducer } from './collection_reducer';
import { order_reducer } from './order_reducer';
import { notification_reducer } from './notification_reducer';
import { dashboard_reducer } from './dashboard_reducer';
import { mobilebanner_reducer } from './mobilebanner_reducer';
import { sitepage_reducer } from './sitepage_reducer';
import { testimonial_reducer } from './testimonial_reducer';
import { review_reducer } from './review_reducer';
import { vendor_reducer } from './vendor_reducer';
import { menu_reducer } from './menu_reducer';
import { homepage_reducer } from './homepage_reducer';
import { template_reducer } from './template_reducer';
import { productcategory_reducer } from './productcategory_reducer';
import { variation_reducer } from './variation_reducer';
import { frame_reducer } from './frame_reducer';
import { subcategory_reducer } from './subcategory_reducer';
import { subsubcategory_reducer } from './subsubcategory_reducer';
import { subsubsubcategory_reducer } from './subsubsubcategory_reducer';
import { subsubsubsubcategory_reducer } from './subsubsubsubcategory_reducer';
import { color_reducer } from './color_reducer';
import { size_reducer } from './size_reducer';
import { franchise_reducer } from './franchise_reducer';
import { bulk_reducer } from './bulk_reducer';

export default combineReducers({
  alert,
  auth,
  banner: banner_reducer,
  contact: contact_reducer,
  newsletter: newsletter_reducer,
  product: product_reducer,
  page: page_reducer,
  category: category_reducer,
  blog: blog_reducer,
  coupon: coupon_reducer,
  customer: customer_reducer,
  returnrequest: returnrequest_reducer,
  collection: collection_reducer,
  order: order_reducer,
  notification: notification_reducer,
  dashboard: dashboard_reducer,
  mobilebanner: mobilebanner_reducer,
  sitepage: sitepage_reducer,
  testimonial: testimonial_reducer,
  review: review_reducer,
  vendor: vendor_reducer,
  menu: menu_reducer,
  homepage: homepage_reducer,
  template: template_reducer,
  productcategory: productcategory_reducer,
  variation: variation_reducer,
  frame: frame_reducer,
  subcategory: subcategory_reducer,
  subsubcategory: subsubcategory_reducer,
  subsubsubcategory: subsubsubcategory_reducer,
  subsubsubsubcategory: subsubsubsubcategory_reducer,
  color: color_reducer,
  size: size_reducer,
  franchise: franchise_reducer,
  bulk: bulk_reducer,
});
