# Monorepo with boilerplate for Quasar PWA/Mobile app with QR rw, Ethereum, Firestore

I needed all of the above for a pet project, so decided to get them all working together already and share with the community. Just rip out what you don't want :-) 
Pretty bleeding edge and experimental, so just use this as a way to explore. 

Monorepo contains:
- quasar-client
    - Quasar 1.0-beta-5 app with Cordova enabled
    - Firestore enabled using https://github.com/mesqueeb/vuex-easy-firestore
    - QR reading in Cordova (for access to cam) using https://github.com/phonegap/phonegap-plugin-barcodescanner
    - QR generation enabled using https://github.com/fengyuanchen/vue-qrcode
    - Ethereum enabled using https://github.com/ethers-io/ethers.js
- solidity
    - Truffle configuration for deployment and tests

To start with Firebase:
- Set up your account at https://console.firebase.google.com/
- Copy the file /quasar-client/src/boot/firebase.config.js.template to firebase.config.js in the same folder and paste the firebase config from the registration (Api keys etc)
- Create a database that is ReadWrite for all (be careful!)
- Create a collection "userdata" in the DB

To start with Ethereum:
- Install Truffle and Ganache-cli globally
- Run scripts from /solidity folder, see package.json for details
