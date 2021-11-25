// Import the functions you need from the SDKs you need
import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAMbtsuacRZL9qrmlYkNoMK6GioOzd7Mok",
    authDomain: "classroom-b51b9.firebaseapp.com",
    projectId: "classroom-b51b9",
    storageBucket: "classroom-b51b9.appspot.com",
    messagingSenderId: "495321702782",
    appId: "1:495321702782:web:240fd41f5cc440c651d32f",
    measurementId: "G-VRHYCRT0J7"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
} else {
    firebase.app();
}

export const storage = firebase.storage();

export const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const login = async () => {
    const res = await firebase.auth().signInWithPopup(provider)
    return res.user
}

export const logout = async () => {
    await firebase.auth().signOut()
}

