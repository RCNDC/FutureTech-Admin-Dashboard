import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("layouts/auth.tsx", [
    route("/login", "routes/login.tsx"),
    route("/forgot-password", "routes/forgetpassword.tsx"),
    route("/reset-password/:param", "routes/resetpassword.tsx"),
  ]),

  layout('layouts/dashboard.tsx', [
      route('/dashboard/home', 'routes/dashboardhome.tsx'),
      route('/dashboard/checkin', 'routes/checkin/index.tsx'),
      route('/dashboard/submission/ngo', 'routes/submissions/ngo/index.tsx'),
      route('/dashboard/submission/localcompany', 'routes/submissions/localcompany/index.tsx'),
      route('/dashboard/submission/internationalcompany', 'routes/submissions/internationalcompany/index.tsx'),
      route('/dashboard/submission/embassies', 'routes/submissions/embassy/index.tsx'),
      route('/dashboard/submission/startups', 'routes/submissions/startup/index.tsx'),
      route("/dashboard/attendees", "routes/attendees/index.tsx"),
      route("/dashboard/users", "routes/users/index.tsx"),
  ]),
  layout("layouts/checkout.tsx", [
    route("checkout", "routes/checkout.tsx"),
    route("checkout/completed", "routes/completed.tsx"),
  ]),
] satisfies RouteConfig;
