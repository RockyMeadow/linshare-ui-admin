<template>
  <a-input v-model:value="value" @change='emitValue' type="number">
    <template #addonAfter>
      <a-select v-model:value="unit" @change='updateValue' :options="STORATE_UNITS"/>
    </template>
  </a-input>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, SetupContext } from 'vue';
import { getReadable, STORATE_UNITS, ReadableSize } from '@/core/utils/unitStorage';

export default defineComponent({
  name: 'SizeInput',
  props: {
    bytes: {
      type: Number,
      default: 0
    }
  },
  setup (props, { emit }: SetupContext) {
    let readable;

    function emitValue () {
      emit('input', value.value * unit.value);
    };

    onMounted(() => {
      readable = reactive(new ReadableSize(props.bytes));
    });

    return {
      readable
      emitValue,
      STORATE_UNITS
    };
  }
});
</script>
