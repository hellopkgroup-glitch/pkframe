import { db, storage } from "../firebaseConfig";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/* ==========================
   SAVE TEMPLATE
========================== */

export async function saveTemplate(backgroundFile, config) {

    let imageUrl = config.backgroundImage || "";

    if (backgroundFile) {

        const storageRef = ref(
            storage,
            "templates/background.png"
        );

        await uploadBytes(storageRef, backgroundFile);

        imageUrl = await getDownloadURL(storageRef);

    }

    await setDoc(
        doc(db, "templates", "poster1"),
        {
            backgroundImage: imageUrl,

            photoX: Number(config.photoX),
            photoY: Number(config.photoY),
            photoWidth: Number(config.photoWidth),
            photoHeight: Number(config.photoHeight),

            textX: Number(config.textX),
            textY: Number(config.textY),

            fontSize: Number(config.fontSize),

            textColor: config.textColor,
        },
        {
            merge: true,
        }
    );

}

/* ==========================
   GET TEMPLATE
========================== */

export async function getTemplate() {

    const docRef = doc(
        db,
        "templates",
        "poster1"
    );

    const snap = await getDoc(docRef);

    if (snap.exists()) {

        return snap.data();

    }

    return null;

}