<template>
  <div class="small-table">
    <ListItem
      v-for="item in list"
      :key="item.uuid"
      :data="item"
    />
    <Pagination
      v-model="pagination"
      class="small-table__pagination"
      :is-visible="!!list.length"
      @change="handleTableChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListItem from './ListItem.vue';
import useUsersList from '@/modules/user/hooks/useUsersList';
import Pagination from '@/core/components/Pagination.vue';

export default defineComponent({
  name: 'SmallTable',
  components: {
    ListItem,
    Pagination
  },
  async setup () {
    const { list, pagination, handleTableChange } = useUsersList();

    await handleTableChange(pagination);

    return {
      list,
      pagination,
      handleTableChange
    };
  }
});
</script>

<style lang='less' scoped>
  .small-table {
    display: none;
    @media (max-width: 1067px) {
      display: block;
    }

    &__pagination {
      margin-top: 30px;
    }
  }
</style>
