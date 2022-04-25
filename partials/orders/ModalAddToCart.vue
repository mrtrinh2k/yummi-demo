<template>
  <b-modal
    large
    visible
    center
    title="Add Items to Cart"
    @close="$emit('close')"
  >
    <div class="r fce fic">
      <div class="ca px2x">
        <b-input
          rounded
          class="w240"
          input-class="tssm fw6 h8x"
          prefix-class="pr0x"
          placeholder="Search for..."
        >
          <b-icon slot="prefix" primary name="search" class="cg6"></b-icon>
        </b-input>
      </div>
      <div class="ca px2x">
        <grid-filtering-option
          label="Category"
          type="single"
          field="category"
          :initial-value="filteringOptions.categories[0].value"
          :options="filteringOptions.categories"
          @change="handleFilter"
        />
      </div>
    </div>
    <div class="mxi6x mt4x bdy1">
      <b-table
        :data="filteredProducts"
        :height="320"
        empty-text="No products"
        @selection-change="handleCartSelectionChange"
      >
        <b-table-column type="selection" width="58" align="right" />
        <b-table-column label="Product" min-width="240">
          <template #default="{ row }">
            <div class="r rxs fic">
              <div class="c">
                <p class="tsmd">{{ row.name }}</p>
              </div>
              <div class="ca">
                <div class="df tsxs">
                  <div v-if="row.categoryName" class="px1x bdrmax bgg2">
                    <span>{{ row.categoryName }}</span>
                  </div>
                  <div v-if="row.uomCode" class="px1x bdrmax bgg2 ml1x">
                    <span class="cg6">UOM</span>
                    <span>{{ row.uomCode }}</span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </b-table-column>
        <b-table-column
          prop="quantity"
          label="Quantity"
          align="center"
          width="160"
        >
          <template #default="{ row }">
            <div class="myi2x">
              <b-numeric-input v-model="row.quantity" step-strictly :min="1" />
            </div>
          </template>
        </b-table-column>
      </b-table>
    </div>
    <div class="df fce mt6x">
      <b-button class="mr4x" @click="$emit('close')">Cancel</b-button>
      <b-button primary @click.prevent="handleSubmit"
        >Add selected to cart</b-button
      >
    </div>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue'
import { Category, Product } from '~/models/catalog'
import { CartItem } from '~/models/order'
export default Vue.extend({
  props: {
    data: {
      type: Object,
      default() {
        return {
          products: {
            total: 0,
            entities: [],
          },
          productCategories: {
            total: 0,
            entities: [],
          },
        }
      },
    },
  },
  data() {
    return {
      filteringValue: {
        category: '',
      },
      selectedItemIds: [] as string[],
    }
  },
  computed: {
    filteringOptions(): { categories: { label: string; value: string }[] } {
      return {
        categories: [
          { label: 'All', value: '' },
          ...this.data.productCategories.entities.map((c: Category) => ({
            label: c.name,
            value: c.id,
          })),
        ],
      }
    },
    products(): Product[] {
      return this.data.products.entities.map((p: Product) => ({
        ...p,
        quantity: 1,
      }))
    },
    filteredProducts(): Product[] {
      let result = this.products

      this.filteringValue.category &&
        (result = result.filter(
          (p: Product) => p.categoryId === this.filteringValue.category
        ))

      console.log(result, 'hello')
      return result
    },
  },
  methods: {
    handleCartSelectionChange(selectedItems: CartItem[]) {
      this.selectedItemIds = selectedItems.map((i) => i.id)
    },
    handleFilter({ field, value }: { field: string; value: string }) {
      field === 'category' && (this.filteringValue.category = value)
    },
    handleSubmit() {
      const payload: CartItem[] = this.products
        .filter((i) => this.selectedItemIds.includes(i.id as string))
        .map((i) => ({
          id: i.id as string,
          code: i.code,
          name: i.name,
          category: i.categoryName,
          uom: i.uomCode,
          quantity: i.quantity as number,
          price: i.price,
        }))

      if (payload.length) {
        this.$emit('submit', payload)
      } else {
        this.$message('You must select least one product')
      }
    },
  },
})
</script>
