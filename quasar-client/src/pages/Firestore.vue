<template>
  <q-page >

    <div class="q-pa-xs-lg">

      <div class="row">
        <div class="col">
          <q-btn @click="writeFirebase">Write timestamp to Firebase</q-btn>
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
              <div class="text-h6">Firebase Data</div>
              <div class="text-subtitle2">Populated when connection set up</div>
            </q-card-section>

            <q-separator dark inset />

            <q-card-section>
              Data here: {{data}}
            </q-card-section>
          </q-card>
        </div>

      </div>
      <div class="row">
        <div class="col">
          <qrcode-vue :value="timestampurl" :size="qrsize" level="H"></qrcode-vue>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import { mapState } from 'vuex'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'Firestore',
  data () {
    return {
      qrsize: 250
    }
  },
  components: {
    QrcodeVue
  },
  computed: {
    ...mapState('userdata', {
      data: 'data'
    }),
    timestampurl () { return 'http://' + this.data.data.timestamp }
  },
  methods: {

    async writeFirebase () {
      const timestamp = (new Date()).getTime()
      this.$store.dispatch('userdata/set', { id: 'data', 'timestamp': timestamp })
    }
  }
}
</script>
