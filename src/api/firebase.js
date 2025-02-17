import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { getDatabase, ref, get, set, child, remove } from "firebase/database";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "shoppy2-d6520.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: "shoppy2-d6520",
  storageBucket: "shoppy2-d6520.appspot.com",
  messagingSenderId: "147263006183",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-4LL9ZMCFRP",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getDatabase();
const dbRef = ref(db);
console.log(app);

const auth = getAuth();

export async function login() {
  return signInWithPopup(auth, provider);
}

export async function logout() {
  return signOut(auth);
}

export function onUserChanged(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updateAdmin = user ? await adminUser(user) : null;
    callback(updateAdmin);
  });
}

async function adminUser(user) {
  try {
    return get(child(dbRef, "admins")).then((snapshot) => {
      if (snapshot.exists()) {
        const admin = snapshot.val();
        const isAdmin = admin.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
  } catch (error) {
    console.log(error);
  }
}

export async function addNewProduct(product, image) {
  const id = uuidv4();
  const productRef = ref(db, `products/${id}`);

  return set(productRef, {
    ...product,
    id,
    price: parseInt(product.price, 10),
    image: image.url,
    options: product.options.split(","),
  }).then(() => console.log("success"));
}

export async function getProducts() {
  return get(child(dbRef, "products")).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  });
}

export async function getCart(userId) {
  return get(child(dbRef, `carts/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const items = snapshot.val() || {};
      return Object.values(items);
    }
    return [];
  });
}

export async function addOrUpdateCart(userId, product) {
  return set(child(dbRef, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(child(dbRef, `carts//${userId}/${productId}`));
}
