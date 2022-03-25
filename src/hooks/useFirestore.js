import { useReducer, useEffect, useState } from "react";
import { financeFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { document: null, isPending: true, error: null, success: false };
    case "ADDED_DOCUMENT":
      return {
        document: action.payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isClosed, setIsClosed] = useState(false);

  const ref = financeFirestore.collection(collection);

  const dispatchIfNotClosed = (action) => {
    if (!isClosed) {
      dispatch(action);
    }
  };

  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotClosed({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (err) {
      dispatchIfNotClosed({ type: "ERROR", payload: err.message });
    }
  };

  const delDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotClosed({
        type: "DELETED_DOCUMENT",
      });
    } catch (err) {
      dispatchIfNotClosed({ type: "ERROR", payload: "could not delete" });
    }
  };

  useEffect(() => {
    return () => setIsClosed(true);
  }, []);

  return { addDocument, delDocument, response };
};
