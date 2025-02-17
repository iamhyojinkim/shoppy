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
  apiKey: "AIzaSyAukRwfHDyfMEYAArh7HdlWlQ_0T9YLNqM",
  authDomain: "shoppy2-d6520.firebaseapp.com",
  databaseURL: "https://shoppy2-d6520-default-rtdb.firebaseio.com",
  projectId: "shoppy2-d6520",
  storageBucket: "shoppy2-d6520.appspot.com",
  messagingSenderId: "147263006183",
  appId: "1:147263006183:web:f7b529b198be03f5fa0942",
  measurementId: "G-4LL9ZMCFRP",
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const db = getDatabase();
const dbRef = ref(db);

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
