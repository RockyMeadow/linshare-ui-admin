<template>
  <PageTitle
    :title="$t('NAVIGATOR.REMOTE_FILTERS')"
    :breadcrumbs="breadcrumbs"
  >
    <template #helperContent>
      <div>{{ $t('DOMAIN.REMOTE_FILTERS_HELPER') }}</div>
    </template>
  </PageTitle>

  <a-row>
    <a-col :span="24">
      <div class="page">
        <router-link :to="{ name: 'UserFilters' }">
          <div class="page__menu-item">
            <span>{{ $t("NAVIGATOR.USER_FILTERS") }}</span>
            <RightOutlined />
          </div>
        </router-link>
        <router-link :to="{ name: 'GroupFilters' }">
          <div class="page__menu-item">
            <span>{{ $t("NAVIGATOR.GROUP_FILTERS") }}</span>
            <RightOutlined />
          </div>
        </router-link>
        <router-link :to="{ name: 'WorkspaceFilters' }">
          <div class="page__menu-item">
            <span>{{ $t("NAVIGATOR.WORKSPACE_FILTERS") }}</span>
            <RightOutlined />
          </div>
        </router-link>
      </div>
    </a-col>
  </a-row>
</template>

<script lang='ts' setup>
import PageTitle from '@/core/components/PageTitle.vue';
import { RightOutlined } from '@ant-design/icons-vue';
import useBreadcrumbs from '@/core/hooks/useBreadcrumbs';

const { breadcrumbs } = useBreadcrumbs();
</script>
