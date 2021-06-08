<template>
  <PageTitle
    :title="$t('SHARED_SPACES.MANAGE_SHARED_SPACES.TITLE')"
  >
    <template #helperContent>
      <div class='alert-message-in-description'>{{ $t('SHARED_SPACES.MANAGE_SHARED_SPACES.TITLE') }}</div>
      <div>{{ $t('SHARED_SPACES.MANAGE_SHARED_SPACES.DESCRIPTION') }}</div>
    </template>

  </PageTitle>

  <SharedSpacesList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageTitle from '@/core/components/PageTitle.vue';
import SharedSpacesList from '@/modules/shared-spaces/components/SharedSpacesList.vue';

export default defineComponent({
  name: 'ManageSharedSpaces',
  components: {
    SharedSpacesList,
    PageTitle
  }
});
</script>
