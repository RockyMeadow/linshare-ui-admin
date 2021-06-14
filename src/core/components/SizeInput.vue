<template>
  <a-input v-model:value="value" @change='emitValue' type="number">
    <template #addonAfter>
      <a-select v-model:value="unit" @change='updateValue' :options="STORATE_UNITS"/>
    </template>
  </a-input>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, SetupContext } from 'vue';
import { getReadable, STORATE_UNITS } from '@/core/utils/unitStorage';

export default defineComponent({
  name: 'SizeInput',
  props: {
    bytes: {
      type: Number,
      default: 0
    }
  },
  setup (props, { emit }: SetupContext) {
    const unit = ref<number>(1);
    const value = ref<number>(0);

    function emitValue () {
      emit('input', value.value * unit.value);
    };

    function updateValue () {
      value.value = +(props.bytes / unit.value).toFixed(2);
    }

    onMounted(() => {
      const readable = getReadable(props.bytes);

      value.value = readable.value;
      unit.value = readable.unit.value;
    });

    return {
      emitValue,
      unit,
      updateValue,
      value,
      STORATE_UNITS
    };
  }
});
</script>
