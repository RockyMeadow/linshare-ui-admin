import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import { TableState } from 'ant-design-vue/es/table/interface';

import User from '@/modules/user/type/User';
import UserAPIClient, { ListUsersOptions, ListUserFilters } from '@/modules/user/services/UserAPIClient';
import { DEFAULT_PAGE_SIZE } from '@/core/constants';

type Pagination = TableState['pagination'];

interface SortProps {
  field: string;
  order: string;
}

const list = ref<User[]>([]);
const loading = ref(false);
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: DEFAULT_PAGE_SIZE
});

export default function useUsersList () {
  const { t } = useI18n();

  async function updateUsersList (options: ListUsersOptions) {
    if (loading.value) {
      return;
    }

    try {
      loading.value = true;

      const { data, total, current } = await UserAPIClient.listUsers(options);

      list.value = data;
      pagination.total = total;
      pagination.current = current + 1;
    } catch (error) {
      message.error(error.message || t('ERRORS.COMMON_MESSAGE'));
      console.error(error);
    } finally {
      loading.value = false;
    }
  }

  async function handleTableChange (pag: Pagination, filters?: ListUserFilters, sorter?: SortProps) {
    const options: ListUsersOptions = {};

    if (pag) {
      options.size = pag.pageSize;
      options.page = pag.current ? pag.current - 1 : 0;
    }

    if (filters) {
      options.domain = filters.domain;
      options.firstName = filters.firstName;
      options.lastName = filters.lastName;
      options.mail = filters.mail;
      options.role = filters.role;
      options.type = filters.type;
      options.restricted = filters.restricted;
      options.canUpload = filters.canUpload;
      options.canCreateGuest = filters.canCreateGuest;
    }

    if (sorter) {
      options.sortField = sorter.field;
      options.sortOrder = sorter.order === 'descend' ? 'DESC' : 'ASC';
    }

    await updateUsersList(options);
  }

  async function handlePaginationChange (page: number, size: number) {
    const options: ListUsersOptions = {};

    options.page = page - 1;
    options.size = size;

    await updateUsersList(options);
  }

  return {
    list,
    loading,
    pagination,
    handleTableChange,
    handlePaginationChange
  };
}
