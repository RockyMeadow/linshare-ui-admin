<template>
  <div class="list-item">
    <a-list-item>
      <a-list-item-meta>
        <template #avatar>
          <img
            class="list-item__icon"
            src="@/assets/images/workgroup.svg"
          />
        </template>

        <template #title>
          <span class="list-item__name">{{data.name}}</span>
        </template>

        <template #description>
          <span>Updated 2 years ago</span>
        </template>
      </a-list-item-meta>

      <template #extra>
        <a-tag class="list-item__node-type">{{
          $t(`SHARED_SPACES.NODE_TYPE.${data.nodeType}`)
        }}</a-tag>
      </template>
    </a-list-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SharedSpaceItem',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  }
});
</script>

<style lang='less' scoped>
  .list-item {
    border-bottom: 1px solid #EEE;
    background: #FFF;

    &__icon {
      width: 46px;
      color: #0372B3;
    }

    &__name {
      font-size: 16px;
      font-weight: 600;
    }

    &__node-type {
      border: 0px;
      background: #EDF9FF;
      border-radius: 3px;
      color: #0372B3;
      padding: 7px;
      text-transform: uppercase;
    }
  }
</style>
