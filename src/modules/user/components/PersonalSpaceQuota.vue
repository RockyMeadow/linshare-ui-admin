<template>
  <div class="personal-space-quota">
    <a-row type="flex" :gutter="30" class="personal-space-quota__row">
      <a-col :xl="9" :lg="12" :sm="12" :xs="24">
        <a-form>
          <span class="personal-space-quota__status">Used {{}} over {{}}</span>
          <a-progress :percent="percentUsed" />

          <div class="personal-space-quota__field">
            <span class="personal-space-quota__title">
              User's personal space allocated quota
            </span>
            <div class="personal-space-quota__default-value">
              <span class="label">Default value:</span>
              <span class="value">1 GB</span>
            </div>
            <span class="personal-space-quota__label">Current value</span>

            <div class="personal-space-quota__input-group">
              <SizeInput v-model:bytes="quota.quota"/>

              <div class="reset-button">
                <a-button type="link">
                  <template #icon>
                    <ReloadOutlined />
                  </template>
                </a-button>
              </div>
            </div>
          </div>

          <div class="personal-space-quota__field">
            <span class="personal-space-quota__title">
              User's max upload file size in Personal Space
            </span>
            <div class="personal-space-quota__default-value">
              <span class="label">Default value:</span>
              <span class="value">1 GB</span>
            </div>
            <span class="personal-space-quota__label">Current value</span>

            <div class="personal-space-quota__input-group">
              <SizeInput v-model:bytes="quota.maxFileSize"/>

              <div class="reset-button">
                <a-button type="link">
                  <template #icon>
                    <ReloadOutlined />
                  </template>
                </a-button>
              </div>
            </div>
          </div>

          <div class="personal-space-quota__action-buttons">
            <div>
              <a-button>
                Use defaults
                <template #icon>
                  <ReloadOutlined />
                </template>
              </a-button>
            </div>
            <div>
              <a-button class="reset" type="primary">Reset</a-button>
              <a-button style="margin-left: 10px" type="primary">
                {{ $t('GENERAL.SAVE') }}
                <template #icon>
                  <CheckOutlined />
                </template>
              </a-button>
            </div>
          </div>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { ReloadOutlined, CheckOutlined } from '@ant-design/icons-vue';
import SizeInput from '@/core/components/SizeInput.vue';
import UserQuota from '@/modules/user/type/UserQuota';
import UserAPIClient from '@/modules/user/services/UserAPIClient';

export default defineComponent({
  name: 'PersonalSpaceQuota',
  components: {
    CheckOutlined,
    ReloadOutlined,
    SizeInput
  },
  async setup () {
    const store = useStore();
    const { uuid, quotaUuid } = store.getters['User/getUser'];
    const data = await UserAPIClient.getUserQuota(uuid, quotaUuid);
    const quota = reactive<UserQuota>(data);
    return {
      quota,
      percentUsed: computed(() => Math.round(quota.realTimeUsedSpace / quota.quota * 100))
    };
  }
});
</script>

<style lang="less" scoped>
.personal-space-quota {
  &__row {
    justify-content: center;

    .ant-col {
      margin: 10px 0px;
    }
  }

  &__status {
    font-weight: 600;
    font-size: 16px;
  }

  &__field {
    margin-top: 20px;
  }

  &__title {
    font-weight: 600;
    display: block;
    margin-bottom: 10px;
  }

  &__label {
    display: block;
    margin-bottom: 10px;
  }

  &__input-group {
    display: flex;

    .reset-button {
      flex: 0 1 50px;
    }
  }

  &__action-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

    .reset {
      background-color: #1B4157;
      border-color: #1B4157;
    }
  }

  &__default-value {
    display: block;
    margin-bottom: 5px;

    .value {
      margin-left: 5px;
      border: 0px;
      background: #F2F5F7;
      border-radius: 3px;
      padding: 7px;
      text-transform: uppercase;
    }
  }
}
</style>
