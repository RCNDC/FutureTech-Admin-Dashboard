import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), layout('layouts/auth.tsx', [route("/login","routes/login.tsx"), route("/forgot-password", "routes/forgetpassword.tsx"), route('/reset-password/:param', 'routes/resetpassword.tsx')])] satisfies RouteConfig;