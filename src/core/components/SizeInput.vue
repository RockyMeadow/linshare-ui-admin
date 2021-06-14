<template>
  <a-input v-model="converted" @change="setValue" type="number">
    <template #addonAfter>
      <a-select v-model:value="unit" :options="UNITS"></a-select>
    </template>
  </a-input>
</template>

<script lang="ts">
import { LoginRoutes } from '@/modules/auth/router';
import { defineComponent, onMounted, ref, reactive, SetupContext } from 'vue';

interface Unit {
  label: string;
  value: number;
}

const UNITS: Unit[] = [
  { label: 'B', value: 1 },
  { label: 'KB', value: 1e3 },
  { label: 'MB', value: 1e6 },
  { label: 'GB', value: 1e9 },
  { label: 'TB', value: 1e12 },
  { label: 'PB', value: 1e15 },
  { label: 'EB', value: 1e18 },
  { label: 'ZB', value: 1e21 },
  { label: 'YB', value: 1e24 }
];

export default defineComponent({
  name: 'SizeInput',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  setup (props, { emit }: SetupContext) {
    const { floor, log } = Math;
    const unit = ref(1);
    const converted = ref(0);

    function getReadableSize (value: number) {
      if (value < 0) {
        return {
          value: 0,
          unit: UNITS[0]
        };
      }
      const unitIndex = floor(log(value) / log(1000));
      console.log(44, value, unitIndex);

      // Object.assign(selectedUnit, UNITS[unitIndex > 8 ? 8 : unitIndex]);

      return {
        value: value / UNITS[unitIndex].value,
        unit: UNITS[unitIndex].value
      };
    }

    function setValue () {
      emit('input', converted.value * unit.value);
    };

    onMounted(() => {
      const { value, unit } = getReadableSize(props.value);

      converted.value = value;
      unit.value = unit;
    });

    return {
      setValue,
      converted,
      selectedUnit,
      UNITS
    };
  }
});
</script>
