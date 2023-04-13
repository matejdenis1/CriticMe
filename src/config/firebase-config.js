// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries
const api = process.env.REACT_APP_APIKEY;
const domain = process.env.REACT_APP_AUTH_DOMAIN;
const project = process.env.REACT_APP_PROJECT_ID;
const bucket = process.env.REACT_APP_STORAGE_BUCKET;
const sender = process.env.REACT_APP_SENDER_ID;
const appid = process.env.REACT_APP_APP_ID;
const measurementId = process.env.REACT_APP_MEASUREMENTID_ID;

const firebaseConfig = {
  apiKey: api,
  authDomain: domain,
  projectId: project,
  storageBucket: bucket,
  messagingSenderId: parseInt(sender),
  appId: appid,
  measurementId: measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
