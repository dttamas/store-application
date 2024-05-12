import { initializeApp } from 'firebase/app';
import {
    getAuth,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    NextOrObserver,
    User
} from 'firebase/auth'
import { getFirebaseConfig } from "../config/config";
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import {CartItem} from "../context/cart-context";

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);
const db = getFirestore(app);

export async function signInUser(email: string, password: string) {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth ,email, password);
}

export function userStateListener(callback:NextOrObserver<User>) {
    return onAuthStateChanged(auth ,callback);
}

export async function signOutUser() { await signOut(auth); }

export function signUpUser(email: string, password: string) {
    if (!email || !password) return;

    return createUserWithEmailAndPassword(auth ,email, password)
        .then(function (userCredential) {
            const userRef = doc(db, 'users', userCredential.user.uid);
            return setDoc(userRef,
               {
                   email: email,
                   uid: userCredential.user.uid,
               }).then(() => {
                console.log('Successful signing up');
                return userCredential;
               });
        })
        .catch(error => {
            console.log('Failed to sign up:', error);
            throw error;
        });
}

export async function purchaseItems(userId: string, items: CartItem[], totalPrice: number){
    if (!items || !items.length) return;

    try {
        const userPurchaseRef = collection(db, 'users', userId, 'purchases');
        await addDoc(userPurchaseRef, {
            items: items,
            totalPrice: totalPrice,
            purchasedAt: Date.now(),
        });
        console.log('Successful purchase.');
    } catch (e){
        console.log('Error during purchasing items', e);
    }
}
