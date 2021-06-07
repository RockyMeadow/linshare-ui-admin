import { RouteRecordRaw } from 'vue-router';
import { LoginRoutes } from '@/modules/auth/router';
import { DashboardRoutes } from '@/modules/dashboard/router';
import { UserRoutes } from '@/modules/user/router';
import { SharedSpacesRoutes } from '@/modules/shared-spaces/router';

export default [
  ...LoginRoutes,
  ...DashboardRoutes,
  ...UserRoutes,
  ...SharedSpacesRoutes
] as Array<RouteRecordRaw>;
