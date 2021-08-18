<template>
  <a-row>
    <a-col :md="{span: 16, offset: 4}">
      <div class="administration">
        <div class="administration__menu-item">
          <span>Details</span>
          <RightOutlined />
        </div>
        <div class="administration__menu-item">
          <span>Parameters</span>
          <RightOutlined />
        </div>
        <div class="administration__menu-item">
          <span>Mail templates</span>
          <RightOutlined />
        </div>
        <div class="administration__menu-item">
          <span>Welcome messages</span>
          <RightOutlined />
        </div>
        <div class="administration__menu-item">
          <span>Type mime policies</span>
          <RightOutlined />
        </div>
        <div class="administration__menu-item">
          <span>Providers</span>
          <RightOutlined />
        </div>
        <div class="administration__menu-item">
          <span>Quota</span>
          <RightOutlined />
        </div>
        <div class="administration__menu-item">
          <span>Public keys</span>
          <RightOutlined />
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RightOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  name: 'ConfigurationEntries',
  components: {
    RightOutlined
  }
});
</script>

<style lang='less' scoped>
  .administration {
    &__menu-item {
      padding: 15px 0px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: 16px;
        color: @text-color;
      }

      .anticon {
        color: @primary-4;
        font-size: 14px;
      }
    }
  }
</style>
