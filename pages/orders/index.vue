<template>
  <main>
    <page-header title="My Orders"></page-header>

    <b-card v-loading="$fetchState.pending">
      <div slot="header" class="r rsm fic fce mbi2x">
        <!-- Box Search -->
        <div class="ca mb2x">
          <form @submit.prevent="handleSearch">
            <b-input
              v-model="searchKeyWord"
              rounded
              placeholder="Order Code, Order Date"
              class="w280 bgw"
              prefix-class="pr0x"
            >
              <b-button-icon
                slot="append"
                primary
                type="submit"
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
            field="createdAt"
            :options="filteringOptions.createdAt"
            :initial-value="filteringOptions.createdAt[0].value"
            @change="handleFilter"
          >
          </grid-filtering-option>
        </div>
      </div>

      <grid-empty-state v-if="isEmpty">
        <b-button
          primary
          native-tag="nuxt-link"
          :extend-props="{ to: '/orders/create' }"
          text="Create Order"
        />
      </grid-empty-state>
      <grid-no-data v-else-if="isNoData" />
      <section v-else>
        <div class="mxi6x mti6x">
          <b-table
            :data="dataTable.entities"
            :default-sort="{ props: 'code', order: 'desc' }"
          >
            <b-table-column
              fixed
              sortable
              prop="code"
              label="Order Code"
              width="180"
            >
              <template #default="{ row }">
                <nuxt-link
                  :to="`/orders/detail/${row.id}`"
                  class="link-primary"
                >
                  {{ row.code }}
                </nuxt-link>
              </template>
            </b-table-column>
            <b-table-column prop="createdAt" label="Order Date" width="220"
              ><template #default="{ row }">
                {{ row.createdAt | datetime }}
              </template></b-table-column
            >
            <b-table-column
              prop="deliveryDate"
              label="Expected Delivery Date"
              width="220"
            >
              <template #default="{ row }">
                {{ row.deliveryDate | datetime }}
              </template>
            </b-table-column>
            <b-table-column
              prop="deliveryAddress"
              label="Delivery Address"
              width="330"
            >
              <template #default="{ row }">{{
                [
                  row.deliveryAddress.address1,
                  row.deliveryAddress.city.value,
                  row.deliveryAddress.state.value,
                  row.deliveryAddress.zip,
                ]
                  .filter((i) => !!i)
                  .join(', ')
              }}</template>
            </b-table-column>
            <b-table-column prop="status" label="Status" width="150">
              <template slot-scope="scope">
                <b-tag>{{ statusText(scope.row.status) }}</b-tag>
              </template>
            </b-table-column>
            <b-table-column prop="total" label="Total Amount" width="150">
              <template #default="{ row }">{{ row.total | currency }}</template>
            </b-table-column>
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
                  :extend-props="{ to: `/orders/detail/${row.id}` }"
                >
                  View Details
                </b-button>
              </template>
            </b-table-column>
          </b-table>
        </div>
      </section>
    </b-card>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { format, subDays } from 'date-fns'
import GridFilteringOption from '~/components/grid/GridFilteringOption.vue'
import { getStatusText } from '~/utils'
import { ListQueryObject } from '~/models/common'
import { OrdersList } from '~/models/order'
export default Vue.extend({
  components: { GridFilteringOption },
  data() {
    const today = format(new Date(), 'MM/dd/yyyy')
    const past30days = format(subDays(new Date(), 30), 'MM/dd/yyyy')
    const past60days = format(subDays(new Date(), 60), 'MM/dd/yyyy')
    const past90days = format(subDays(new Date(), 90), 'MM/dd/yyyy')

    return {
      searchKeyWord: '',
      query: {
        Search: '',
        Status: '',
        FromOrderDate: past30days,
        ToOrderDate: format(new Date(), 'MM/dd/yyyy'),
        Start: 0,
        Length: 10,
        OrderBy: 'code desc',
      },
      dataTable: {
        total: 0,
        entities: [],
      },
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
    } as {
      searchKeyWord: string
      query: ListQueryObject
      dataTable: OrdersList
      filteringOptions: {
        status: {
          label: string
          value: string
        }[]
        createdAt: { label: string; value: string[] }[]
      }
    }
  },
  async fetch() {
    // this.dataTable = await this.$axios.$get(
    //   'https://mocki.io/v1/c2871d06-0b8e-483c-944b-31e5603e3834'
    // )

    this.dataTable = await this.$services.order.getOrders(this.query)
    console.log(this.dataTable)
  },
  computed: {
    isQueryDirty(): boolean {
      return this.query.Search !== '' || this.query.status !== ''
    },
    isEmpty(): boolean {
      return this.dataTable.total === 0 && !this.isQueryDirty
    },
    isNoData(): boolean {
      return this.dataTable.total === 0 && this.isQueryDirty
    },
  },
  methods: {
    handleFilter({
      field,
      value,
    }: {
      field: string
      value: string | string[]
    }) {
      if (field === 'status') {
        this.query.Status = value === '' ? value : parseInt(value as string)
      }

      if (field === 'createdAt') {
        this.query.FromOrderDate = value[0]
        this.query.ToOrderDate = value[1]
      }

      this.$fetch()
    },
    statusText(status: number) {
      return getStatusText(status)
    },
    handleSearch() {
      this.query.Search = this.searchKeyWord
      this.query.Start = 0
      this.$fetch()
    },
  },
})
</script>
