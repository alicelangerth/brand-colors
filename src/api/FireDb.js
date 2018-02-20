import Firebase from 'firebase'
import * as keys from './keys.js'

var FireDb = Firebase.initializeApp({
  apiKey: keys.keys.firebase,
  authDomain: 'brandcolors-186611.firebaseapp.com',
  databaseURL: 'https://brandcolors-186611.firebaseio.com',
  projectId: 'brandcolors-186611',
  storageBucket: 'brandcolors-186611.appspot.com',
  messagingSenderId: '864601731315'
})

export default FireDb
