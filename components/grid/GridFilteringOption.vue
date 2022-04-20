<template>
  <div
    class="por bgg2 bdrmax ovh hv:bgg3 fc:bgg4 csp tsa025s"
    @click="handleClick"
  >
    <div class="df py2x pl3x pr2x fic por z1">
      <div class="fw-600 cg6">
        <slot name="label">{{ label }}</slot>
      </div>
      <div class="ml1x fw-600">
        <slot name="value">{{ displayValue }}</slot>
      </div>
      <div class="ml1x">
        <b-icon name="action-down" size="12"></b-icon>
      </div>
    </div>
    <b-select
      v-if="['single'].includes(type)"
      ref="picker"
      v-model="value"
      class="poa l0x t0x z2 op0p"
      @change="handleChangeValue"
    >
      <b-option
        v-for="option in options"
        :key="option.label"
        :value="option.value"
        :label="option.label"
      />
    </b-select>
    <b-date-picker
      v-if="['daterange'].includes(type)"
      ref="picker"
      v-model="values"
      align="right"
      type="daterange"
      :picker-options="pickerOptions"
      class="poa z0 t0x l0x vih"
      value-format="MM/dd/yyyy"
      @change="handleChangeValue"
    ></b-date-picker>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { format } from 'date-fns'
import { isEqual } from 'lodash'
export default Vue.extend({
  props: {
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'single',
    },
    field: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default() {
        return []
      },
    },
    initialValue: {
      type: [String, Array, Number, Boolean],
      default: '',
    },
  },
  data() {
    const disabledDate = (date: any) =>
      format(date, 'MM-dd-yyyy') > format(new Date(), 'MM-dd-yyyy')

    return {
      value: '',
      values: [],
      pickerOptions: { disabledDate },
    } as {
      value: any
      values: any
      pickerOptions: any
    }
  },
  computed: {
    displayValue(): string {
      const _options = this.options as { label: string; value: any }[]

      if (this.type === 'single') {
        return _options.find((o) => o.value === this.value)?.label as string
      }

      if (this.type === 'daterange') {
        const _label = _options.find((o) => isEqual(o.value, this.values))
          ?.label as string
        return _label || this.values.join(' - ')
      }

      return this.value
    },
  },
  created() {
    if (['single'].includes(this.type)) {
      this.value = this.initialValue
    }

    if (['daterange'].includes(this.type)) {
      this.values = this.initialValue
    }

    if (this.type === 'daterange') {
      this.pickerOptions.shortcuts = this.options.map((o: any) => ({
        text: o.label,
        onClick(picker: any) {
          picker.$emit('pick', o.value)
        },
      }))
    }
  },
  methods: {
    handleClick() {
      if (this.type === 'daterange') {
        const _picker = this.$refs.picker as any
        _picker && _picker.focus()
      }
    },
    handleChangeValue(value: string | string[]) {
      this.$emit('change', { field: this.field, value })
    },
  },
})
</script>
