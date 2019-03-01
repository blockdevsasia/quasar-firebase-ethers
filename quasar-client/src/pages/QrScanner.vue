<template>
  <q-page>
    <div class="q-pa-xs-lg">

      <div class="row">
        <div class="col">
          <q-btn @click="scan">Scan</q-btn>
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
              <div class="text-h6">Scan result Data</div>
              <div class="text-subtitle2">Populated after scanning QR</div>
            </q-card-section>

            <q-separator dark inset/>

            <q-card-section>
              Data here: {{scanResult}}
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

export default {
  name: 'QrScanner',
  data () {
    return {
      scanResult: {}
    }
  },
  methods: {

    scan () {
      let that = this
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          that.scanResult = result
          // alert('We got a barcode\n' +
          //   'Result: ' + result.text + '\n' +
          //   'Format: ' + result.format + '\n' +
          //   'Cancelled: ' + result.cancelled)
        },
        function (error) {
          alert('Scanning failed: ' + error)
        },
        {
          preferFrontCamera: false, // iOS and Android
          showFlipCameraButton: false, // iOS and Android
          showTorchButton: true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt: 'Place a barcode inside the scan area', // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats: 'QR_CODE', // default: all but PDF_417 and RSS_EXPANDED
          orientation: 'portrait', // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations: true, // iOS
          disableSuccessBeep: false // iOS and Android
        }
      )
    }
  }
}
</script>
