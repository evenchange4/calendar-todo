// @flow
const nextRoutes = require('next-routes');

const routes = nextRoutes();

// Note: routes.add(pattern, page)
routes.add('List', '/', '/List/List');

module.exports = routes;
