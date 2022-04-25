<template>
  <main>
    <page-header title="New Order" show-back-button></page-header>
    <div class="r">
      <div class="lg:c8">
        <section>
          <b-card>
            <template #header>
              <div class="df fcsb">
                <h2>Your cart</h2>
                <b-button-group class="dif" rounded>
                  <b-button
                    small
                    ghost
                    prefix-icon="control-plus"
                    @click="modalAddToCartVisible = true"
                    >New Item</b-button
                  >
                  <b-button
                    small
                    ghost
                    prefix-icon="delete"
                    danger
                    @click="handleRemoveSelectedCartItems"
                    >Remove all selected</b-button
                  >
                </b-button-group>
              </div>
            </template>
            <div class="mi6x">
              <b-table
                :data="cart"
                empty-text="Your cart is empty"
                @selection-change="handleCartSelectionChange"
              >
                <b-table-column type="selection" width="58"></b-table-column>
                <b-table-column label="Product" min-width="240"
                  ><template #default="{ row }">
                    <h4>{{ row.name }}</h4>
                    <p class="df dic tsxs ttu">
                      <span>{{ row.code }}</span>
                      <span class="tusep cg6 mx1x"></span>
                      <span>{{ row.category }}</span>
                      <span class="tusep cg6 mx1x"></span>
                      <span>{{ row.uom }}</span>
                    </p>
                  </template></b-table-column
                >
                <b-table-column label="Quantity" width="120" align="right">
                  <template #default="{ row }">
                    <b-numeric-input
                      v-model="row.quantity"
                      :min="1"
                      width="120"
                      class="mxi6x myi4x"
                    ></b-numeric-input>
                  </template>
                </b-table-column>
                <b-table-column label="Unit Price" width="120" align="right"
                  ><template #default="{ row }">
                    {{ row.price | currency }}</template
                  ></b-table-column
                >
                <b-table-column label="Total" width="120" align="right"
                  ><template #default="{ row }">
                    <p class="fw6">
                      {{ (row.price * row.quantity) | currency }}
                    </p>
                  </template></b-table-column
                >
              </b-table>
            </div>
          </b-card>
        </section>
        <section class="mt6x">
          <b-card>
            <div class="df fcsb">
              <h2>Delivery Info</h2>
              <b-button
                small
                prefix-icon="write"
                @click="modalChangeDeliveryAddress = true"
                >Edit addresses</b-button
              >
            </div>
            <div class="r">
              <div class="c6">
                <section class="bgg2 p4x mt4x bdrlg">
                  <h4>Delivery Address</h4>
                  <b-form-item label="Address">
                    <b-data-value>{{ formatDeliveryAddress() }}</b-data-value>
                  </b-form-item>
                  <b-form-item label="Phone Number">
                    <b-data-value>{{
                      entity.deliveryAddress.phone | mask('(X#) ###-###-####')
                    }}</b-data-value>
                  </b-form-item>
                </section>
              </div>
              <div class="c6">
                <section class="bgg2 p4x mt4x bdrlg">
                  <h4>Billing Address</h4>
                  <b-form-item label="Address">
                    <b-data-value>{{ formatBillingAddress() }}</b-data-value>
                  </b-form-item>
                  <b-form-item label="Phone Number">
                    <b-data-value>{{
                      entity.billingAddress.phone | mask('(X#) ###-###-####')
                    }}</b-data-value>
                  </b-form-item>
                </section>
              </div>
            </div>

            <b-form-item optional label="Notes"
              ><b-input
                type="textarea"
                placeholder="Enter your notes"
                maxlength="1000"
                show-word-limit
                :autosize="{ minRows: 4, maxRows: 8 }"
              ></b-input
            ></b-form-item>
            <b-form-item optional label="Payment"
              ><common-document-uploader
                :doc-url="entity.paymentDocumentLink"
                upload-message="Charge on Statement"
                class="mt1x"
                @change="handlePaymentDocumentChange"
                @delete="handlePaymentDocumentDelete"
                @loading="handlePaymentDocumentLoading"
              />
            </b-form-item>
          </b-card>
        </section>
      </div>
      <div class="lg:c4">
        <section class="mt6x md:mt0x">
          <b-card>
            <b-form-item class="mt0x" label="Delivery Date">
              <b-date-picker
                align="center"
                placeholder="Choose the delivery date"
              />
            </b-form-item>
          </b-card>
        </section>
        <section class="mt6x">
          <b-card>
            <h2>Pricing summary</h2>
            <div class="r mt4x">
              <div class="c6 mt2x">
                <p>Subtotal</p>
              </div>
              <div class="c6 tar mt2x">
                <p>$0.00</p>
              </div>
              <div class="c6 mt2x">
                <p>Delivery Fee</p>
              </div>
              <div class="c6 tar mt2x">
                <p>$0.00</p>
              </div>
              <div class="c6 mt2x">
                <p>Tax</p>
              </div>
              <div class="c6 tar mt2x">
                <p>$0.00</p>
              </div>
              <div class="c12">
                <div class="bgg2 px4x py2x bdrmd fw6 tsxl mt2x mbi4x mxi4x">
                  <div class="r">
                    <div class="c6">
                      <p>Total</p>
                    </div>
                    <div class="c6 tar">
                      <p>$0.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card>
        </section>
        <div class="mt6x db">
          <b-button primary suffix-icon="arrow-right" class="w100p"
            >Submit Order</b-button
          >
        </div>
      </div>
    </div>
    <modal-add-to-cart
      v-if="modalAddToCartVisible"
      :data="{
        products: refData.products,
        productCategories: refData.productCategories,
      }"
      @close="modalAddToCartVisible = false"
      @submit="handleSubmit"
    ></modal-add-to-cart>
    <modal-change-address
      v-if="modalChangeDeliveryAddress"
      @close="modalChangeDeliveryAddress = false"
    ></modal-change-address>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { cloneDeep } from 'lodash'
