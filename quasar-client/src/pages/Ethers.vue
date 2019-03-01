<template>
  <q-page >

    <div class="q-pa-xs-lg">

      <div class="row">
        <div class="col">
          <q-btn @click="connect">Connect</q-btn>
          <q-btn @click="generateAddress">Generate an address</q-btn>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <hr/>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-card dark bordered class="bg-grey-9 my-card">
            <q-card-section>
              <div class="text-h6">Eth data</div>
              <div class="text-subtitle2">Populated when eth stuff done</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
              Your mnemonic: {{mnemonic}}
            </q-card-section>
          </q-card>
        </div>
      </div>

    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapState } from 'vuex'
import { ethers } from 'ethers'

export default {
  name: 'Ethers',
  data () {
    return {
      ethdata: {}
    }
  },
  computed: {
    ...mapState('userdata', {
      data: 'data'
    }),
    ...mapState('ethers', {
      mnemonic: 'mnemonic'
    })
    // timestampurl () {
    //   return 'http://' + this.data.data.timestamp
    // }
  },
  methods: {

    async connect () {
      const url = 'http://192.168.1.2:8545'

      const provider = new ethers.providers.JsonRpcProvider(url)

      this.ethdata = await provider.getBalance('0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1')
    },

    async generateAddress () {
      let address = ethers.Wallet.fromMnemonic('myth like bonus scare over problem client lizard pioneer submit female collect')

      this.ethdata = address.address
      // console.log("bla", this.bla)
      //
      // this.$store.dispatch('user/set', {id: "uh", "lala": "heyy"})
    }
  }
}
</script>
