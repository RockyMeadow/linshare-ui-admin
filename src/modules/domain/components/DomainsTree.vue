<style lang="less">
  .domains-tree {
    &__node {
      display: flex;
      margin: 10px 0;

      .name {
        max-width: calc(100% - 40px);
        font-size: 14px;
        background: @background-color-base;
        font-weight: 400;
      }

      .name.ant-btn > span {
        overflow: hidden;
        max-width: 100%;
        text-overflow: ellipsis;
      }

      .name:not(:only-child) {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .dropdown-btn {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    li {
      list-style-type: none;
      position: relative;
    }

    li::before {
      position: absolute;
      left: 25px;
      width: 1px;
      height: calc(100% - 86px);
      margin: 22px 0 0;
      border-left: 1px solid @border-color-base;
      content: ' ';
    }

    li.branch::before {
      height: calc(100% - 36px);
    }

    li.branch::after {
      content: ' ';
      border-top:1px solid @border-color-base;
      height:20px;
      top: 25px;
      width: 15px;
      left: -15px;
      position: absolute;
      right: auto;
    }
  }
</style>

<template>
  <div class="domains-tree">
    <ul>
      <li>
        <div class="domains-tree__node">
          <a-button class="name" size="large">
            {{rootDomain.name}}
          </a-button>
          <a-dropdown :trigger="['click']">
            <a-button
              class="dropdown-btn"
              type="primary"
              size="large"
            >
              <template #icon>
                <PlusOutlined />
              </template>
            </a-button>

            <template #overlay>
              <a-menu>
                <a-menu-item key="1">
                  Create a top domain
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
        <ul>
          <li class="branch" v-for="topDomain in rootDomain.children" :key="topDomain.uuid">
            <div class="domains-tree__node">
              <a-button class="name" size="large">
                {{topDomain.name}}
              </a-button>
              <a-dropdown :trigger="['click']">
                <a-button
                  class="dropdown-btn"
                  type="primary"
                  size="large"
                >
                  <template #icon>
                    <PlusOutlined />
                  </template>
                </a-button>

                <template #overlay>
                  <a-menu>
                    <a-menu-item key="1">
                      Create a sub domain
                    </a-menu-item>
                    <a-menu-item key="1">
                      Create a guest domain
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>

            <ul>
              <li class="branch" v-for="subDomain in topDomain.children" :key="subDomain.uuid">
                <div class="domains-tree__node">
                  <a-button class="name" size="large">
                    {{subDomain.name}}
                  </a-button>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';

const rootDomain = {
  uuid: 'LinShareRootDomain',
  type: 'ROOTDOMAIN',
  name: 'LinShareRootDomain',
  children: [
    {
      uuid: '3074c38a-516a-4d61-b6d2-017177d5d1c4',
      name: 'top1top1top1top1top1top1top1top1top1top1top1top1top1top1top1top1top1top1top1top1top1top1top1top1top1top1',
      type: 'TOPDOMAIN',
      children: [
        {
          uuid: 'cdbc0454-8d67-4b40-b653-e9df05d9f9a9',
          name: 'guestdomain',
          type: 'GUESTDOMAIN'
        },
        {
          uuid: 'f04aca74-e0a8-4788-90a8-b47ecf826584',
          name: 'top1.1',
          type: 'SUBDOMAIN'
        }
      ]
    },
    {
      uuid: 'b601425e-58e2-4f10-a5fd-7f13652ef924',
      name: 'top2',
      type: 'TOPDOMAIN',
      children: [
        {
          uuid: 'cbe54baf-cbd1-4765-a2d0-4c7d730a5a1c',
          name: 'guest 2',
          type: 'GUESTDOMAIN'
        }
      ]
    }
  ]
};

export default defineComponent({
  name: 'DomainsTree',
  components: {
    PlusOutlined
  },
  setup () {
    return {
      rootDomain
    };
  }
});
</script>
