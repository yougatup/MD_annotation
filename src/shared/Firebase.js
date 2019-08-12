import * as firebase from 'firebase'
let database;
let config = {
    apiKey: "AIzaSyDbwDq8QfVoDbMNJCwlkSzfot0rK-gAxmg",
    authDomain: "protobot-rawdata.firebaseapp.com",
    databaseURL: "https://protobot-rawdata.firebaseio.com",
    projectId: "protobot-rawdata",
    storageBucket: "",
    messagingSenderId: "152034338524",
    appId: "1:152034338524:web:d343041e00ee49b1"
}

export const fire = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
  database = firebase.database()
}