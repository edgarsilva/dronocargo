// import axios from 'axios';
import { deliveriesActions } from "./deliveries-slice";
// import shortid from "shortid";

// Utilities
// import axios from 'axios';

// Firebase Imports
import {
  doc,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore/lite";
import { db } from "../services/firebase";

export const fetchDeliveries = (userId) => async (dispatch) => {
  try {
    const q = query(collection(db, "deliveries"), where("status", "==", "ready"));
    const querySnapshot = await getDocs(q);

    const deliveries = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      deliveries.push({
        id: doc.id,
        ...doc.data(),
        createdAt: Date(data.createdAt),
        updatedAt: Date(data.updatedAt),
      });
    });

    dispatch(deliveriesActions.fetchDeliveryItems({
      items: deliveries.map(delivery => ({ ...delivery }))
    }));
  } catch (error) {
    dispatch(deliveriesActions.fetchDeliveryItems({ items: [] }));
  }
};

export const addNewDelivery = (payload) => async (dispatch) => {
  try {
    const docRef = await addDoc(collection(db, "deliveries"), {
      ...payload,
       createdAt: serverTimestamp(),
       updatedAt: serverTimestamp(),
    });

    dispatch(deliveriesActions.addNewDelivery({ id: docRef.id, ...payload, loading: false }));
  } catch (error) {
    dispatch(deliveriesActions.updateDelivery({
    }));
  }
};

export const deleteDelivery = (id) => async (dispatch) => {
  try {
    await deleteDoc(doc(db, "deliveries", id));

    dispatch(deliveriesActions.deleteDelivery({ id }));
  } catch (error) {
    // dispatch(deliveriesActions.updateDelivery({ }));
  }
};

export const commitDelivery = (payload) => async (dispatch) => {
  try {
    dispatch(deliveriesActions.updateDelivery({ id: payload.id, loading: true }));

    const docRef = doc(db, "deliveries", payload.id);
    await updateDoc(docRef, { ...payload, updatedAt: serverTimestamp() });

    dispatch(
      deliveriesActions.updateDelivery({ ...payload, loading: false, saved: true }),
    );
  } catch (error) {
    dispatch(deliveriesActions.updateDelivery({
      id: payload.id,
      loading: false,
      errors: [{ type: "firebase_update", message: "Cannot update" }]
    }));
  }
};