import Login from "./pages/login";
import Reports from "./pages/reports";

const route = [
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    path: '/reports',
    exact: true,
    component: Reports,
  },
 
];

export default route;
