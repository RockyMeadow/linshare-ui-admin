<template>
  <a-input v-model:value="value" @change="emitValue" type="number">
    <template #addonAfter>
      <a-select v-model:value="base" @change="emitValue">
        <a-select-option v-for="unit in STORAGE_UNITS" :key="unit.base"> {{unit.label}}</a-select-option>
      </a-select>
    </template>
  </a-input>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, SetupContext } from 'vue';
import { getReadableSize, STORAGE_UNITS } from '@/core/utils/unitStorage';

export default defineComponent({
  name: 'SizeInput',
  props: {
    modelValue: {
      type: Number,
      default: 0
    }
  },
  setup (props, { emit }: SetupContext) {
    const base = ref<number>(1);
    const value = ref<number>(0);

    function setBaseAndValue (bytesValue: number) {
      const readable = getReadableSize(bytesValue);

      value.value = readable.value;
      base.value = readable.unit.base;
    };

    watch(() => props.modelValue, (newValue) => {
      setBaseAndValue(newValue);
    });

    onMounted(() => {
      setBaseAndValue(props.modelValue);
    });

    function emitValue () {
      console.log(base.value);

      emit('update:modelValue', value.value * base.value);
    }

    return {
      emitValue,
      base,
      value,
      STORAGE_UNITS
    };
  }
});
</script>
