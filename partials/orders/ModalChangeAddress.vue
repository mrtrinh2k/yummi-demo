<template>
  <b-modal
    center
    medium
    visible
    title="Change Addresses"
    @close="$emit('close')"
  >
    <section class="bgg1 p4x bdrmd">
      <h4>Delivery Address</h4>
      <div class="r">
        <div class="c6">
          <b-form-item label="Country">
            <b-select v-model="deliveryAddress.countries" placeholder="Select">
              <b-option
                v-for="country in refData.countries"
                :key="country.key"
                :label="country.value"
                :value="country.key"
              ></b-option>
            </b-select>
          </b-form-item>
        </div>
        <div class="c6">
          <b-form-item label="State">
            <b-select v-model="deliveryAddress.states" placeholder="Select">
              <b-option
                v-for="state in refData.states"
                :key="state.key"
                :label="state.value"
                :value="state.key"
              ></b-option>
            </b-select>
          </b-form-item>
        </div>
        <div class="c6">
          <b-form-item label="City">
            <b-select v-model="deliveryAddress.city" placeholder="Select">
              <b-option
                v-for="dCt in refData.dCities"
                :key="dCt.key"
                :label="dCt.value"
                :value="dCt.key"
              ></b-option>
            </b-select>
          </b-form-item>
        </div>
      </div>
    </section>
  </b-modal>
</template>

<script lang="ts">
import { isEqual } from 'lodash'
import Vue from 'vue'
import {
  AddressObject,
  Country,
  LocationLv1,
  LocationLv2,
} from '~/models/common'
export default Vue.extend({
  data() {
    return {
      deliveryAddress: {
        address1: '',
        country: '',
        state: {
          key: '',
          value: '',
        },
        city: {
          key: '',
          value: '',
        },
        zip: '',
        phone: '',
      },
      billingAddress: {
        address1: '',
        country: '',
        state: {
          key: '',
          value: '',
        },
        city: {
          key: '',
          value: '',
        },
        zip: '',
        phone: '',
      },
      isSameAsDeliveryAddress: false,
      bCityLoading: false,
      dCityLoading: false,
      refData: {
        countries: [],
        states: [],
        dCities: [],
        bCities: [],
      },
    } as {
      deliveryAddress: AddressObject
      billingAddress: AddressObject
      isSameAsDeliveryAddress: boolean
      bCityLoading: boolean
      dCityLoading: boolean
      refData: {
        countries: Country[]
        states: LocationLv1[]
        dCities: LocationLv2[]
        bCities: LocationLv2[]
      }
    }
  },
  async fetch() {
    const { country, state: dState } = this.deliveryAddress
    const { state: bState } = this.billingAddress

    if (isEqual(this.deliveryAddress, this.billingAddress)) {
      this.isSameAsDeliveryAddress = true
    }

    this.refData.countries = await this.$services.common.getCountries()
    console.log(this.refData.countries, 'ch')
    this.refData.states = await this.$services.common.getLocationLv1s({
      CountryCode: country || 'US',
    })
    this.refData.dCities = await this.$services.common.getLocationLv3s({
      Level1Code: dState.key,
    })
    this.refData.bCities = await this.$services.common.getLocationLv3s({
      Level1Code: bState.key,
    })
  },
})
</script>
