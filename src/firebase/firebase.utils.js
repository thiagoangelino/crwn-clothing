import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCKLKLTpOu0Pui2rgKrhKiDrEu7CrNfFBw",
    authDomain: "crwn-db-ccec0.firebaseapp.com",
    databaseURL: "https://crwn-db-ccec0.firebaseio.com",
    projectId: "crwn-db-ccec0",
    storageBucket: "crwn-db-ccec0.appspot.com",
    messagingSenderId: "887401662646",
    appId: "1:887401662646:web:11b242c838404fa4053e17",
    measurementId: "G-4EWRWXSF7M"
  }

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`user/${ userAuth.uid }`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({ 
                displayName,
                email,
                createdAt,
                ...additionalData
             })
        } catch (error){
            console.log('error creating user', error.message); 
        }
    }
    return userRef;
     

  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const singInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
