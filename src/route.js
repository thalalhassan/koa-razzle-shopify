// import { lazy } from 'react';

// const AboutUs = lazy(() => import('pages/aboutus'));
// const Samplepage = lazy(() => import('pages/samplepage'));
// const Reports = lazy(() => import('pages/reports'));
// const Analitics = lazy(() => import('pages/analytics'));
// const Schedule = lazy(() => import('pages/schedule'));
// const Forecast = lazy(() => import('pages/forecast'));
// const Settings = lazy(() => import('pages/settings'));
// const Support = lazy(() => import('pages/support'));
// const Reportdetail = lazy(() => import('pages/reportdetail'));
// const Createcustomreport = lazy(() => import('pages/createcustomreport'));
// const AddSchedule = lazy(() => import('pages/schedule/addschedule'));
// const Selectaplan = lazy(() => import('pages/subscriptions/selectaplan'));
// const Viewplan = lazy(() => import('pages/subscriptions/viewplan'));
// const Componentsview = lazy(() => import('pages/componentsview'));
// const Login = lazy(() => import('./pages/login'));
import Login from "./pages/login";

// eslint-disable-next-line import/prefer-default-export
const route = [
  {
    path: "/login",
    exact: true,
    component: Login,
  },
  // {
  //   path: '/',
  //   exact: true,
  //   component: Reports,
  // },
  // {
  //   path: '/about',
  //   exact: true,
  //   component: AboutUs,
  // },
  // {
  //   path: '/reports',
  //   exact: true,
  //   component: Reports,
  // },
  // {
  //   path: '/sample',
  //   exact: true,
  //   component: Samplepage,
  // },
  // {
  //   path: '/schedule',
  //   exact: true,
  //   component: Schedule,
  // },
  // {
  //   path: '/schedule/schedulelist',
  //   exact: true,
  //   component: Schedule,
  // },
  // {
  //   path: '/schedule/schedulehistory',
  //   exact: true,
  //   component: Schedule,
  // },
  // {
  //   path: '/analytics',
  //   exact: true,
  //   component: Analitics,
  // },
  // {
  //   path: '/forecast',
  //   exact: true,
  //   component: Forecast,
  // },
  // {
  //   path: '/settings',
  //   exact: false,
  //   component: Settings,
  // },
  // {
  //   path: '/support',
  //   exact: true,
  //   component: Support,
  // },
  // {
  //   path: '/reports/:reportType/:baseTable/:reportKey',
  //   exact: true,
  //   component: Reportdetail,
  // },
  // {
  //   path: '/reports/:reportKey/:reportType/:baseTable/schedule',
  //   exact: true,
  //   component: AddSchedule,
  // },
  // {
  //   path: '/reports/:reportKey/schedule/:scheduleid',
  //   exact: true,
  //   component: AddSchedule,
  // },
  // {
  //   path:
  //     '/reports/:reportKey/schedule/:scheduleid/:step(scheduleType|advanceScheduleType|scheduleRange|scheduleDelivery|outputOption)',
  //   exact: true,
  //   component: AddSchedule,
  // },
  // {
  //   path: '/createcustomreport',
  //   exact: true,
  //   component: Createcustomreport,
  // },
  // {
  //   path: '/subscriptions/selectaplan',
  //   exact: true,
  //   component: Selectaplan,
  // },
  // {
  //   path: '/subscriptions/viewplan',
  //   exact: true,
  //   component: Viewplan,
  // },
  // {
  //   path: '/componentsview',
  //   exact: true,
  //   component: Componentsview,
  // },
];

export default route;
