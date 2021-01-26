import { auth } from '../firebase';
import { generateUserDocument } from './db';

export async function loginUser(params) {
    let ret;
    await auth.signInWithEmailAndPassword(params.email, params.password).then((cred) => {
        ret = cred.user;
    }).catch((err) => ret = err);
    return ret;
}

export async function logout() {
    await auth.signOut();
}

export async function signUp(email, password, firstName, lastName) {
    let err = null;
    await auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        generateUserDocument(cred.user, firstName, lastName);
    }).catch((error) => err = error );
    return err;
}