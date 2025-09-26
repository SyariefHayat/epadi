import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBaw3YYzPGHPKr0T2mCZ9iiCB-6tNi8ik4",
    authDomain: "epadi-2dcde.firebaseapp.com",
    projectId: "epadi-2dcde",
    storageBucket: "epadi-2dcde.firebasestorage.app",
    messagingSenderId: "1049830441805",
    appId: "1:1049830441805:web:cca8e8f4b89f635f84ad04",
    measurementId: "G-KG1S197EMB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics }