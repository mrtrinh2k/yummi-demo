<template>
  <main>
    <page-header
      title="Order Details"
      :sub-title="entity.code"
      show-back-button
    >
      <b-button
        small
        secondary
        prefix-icon="print"
        @click.prevent="handleExportToPdf"
        >Export to PDF</b-button
      >
    </page-header>

    <div class="r">
      <div class="lg:c4 lg:fol">
        <b-card>
          <h2>Detail</h2>
          <div class="r mti2x">
            <div class="c6">
              <b-form-item label="Order Date">
                <b-data-value>{{ entity.createdAt | datetime }}</b-data-value>
              </b-form-item>
            </div>
            <div class="c6">
              <b-form-item label="Expected Delivery Date">
                <b-data-value>{{ entity.deliveryDate | date }}</b-data-value>
              </b-form-item>
            </div>
            <div class="c6">
              <b-form-item label="Order Status">
                <b-tag :type="statusType(entity.status)">{{
                  statusText(entity.status)
                }}</b-tag>
              </b-form-item>
            </div>
            <div class="c6">
              <b-form-item label="Payment Status">
                <b-tag v-if="entity.paymentStatus">{{
                  entity.paymentStatus
                }}</b-tag>
                <b-data-value v-else />
              </b-form-item>
            </div>
          </div>
        </b-card>
        <b-card class="mt6x">
          <h2>Pricing summary</h2>
          <div class="r mt4x">
            <div class="c6"><p class="tsmd mt2x">Subtotal</p></div>
            <div class="c6"><p class="tsmd mt2x fw6 tar">$20.00</p></div>
            <div class="c6"><p class="tsmd mt2x">Delivery Fee</p></div>
            <div class="c6"><p class="tsmd mt2x fw6 tar">$.0.00</p></div>
            <div class="c6"><p class="tsmd mt2x">Tax</p></div>
            <div class="c6"><p class="tsmd mt2x fw6 tar">$0.00</p></div>
            <div class="c12">
              <div class="bgg2 mt2x fw6 px4x py2x bdrmd mxi4x mbi4x">
                <div class="r">
                  <div class="c6">
                    <p class="tsxl">Total</p>
                  </div>
                  <div class="c6">
                    <p class="tsxl tar">$20.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-card>
      </div>
      <div class="lg:c8">
        <b-card class="mt6x lg:mt0x">
          <h2>Products</h2>
          <div class="mxi6x">
            <b-table :data="entity.orderItems">
              <b-table-column label="Product" min-width="240">
                <template #default="{ row }">
                  <h4>{{ row.productName }}</h4>
                  <p class="tsxs cg6 ttu df">
                    <span>{{ row.productCode }}</span>
                    <span class="tusep mx1x cg5"></span>
                    <span>{{ row.productCategoryName }}</span>
                    <span class="tusep mx1x cg5"></span>
                    <span>{{ row.productUOMCode }}</span>
                  </p>
                </template>
              </b-table-column>
              <b-table-column label="Quantity" prop="quantity" align="center" />
              <b-table-column label="Unit Price" align="right">
                <template #default="{ row }">
                  {{ row.price | currency }}
                </template>
              </b-table-column>
              <b-table-column label="Total" align="right">
                <template #default="{ row }">
                  <p class="fw6">{{ (row.price * row.quantity) | currency }}</p>
                </template>
              </b-table-column>
            </b-table>
          </div>
        </b-card>
        <b-card class="mt6x">
          <h2>Delivery Info</h2>
          <div class="r">
            <div class="md:c6">
              <section class="p4x mt4x bdrmd bgg2">
                <h4>Delivery Address</h4>
                <b-form-item label="Address">
                  <b-data-value>{{ formatDeliveryAddress }}</b-data-value>
                </b-form-item>
                <b-form-item label="Phone Number">
                  <b-data-value>{{
                    entity.deliveryAddress.phone | mask('(X#) ###-###-####')
                  }}</b-data-value>
                </b-form-item>
              </section>
            </div>
            <div class="md:c6">
              <section class="p4x mt4x bdrmd bgg2">
                <h4>Billing Address</h4>
                <b-form-item label="Address">
                  <b-data-value>{{ formatBillingAddress }}</b-data-value>
                </b-form-item>
                <b-form-item label="Phone Number">
                  <b-data-value>{{
                    entity.billingAddress.phone | mask('(X#) ###-###-####')
                  }}</b-data-value>
                </b-form-item>
              </section>
            </div>
          </div>
        </b-card>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { getStatusText, getStatusType } from '~/utils'
export default Vue.extend({
  meta: {
    breadcrumb: 'Order Details',
  },
  async asyncData({ params, $services, error }) {
    try {
      const entity = await $services.order.getOrder(params.id)
      console.log(entity)
      return { entity }
    } catch (_) {
      return error({ statusCode: 404, message: 'Order not found' })
    }
  },
  computed: {
    formatDeliveryAddress() {
      const { address1, city, state, zip } = this.entity.deliveryAddress

      return [address1, city.value, state.value, zip].join(', ')
    },
    formatBillingAddress() {
      const { address1, city, state, zip } = this.entity.billingAddress

      return [address1, city.value, state.value, zip].join(', ')
    },
  },
  methods: {
    handleExportToPdf() {},
    statusType(status: number) {
      return getStatusType(status)
    },
    statusText(status: number) {
      return getStatusText(status)
    },
  },
})
</script>
