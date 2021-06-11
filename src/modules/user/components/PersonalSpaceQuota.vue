<template>
  <div class="personal-space-quota">
    <a-row type="flex" :gutter="30" class="personal-space-quota__row">
      <a-col :xl="7" :lg="10" :sm="12" :xs="24">
        <a-form>
          <span class="personal-space-quota__status">Used 333.33 MB over 1GB</span>
          <a-progress :percent="percentUsed" :format="displayFormat"/>

          <div class="personal-space-quota__field">
            <span class="personal-space-quota__title">
              User's personal space allocated quota
            </span>
            <div class="personal-space-quota__default-value">
              <span class="label">Default value:</span>
              <span class="value">1 GB</span>
            </div>
            <span class="personal-space-quota__label">Current value</span>

            <a-input type="number">
              <template #addonAfter>
                <a-select style="width: 80px">
                  <a-select-option value="1">KB</a-select-option>
                  <a-select-option value="2">MB</a-select-option>
                  <a-select-option value="3">GB</a-select-option>
                  <a-select-option value="4">TB</a-select-option>
                  <a-select-option value="5">PB</a-select-option>
                  <a-select-option value="6">EB</a-select-option>
                  <a-select-option value="7">ZB</a-select-option>
                  <a-select-option value="8">YB</a-select-option>
                </a-select>
              </template>
            </a-input>
            <a-button :size="link">
              <template #icon>
                <UndoOutlined />
              </template>
            </a-button>
          </div>

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
              <a-input type="number">
                <template #addonAfter>
                  <a-select style="width: 80px">
                    <a-select-option value="1">KB</a-select-option>
                    <a-select-option value="2">MB</a-select-option>
                    <a-select-option value="3">GB</a-select-option>
                    <a-select-option value="4">TB</a-select-option>
                    <a-select-option value="5">PB</a-select-option>
                    <a-select-option value="6">EB</a-select-option>
                    <a-select-option value="7">ZB</a-select-option>
                    <a-select-option value="8/">YB</a-select-option>
                  </a-select>
                </template>
              </a-input>

              <div class="reset-button">
                <a-button :size="link">
                  <template #icon>
                    <UndoOutlined />
                  </template>
                </a-button>
              </div>
            </div>
          </div>

          <a-button class="personal-space-quota__save" type="primary">{{ $t('GENERAL.SAVE') }}</a-button>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { UndoOutlined } from '@ant-design/icons-vue';
import UserQuota from '@/modules/user/type/UserQuota';
import UserAPIClient from '@/modules/user/services/UserAPIClient';

export default defineComponent({
  name: 'PersonalSpaceQuota',
  components: {
    UndoOutlined
  },
  async setup () {
    const store = useStore();
    const { uuid, quotaUuid } = store.getters['User/getUser'];
    const data = await UserAPIClient.getUserQuota(uuid, quotaUuid);
    const quota = reactive<UserQuota>(data);
    const displayFormat = (percent: any) => `Used ${percent}%`;

    return {
      displayFormat,
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
      flex: 0 1 40px;
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
