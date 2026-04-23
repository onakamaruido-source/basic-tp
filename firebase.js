
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveScore(score) {
  await addDoc(collection(db, "scores"), {
    score: score,
    createdAt: Date.now()
  });
}

export async function loadRanking() {
  const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(10));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data().score);
}
