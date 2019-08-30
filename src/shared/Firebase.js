import * as firebase from 'firebase'
// let database
let config = {
    apiKey: "AIzaSyB6dlv7VcgguwPxKobbLFJn1FKNAQLVVyM",
    authDomain: "bixby-rawdata.firebaseapp.com",
    databaseURL: "https://bixby-rawdata.firebaseio.com",
    projectId: "bixby-rawdata",
    storageBucket: "",
    messagingSenderId: "690897740839",
    appId: "1:690897740839:web:a7020de721462aa7"
}

export const fire = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
  // database = firebase.database()
}