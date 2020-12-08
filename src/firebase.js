import firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyDjLgCdWVelT1Qv3kEyP0n5E3dsY4IO_n0',
  authDomain: 'fir-186e6.firebaseapp.com',
  projectId: 'fir-186e6',
  storageBucket: 'fir-186e6.appspot.com',
  messagingSenderId: '749158758427',
  appId: '1:749158758427:web:9f728749d99297b8eaa0be',
  measurementId: 'G-SPYCXKTVMV',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }
