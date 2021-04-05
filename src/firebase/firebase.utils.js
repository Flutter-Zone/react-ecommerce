import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyAgy8BDyZzqepx0ZHI1U5FVa76lWWCaz7Y",
    authDomain: "crwn-clothing-c41f0.firebaseapp.com",
    databaseURL: "https://crwn-clothing-c41f0.firebaseio.com",
    projectId: "crwn-clothing-c41f0",
    storageBucket: "crwn-clothing-c41f0.appspot.com",
    messagingSenderId: "1059363176503",
    appId: "1:1059363176503:web:9d909a90fc342a25"
}



export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await userRef.set({displayName, email, createdAt, ...additionalData})
        }catch(error){
            console.log("errro creating user", error.message);
        }
    }

    return userRef;
}

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach((object)=>{
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,object);
    });

    return await batch.commit();
}

export const convertCollectionSnapshotToMap = collections => {
    const transformedCollections = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
    });
    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;