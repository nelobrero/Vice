import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    onSnapshot,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const APPLICATION_COLLECTION = "applications";

export const STATUS = {
    ONGOING: "Ongoing",
    REJECTED: "Rejected",
    HIRED: "Hired",
};

//add job applied by user
export async function addApplication(userId, { company, position, dateApplied, salary }) {
    return addDoc(collection(db, APPLICATION_COLLECTION), {
        userId,
        company,
        position,
        dateApplied,
        salary: salary || null,
        status: STATUS.ONGOING,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
};

//edit/update application
export async function updateApplication(applicationId, changes) {
    const ref = doc(db, APPLICATION_COLLECTION, applicationId);
    return updateDoc(ref, {
        ...changes,
        updatedAt: serverTimestamp(),
    });
}

//delete application
export async function deleteApplication(applicationId) {
    const ref = doc(db, APPLICATION_COLLECTION, applicationId);
    return deleteDoc(ref);
}


//
export function subscribeToApplications(userId, onCChange) {
    const q = query(collection(db, APPLICATION_COLLECTION), where("userId", "==", userId));
    return onSnapshot(q, snapshot => {
        const apps = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
        }));
        onCChange(apps);
    });
}
