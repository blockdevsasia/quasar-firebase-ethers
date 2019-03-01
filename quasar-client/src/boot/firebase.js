import * as Firebase from 'firebase'
import firebaseConfig from './firebase.config'
import { Notify } from 'quasar'
const connection = Firebase.initializeApp(firebaseConfig)

const DB = connection.database()
const AUTH = connection.auth()

// enable firestore with persistence
async function getFirestore (store) {
  const firestore = Firebase.firestore()
  try {
    await firestore.enablePersistence()
  } catch (err) {
    console.log('err.code → ', err.code)
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a a time.
      let message = store.getters.text.api['firebase/failed-precondition']
      Notify.create({ message, preset: 'error' })
    } else if (err.code === 'unimplemented') {
      // The current browser does not support all of the
      // features required to enable persistence
      return firestore
    }
  }
  return firestore
}

export default ({ router, store, Vue }) => {
  console.log('auth start')

  AUTH.onAuthStateChanged(user => {
    getFirestore(store).then(db => {
      if (user) {
        // Signed in. Let Vuex Easy Firestore know.

        console.log('store', store['_modules'])
        store.dispatch('userdata/openDBChannel')
      } else {
        // Signed out. Let Vuex know.
        store.dispatch('resetStore', null)
      }
    })
  })

  AUTH.signInAnonymously().catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code
    var errorMessage = error.message
    console.error(errorMessage, errorCode)
  })

  console.log('auth done')

  Object.defineProperties(Vue.prototype, {
    $db: {
      get () {
        return DB
      }
    },
    $auth: {
      get () {
        return AUTH
      }
    }
  })
}
