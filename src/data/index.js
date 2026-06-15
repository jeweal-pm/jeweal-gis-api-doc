import dashboard from './sections/dashboard';
import calendar from './sections/calendar';
import organization from './sections/organization';
import location from './sections/location';
import user from './sections/user';
import auth from './sections/auth';
import introduction from './sections/introduction';
import errors from './sections/errors';
import master from './sections/master';
import product from './sections/product';
import inventory from './sections/inventory';
import pointOfSale from './sections/point-of-sale';
import customer from './sections/customer';
import setup from './sections/setup';
import analytics from './sections/analytics';
import settings from './sections/settings';
import graphql from './sections/graphql';

// To add a new API module: copy _template.js, import below, and add to sections[].
// To add endpoints to an existing module: edit that section file or its *-endpoints.js import.
// Change baseUrl when pointing docs at UAT or another environment.
export const apiData = {
  title: "GIS API Explorer",
  subtitle: "Complete API Reference",
  version: "v1.0",
  baseUrl: "https://gis247.net/api/v1",
  sections: [
    auth,
    introduction,
    errors,
    dashboard,
    calendar,
    organization,
    location,
    user,
    master,
    product,
    inventory,
    pointOfSale,
    customer,
    setup,
    analytics,
    settings,
    graphql,
  ]
};
