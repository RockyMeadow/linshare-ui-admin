<template>
  <PageTitle
    :title="$t('USERS.MANAGE_USERS.TITLE')"
    :subtitle="$t('USERS.MANAGE_USERS.SUBTITLE')"
  >
    <template #helperContent>
      <div class='alert-message-in-description'>{{ $t('NAVIGATOR.USERS') }}</div>
      <div>{{ $t('USERS.MANAGE_USERS.DESCRIPTION') }}</div>
      <div class='alert-message-in-description'>{{ $t('USERS.MANAGE_USERS.OPERATION') }}</div>
      <div>{{ $t('USERS.MANAGE_USERS.SEARCH_GUIDE') }}</div>
      <div>{{ $t('USERS.MANAGE_USERS.NAVIGATE_GUIDE') }}</div>
    </template>
  </PageTitle>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ManageSharedSpaces',
  setup () {
    return {};
  }
});
</script>
