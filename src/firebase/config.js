import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  apiKey: "AIzaSyB6AgxZTQUNIY9e9XfwuU-PQvLsQChBc9I",
  authDomain: "garciasburgerecommerce.firebaseapp.com",
  projectId: "garciasburgerecommerce",
  storageBucket: "garciasburgerecommerce.appspot.com",
  messagingSenderId: "426942618898",
  appId: "1:426942618898:web:9369d7ce0ee3ddb7ece7cb",
};

const app = initializeApp(firebaseConfig);

export default function getFirestoreApp() {
  return app;
}
