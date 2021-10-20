import { RouteRecordRaw } from 'vue-router';
import { RemoteServersRoute } from '@/modules/remote-server/router';
import { UserFilterRoutes } from '@/modules/user-filter/routes';
import { checkAccessiblePage } from './checkAccessiblePage';

export const DomainConfigurationRoute: RouteRecordRaw = {
  name: 'Configuration',
  path: 'configuration',
  redirect: { name: 'DomainManagement' },
  component: () => import('../pages/DomainConfiguration.vue'),
  meta: {
    label: 'NAVIGATOR.CONFIGURATION',
    requiresAuth: true
  },
  children: [
    {
      name: 'DomainManagement',
      path: '',
      component: () => import('../components/DomainManagement.vue')
    },
    {
      name: 'DomainDetails',
      path: 'details',
      component: () => import('../components/DomainDetails.vue'),
      meta: {
        parentRoute: 'Configuration',
        label: 'NAVIGATOR.DOMAIN_DETAILS',
        requiresAuth: true
      }
    },
    {
      name: 'DomainRemoteFilters',
      path: 'filters',
      component: () => import('../components/DomainRemoteFilters.vue'),
      beforeEnter: checkAccessiblePage,
      meta: {
        parentRoute: 'Configuration',
        label: 'NAVIGATOR.REMOTE_FILTERS',
        requiresAuth: true
      }
    },
    {
      name: 'DomainProviders',
      path: 'providers',
      component: () => import('../components/DomainProviders.vue'),
      beforeEnter: checkAccessiblePage,
      meta: {
        parentRoute: 'Configuration',
        label: 'NAVIGATOR.PROVIDERS',
        requiresAuth: true
      }
    },
    {
      name: 'DomainUserProviders',
      path: 'providers',
      component: () => import('../components/DomainUserProviders.vue'),
      beforeEnter: checkAccessiblePage,
      meta: {
        parentRoute: 'DomainProviders',
        label: 'NAVIGATOR.USER_PROVIDERS',
        requiresAuth: true
      }
    },
    {
      name: 'PageNotAccessible',
      path: 'unaccessible',
      component: () => import('../components/DomainManagementWarning.vue'),
      meta: {
        requiresAuth: true
      }
    },
    RemoteServersRoute,
    ...UserFilterRoutes
  ]
};
