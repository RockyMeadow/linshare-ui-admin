import { computed, createVNode } from 'vue';
import { useStore } from 'vuex';
import { Modal } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import config from '@/config';

const LEGACY_PAGES = [{
  title: 'NAVIGATOR.GROUP_FILTERS',
  route: 'grouppattern/list'
},
{
  title: 'NAVIGATOR.PARAMETERS',
  route: 'functionality/:id/list'
},
{
  title: 'NAVIGATOR.TYPE_MIME',
  route: 'functionality/:id/list'
},
{
  title: 'NAVIGATOR.WELCOME_MESSAGES',
  route: 'welcomemessage/:id/list'
},
{
  title: 'NAVIGATOR.TYPE_MIME',
  route: 'functionality/:id/list'
},
{
  title: 'NAVIGATOR.QUOTA',
  route: 'mimepolicy/:id/list'
},
{
  title: 'NAVIGATOR.MY_CONTACT_LIST',
  route: 'mailinglist/list'
},
{
  title: 'NAVIGATOR.INCONSISTENT_USERS',
  route: 'inconsistentuser/search'
},
{
  title: 'NAVIGATOR.ACTIVITIES',
  route: 'audit'
},
{
  title: 'NAVIGATOR.UPGRADES',
  route: 'upgradetasks/list'
},
{
  title: 'NAVIGATOR.GROUP_PROVIDERS',
  route: 'domain/detail/:id'
},
{
  title: 'NAVIGATOR.WORKSPACE_PROVIDERS',
  route: 'domain/detail/:id'
}];

export default function useLegacyFeatures () {
  const { t } = useI18n();
  const store = useStore();
  const currentDomainUuid = computed(() => store.getters['Domain/getCurrentDomainUuid']);

  function redirect (title: string) {
    Modal.confirm({
      icon: () => createVNode(ExclamationCircleOutlined),
      content: () => t('BETA.CONFIRM_MESSAGE'),
      okText: () => t('GENERAL.OK'),
      cancelText: () => t('GENERAL.CANCEL'),
      onOk: () => {
        const page = LEGACY_PAGES.find(page => page.title === title);

        if (page) {
          window.location.href = `${config.legacyAppUrl}#/${page.route}`.replace(':id', currentDomainUuid.value);
        }
      }
    });
  }

  return {
    redirect
  };
}
