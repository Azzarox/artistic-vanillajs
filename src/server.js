import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    query,
    where,
    orderBy,
    updateDoc,
    setDoc,
    limit,
} from 'firebase/firestore';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCBZfxiT7dWl4MqD-dsnWsvoybr-_Dy9jI',
    authDomain: 'fir-project-39721.firebaseapp.com',
    projectId: 'fir-project-39721',
    storageBucket: 'fir-project-39721.appspot.com',
    messagingSenderId: '933280011115',
    appId: '1:933280011115:web:6dead0afb0324308be722e',
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export function getCollectionReference(collectionName) {
    const colRef = collection(db, collectionName);
    return colRef;
}

export const getData = async (collectionReference) => {
    const results = await getDocs(collectionReference);
    let photos = [];
    results.docs.forEach((photo) =>
        photos.push({
            id: photo.id,
            ...photo.data({ serverTimestamps: 'estimate' }),
            // NOTE: used in the comments page (serverTimestamp)
            // Addig the serverTimestamps: estimate because it needs time to load the timestamp
            // and it is null during that time which is making the application stop

        })
    );
    return photos;
};

export const getByQuery = async (
    collectionReference,
    propertyToLookFor,
    condition,
    conditionValue
) => {
    const q = query(
        collectionReference,
        where(propertyToLookFor, condition, conditionValue)
    );
    return await getData(q);
};

export const getByOrderedQuery = async (
    collectionReference,
    propertyToLookFor,
    condition,
    conditionValue,
    propertyToLookForOrdering,
    fieldCondition = 'asc'
) => {
    const q = query(
        collectionReference,
        where(propertyToLookFor, condition, conditionValue),
        orderBy(propertyToLookForOrdering, fieldCondition)
    );
    return await getData(q);
};

export const getByLimitedOrderQuery = async (
    collectionReference,
    propertyToLookFor,
    condition,
    conditionValue,
    propertyToLookForOrdering,
    fieldCondition = 'asc',
    limitNumber
) => {
    const q = query(
        collectionReference,
        where(propertyToLookFor, condition, conditionValue),
        orderBy(propertyToLookForOrdering, fieldCondition),
        limit(limitNumber)
    );
    return await getData(q);
};

export const postData = async (collectionReference, data) => {
    try {
        await addDoc(collectionReference, data);
        // return alert('Successfuly created');
    } catch (err) {
        return alert('You must have an account to create!');
    }
};

export const deleteData = async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    try {
        await deleteDoc(docRef);
    } catch (err) {
        return alert('You must be creator of the article to Update or Delete!');
    }
};

export const getSingleDoc = async (collectionName, id) => {
    const docRef = doc(db, collectionName, id);
    const result = await getDoc(docRef);
    return { ...result.data(), id: result.id };
};

export const setSingleDoc = async (collectionName, field, data) => {
    const docData = await setDoc(doc(db, collectionName, field), data);
    return docData;
};

export const updateSingleDoc = async (collectionName, id, data) => {
    const docRef = doc(db, collectionName, id);
    try {
        const updatedDocument = await updateDoc(docRef, data);
        return updatedDocument;
    } catch (err) {
        return alert('You must be creator of the article to Update or Delete!');
    }
};

export const createUser = async (email, password) => {
    const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );
    return credentials.user;
};

export const logInUser = async (email, password) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
};

export const logOutUser = async () => {
    signOut(auth);
    // return alert('Signed Out');
};

//NOTE: Making to promise so it returns the user to use it inside the navigation
export const checkAuthState = async () => {
    return new Promise(function (resolve, reject) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                return resolve(user);
            } else {
                return resolve(null);
            }
        });
    });
};

//Checking to show the user;
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         console.log(user);
//     } else {
//         console.log(null);
//     }
// });
