import React from 'react';
import { Navigate, Route, Routes as CommonRoutes } from 'react-router-dom';
import { RouteEnum } from './enums/route.enum';

import AllMonitorsPage from '../pages/all-monitors';
import MonitorPage from '../pages/monitor';
import HistoryPage from '../pages/history';


const routes = [
  {
    path: RouteEnum.MONITORS,
    Component: AllMonitorsPage,
  },
  {
    path: RouteEnum.MONITOR_VIEW,
    Component: MonitorPage,
  },
  {
    path: RouteEnum.HISTORY,
    Component: HistoryPage,
  },
  {
    path: '/',
    Component: () => <Navigate to={RouteEnum.MONITORS} />,
  },
];

const Routes = () => {
  return (
    <CommonRoutes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} Component={route.Component} />
      ))}
    </CommonRoutes>
  );
};

export default Routes;
