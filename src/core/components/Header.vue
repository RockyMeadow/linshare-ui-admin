
<template>
  <div class="header">
    <div class="header__upper">
      <div class="logo">
        <router-link to="/">
          <img
            src="@/assets/images/linshare-logo-white.svg"
            :alt="$t('HEADER.LOGO_ALT')"
          >
        </router-link>
      </div>
      <div class="header__right">
        <LanguageSelector />
        <Profile />
      </div>
    </div>
    <div class="header__menu">
      <Menu />
    </div>
  </div>
</template>

<script lang='ts' setup>
import LanguageSelector from '@/core/components/LanguageSelector.vue';
import Profile from '@/core/components/Profile.vue';
import Menu from '@/core/components/Menu.vue';
</script>

<style lang="less" scoped>
  .header {
    .logo {
      width: 160px;

      img {
        width: 100%;
      }
    }

    &__upper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__right {
      display: flex;
      align-items: center;
    }
  }
</style>
