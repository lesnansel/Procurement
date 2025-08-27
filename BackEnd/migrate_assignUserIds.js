const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, updateDoc, doc } = require("firebase/firestore");

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  // ...your firebase config here...
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const generateUniqueUserId = async (existingIds) => {
  let isUnique = false;
  let userId = "";
  while (!isUnique) {
    userId = Math.floor(100000 + Math.random() * 900000).toString();
    if (!existingIds.includes(userId)) {
      isUnique = true;
    }
  }
  return userId;
};

const assignMissingUserIds = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  const existingIds = snapshot.docs
    .map(docSnap => docSnap.data().userId)
    .filter(id => id);

  for (const userDoc of snapshot.docs) {
    const data = userDoc.data();
    if (!data.userId) {
      const newId = await generateUniqueUserId(existingIds);
      existingIds.push(newId);
      await updateDoc(doc(db, "users", userDoc.id), { userId: newId });
      console.log(`Assigned ${newId} to ${data.email}`);
    }
  }
  console.log("✅ Missing user IDs assigned successfully!");
};

assignMissingUserIds();
