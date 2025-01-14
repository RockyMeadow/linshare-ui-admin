import { RouteRecordRaw } from 'vue-router';

export const RemoteServersRoute: RouteRecordRaw = {
  name: 'RemoteServersList',
  path: 'remote_servers',
  component: () => import('../components/RemoteServersList.vue'),
  meta: {
    parentRoute: 'Configuration',
    label: 'NAVIGATOR.REMOTE_SERVERS',
    requiresAuth: true
  }
};