import ModalAddToCart from '~/partials/orders/ModalAddToCart.vue'
import { CategoryList, ProductList } from '~/models/catalog'
import { CartItem, OrderDTO } from '~/models/order'
import ModalChangeAddress from '~/partials/orders/ModalChangeAddress.vue'
export default Vue.extend({
  name: 'OrderCreatePage',
  meta: {
    breadcrumb: 'New Order',
  },
  components: { ModalAddToCart, ModalChangeAddress },
  data() {
    return {
      entity: {
        deliveryDate: '',
        notes: '',
        paymentDocumentLink: '',
        orderItems: [],
        deliveryAddress: {
          address1: '',
          city: {
            key: '',
            value: '',
          },
          state: {
            key: '',
            value: '',
          },
          zip: '',
          phone: '',
        },
        billingAddress: {
          address1: '',
          city: {
            key: '',
            value: '',
          },
          state: {
            key: '',
            value: '',
          },
          zip: '',
          phone: '',
        },
      },
      refData: {
        products: {
          total: 0,
          entities: [],
        },
        productCategories: {
          total: 0,
          entities: [],
        },
      },
      modalAddToCartVisible: false,
      modalChangeDeliveryAddress: false,
      cart: [],
      selectedItemIds: [],
    } as {
      entity: OrderDTO
      modalAddToCartVisible: boolean
      refData: {
        products: ProductList
        productCategories: CategoryList
      }
      cart: CartItem[]
      selectedItemIds: string[]
    }
  },
  async fetch() {
    const { state, dispatch } = this.$store

    if (!state.account.franchisee.fetched) {
      await dispatch('account/fetchFranchisee')
    }

    this.entity.deliveryAddress = cloneDeep(
      state.account.franchisee.data.deliveryInformation
    )
    this.entity.billingAddress = cloneDeep(
      state.account.franchisee.data.billingInformation
    )

    try {
      const productCategories =
        await this.$services.catalog.getProductCategories()
      productCategories && (this.refData.productCategories = productCategories)
    } catch {}

    try {
      const products = await this.$services.catalog.getProducts()
      products && (this.refData.products = products)
    } catch {}
  },
  methods: {
    formatDeliveryAddress() {
      const { address1, city, state, zip } = this.entity.deliveryAddress

      return [address1, city.value, state.value, zip].join(', ')
    },
    formatBillingAddress() {
      const { address1, city, state, zip } = this.entity.billingAddress

      return [address1, city.value, state.value, zip].join(', ')
    },
    handlePaymentDocumentChange() {},
    handlePaymentDocumentDelete() {},
    handlePaymentDocumentLoading() {},
    handleSubmit(cartItem: CartItem[]) {
      this.modalAddToCartVisible = false

      cartItem.forEach((i) => {
        const existed = this.cart.find((c) => c.id === i.id)

        if (existed) {
          existed.quantity += i.quantity
        } else {
          this.cart.push(i)
        }
      })
    },
    handleCartSelectionChange(selectedItems: CartItem[]) {
      this.selectedItemIds = selectedItems.map((i) => i.id)
    },
    handleRemoveSelectedCartItems() {
      if (this.selectedItemIds.length) {
        this.cart = this.cart.filter(
          (c) => !this.selectedItemIds.includes(c.id)
        )
      } else {
        this.$message('You must choose least one product')
      }
    },
  },
})
</script>
PageHeader
