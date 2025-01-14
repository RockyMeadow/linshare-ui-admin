<template>
  <PageTitle
    :title="$t('NAVIGATOR.DOMAIN_DETAILS')"
    :subtitle="currentDomain.name"
    :breadcrumbs="breadcrumbs"
  >
    <template #subTitlePostfix>
      <div
        v-if="canDelete"
        class="delete-domain-container"
      >
        <a-button
          :disabled="loadingDomain"
          :loading="deleting"
          primary
          @click="confirmThenDelete"
        >
          {{ $t('DOMAIN.DELETE.BUTTON') }}
        </a-button>
      </div>
    </template>
  </PageTitle>

  <div
    v-if="loadingDomain"
    class="spinner"
  >
    <a-spin />
  </div>

  <a-row
    v-else
    :gutter="24"
  >
    <a-col :span="12">
      <DomainForm :data="currentDomain" />
    </a-col>

    <a-col
      :span="10"
      :offset="2"
    >
      <div class="info-block-container">
        <div class="info-block">
          <div class="title">
            {{ $t('GENERAL.CREATION_DATE') }}
          </div>
          <div class="value">
            {{ currentDomain.creationDate && $d(currentDomain.creationDate, 'mediumDate') }}
          </div>
        </div>
        <div class="info-block">
          <div class="title">
            {{ $t('GENERAL.MODIFICATION_DATE') }}
          </div>
          <div class="value">
            {{ currentDomain.modificationDate && $d(currentDomain.modificationDate, 'mediumDate') }}
          </div>
        </div>
        <div
          v-if="!isRootDomain"
          class="info-block"
        >
          <div class="title">
            {{ $t('DOMAIN.FIELDS.WELCOME_MESSAGE') }}
          </div>
          <div class="value">
            <a href="">{{ currentDomain.welcomeMessage?.name }}</a>
          </div>
        </div>
        <div
          v-if="!isRootDomain"
          class="info-block"
        >
          <div class="title">
            {{ $t('DOMAIN.FIELDS.MAIL_CONFIGURATION') }}
          </div>
          <div class="value">
            <a href="">{{ currentDomain.mailConfiguration?.name }}</a>
          </div>
        </div>
        <div
          v-if="!isRootDomain"
          class="info-block"
        >
          <div class="title">
            {{ $t('DOMAIN.FIELDS.MIME_POLICY') }}
          </div>
          <div class="value">
            <a href="">{{ currentDomain.mimePolicy?.name }}</a>
          </div>
        </div>
        <div
          v-if="!isRootDomain"
          class="info-block"
        >
          <div class="title">
            {{ $t('DOMAIN.FIELDS.DOMAIN_POLICY') }}
          </div>
          <div class="value">
            <a href="">{{ currentDomain.domainPolicy?.name }}</a>
          </div>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import useBreadcrumbs from '@/core/hooks/useBreadcrumbs';
import PageTitle from '@/core/components/PageTitle.vue';
import DomainForm from '@/modules/domain/components/DomainForm.vue';
import Status from '@/core/types/Status';
import useDomainDelete from '../hooks/useDomainDelete';
import Domain from '../types/Domain';

const store = useStore();
const loadingDomain = computed(() => store.getters['Domain/getStatus']('currentDomain') === Status.LOADING);
const currentDomain = computed<Domain>(() => store.getters['Domain/getCurrentDomain']);
const isRootDomain = computed(() => store.getters['Domain/isRootDomain']);
const { breadcrumbs } = useBreadcrumbs();
const { deleting, confirmThenDelete, canDelete } = useDomainDelete();
</script>

<style lang="less" scoped>
  .spinner {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .info-block-container {
    display: flex;
    flex-wrap: wrap;
    border: 1px solid #F2F5F7;
    padding: 20px;
    border-radius: 4px;
    margin-top: 30px;

    .info-block {
      flex: 0 1 50%;
      margin: 20px 0;

      .title {
        color: @text-color-secondary;
      }
    }
  }

  .delete-domain-container {
    .ant-btn {
      background: @primary-8;
      color: @text-color-inverse;
    }
  }
</style>
