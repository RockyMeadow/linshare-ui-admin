import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';

import SharedSpace from '@/modules/shared-spaces/type/SharedSpace';
import SharedSpacesAPIClient, { ListSharedSpaceOptions } from '@/modules/shared-spaces/services/SharedSpacesAPIClient';
import { DEFAULT_PAGE_SIZE } from '@/core/constants';

const list = ref<SharedSpace[]>([]);
const loading = ref(false);
const pagination = reactive({
  total: 0,
  current: 1,
  pageSize: DEFAULT_PAGE_SIZE
});

export default function useSharedSpacesList () {
  const { t } = useI18n();

  async function updateSharedSpacesList (options: ListSharedSpaceOptions) {
    if (loading.value) {
      return;
    }

    try {
      loading.value = true;

      const { data, total, current } = await SharedSpacesAPIClient.listSharedSpaces(options);

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

  async function handlePaginationChange (page: number, size: number) {
    const options: ListSharedSpaceOptions = {};

    options.page = page - 1;
    options.size = size;

    await updateSharedSpacesList(options);
  }
  return {
    list,
    loading,
    pagination,
    handlePaginationChange
  };
};
