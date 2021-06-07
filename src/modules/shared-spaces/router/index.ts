import { RouteRecordRaw } from 'vue-router';
import { PERMISSIONS } from '@/core/constants';
import AdminLayout from '@/core/layout/AdminLayout.vue';

export const SharedSpacesRoutes: Array<RouteRecordRaw> = [
  {
    path: '/sharedspaces',
    name: 'SharedSpaces',
    component: () => import('../pages/ManageSharedSpaces.vue'),
    meta: {
      requiresAuth: true,
      layout: AdminLayout,
      permission: PERMISSIONS.WORKGROUPS.VIEW
    }
  }
];
