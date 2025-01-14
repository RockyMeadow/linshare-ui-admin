<template>
  <div class="list-item">
    <a-list-item @click="goToDetails">
      <a-list-item-meta>
        <template #avatar>
          <WorkgroupIcon
            v-if="data.nodeType === SHARED_SPACE_TYPE.WORKGROUP"
            fill="#0372B3"
          />

          <WorkspaceIcon
            v-else
            fill="#0372B3"
          />
        </template>

        <template #title>
          <span class="list-item__name">{{ data.name }}</span>
          <span
            v-if="data.parentName"
            class="list-item__parent"
          >@{{ data.parentName }}</span>
        </template>

        <template #description>
          <span>{{ $t('GENERAL.UPDATE_TIME_RELATIVE', { time: relativeModificationDate }) }}</span>
        </template>
      </a-list-item-meta>

      <template #extra>
        <a-tag class="list-item__node-type">
          {{
            $t(`SHARED_SPACES.NODE_TYPE.${data.nodeType}`)
          }}
        </a-tag>
      </template>
    </a-list-item>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import WorkgroupIcon from './WorkgroupIcon.vue';
import WorkspaceIcon from './WorkspaceIcon.vue';
import useRelativeTime from '@/core/hooks/useRelativeTime';
import SharedSpace, { SHARED_SPACE_TYPE } from '../types/SharedSpace';

const props = defineProps<{ data: SharedSpace }>();
const router = useRouter();
const relativeModificationDate = props.data.modificationDate
  ? useRelativeTime(props.data.modificationDate)
  : 'N/A';

function goToDetails () {
  router.push({
    name: 'SharedSpaceDetails',
    params: { id: props.data.uuid }
  });
}
</script>

<style lang='less' scoped>
  .list-item {
    border-bottom: 1px solid @border-color-base;
    background: @component-background;
    cursor: pointer;

    &__icon {
      width: 46px;
      color: @primary-color;
    }

    &__name {
      font-size: 16px;
      font-weight: 600;
    }

    &__parent {
      font-size: 15px;
      font-weight: 600;
      color: @primary-color;
      margin-left: 7px;
    }

    &__node-type {
      border: 0px;
      background: @primary-1;
      border-radius: 3px;
      color: @primary-color;
      padding: 7px;
      text-transform: uppercase;
    }
  }
</style>
