<template>
  <main>
    <page-header title="My Orders"></page-header>

    <b-card>
      <div slot="header" class="r rsm fic fce mbi2x">
        <!-- Box Search -->
        <div class="ca mb2x">
          <form @submit.prevent="handleSearch">
            <b-input
              v-model="searchKeyword"
              rounded
              placeholder="Order Code, Order Date"
              class="w280 bgw"
              prefix-class="pr0x"
            >
              <b-button-icon
                slot="append"
                primary
                name="search"
              ></b-button-icon>
            </b-input>
          </form>
        </div>
        <!-- Dropdown Status -->
        <div class="ca mb2x">
          <grid-filtering-option
            rounded
            type="single"
            label="Status"
            field="status"
            :options="filteringOptions.status"
            :initial-value="filteringOptions.status[0].value"
            @change="handleFilter"
          >
          </grid-filtering-option>
        </div>
        <!-- Dropdown DateRange -->
        <div class="ca mb2x">
          <grid-filtering-option
            rounded
            type="daterange"
            label="Order Date"
            field="status"
            :options="filteringOptions.createdAt"
            :initial-value="filteringOptions.createdAt[0].value"
            @change="handleFilter"
          >
          </grid-filtering-option>
        </div>
      </div>

      <div class="mxi6x mti6x">
        <b-table
          :data="dataTable"
          :default-sort="{ props: 'orderCode', order: 'desc' }"
        >
          <b-table-column
            fixed
            sortable
            prop="orderCode"
            label="Order Code"
            width="150"
          >
            <template slot-scope="scope">
              <nuxt-link to="/" class="link-primary">
                {{ scope.row.orderCode }}
              </nuxt-link>
            </template>
          </b-table-column>
          <b-table-column
            prop="orderDate"
            label="Order Date"
            width="180"
          ></b-table-column>
          <b-table-column
            prop="expectedDeliveryDate"
            label="Expected Delivery Date"
            width="200"
          >
          </b-table-column>
          <b-table-column
            prop="deliveryAddress"
            label="Delivery Address"
            width="300"
          ></b-table-column>
          <b-table-column prop="status" label="Status" width="150">
            <template slot-scope="scope">
              <b-tag>{{ statusText(scope.row.status) }}</b-tag>
            </template>
          </b-table-column>
          <b-table-column
            prop="totalAmount"
            label="Total Amount"
            width="150"
          ></b-table-column>
          <b-table-column
            fixed="right"
            prop="actions"
            label="Actions"
            width="150"
          >
            <template #default="{ row }">
              <b-button
                small
                ghost
                primary
                native-tag="nuxt-link"
                :extend-props="{ to: `/orders/${row.actions}` }"
              >
                View Details
              </b-button>
            </template>
          </b-table-column>
        </b-table>
      </div>
    </b-card>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { format, subDays } from 'date-fns'
import GridFilteringOption from '~/components/grid/GridFilteringOption.vue'
import { getStatusText } from '~/utils'
export default Vue.extend({
  components: { GridFilteringOption },
  data() {
    const today = format(new Date(), 'MM/dd/yyyy')
    const past30days = format(subDays(new Date(), 30), 'MM/dd/yyyy')
    const past60days = format(subDays(new Date(), 60), 'MM/dd/yyyy')
    const past90days = format(subDays(new Date(), 90), 'MM/dd/yyyy')

    return {
      searchKeyWord: '',
      dataTable: [
        {
          orderCode: '',
          orderDate: '',
          expectedDeliveryDate: '',
          deliveryAddress: '',
          status: '',
          totalAmount: '',
          actions: true,
        },
      ],
      filteringOptions: {
        status: [
          { label: 'All', value: '' },
          { label: 'New', value: '0' },
          { label: 'Approved', value: '1' },
          { label: 'Delivering', value: '2' },
          { label: 'Delivered', value: '3' },
        ],
        createdAt: [
          {
            label: 'Past 30 days',
            value: [today, past30days],
          },
          {
            label: 'Past 60 days',
            value: [today, past60days],
          },
          {
            label: 'Past 90 days',
            value: [today, past90days],
          },
        ],
      },
    }
  },
  async fetch() {
    this.dataTable = await this.$axios.$get(
      'https://mocki.io/v1/c2871d06-0b8e-483c-944b-31e5603e3834'
    )
  },
  methods: {
    handleFilter({
      field,
      value,
    }: {
      field: string
      value: string | string[]
    }) {},
    statusText(status: number) {
      return getStatusText(status)
    },
  },
})
</script>
