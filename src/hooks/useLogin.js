import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { financeAuth } from "../firebase/config";

export const useLogin = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await financeAuth.signInWithEmailAndPassword(email, password);

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isClosed) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isClosed) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsClosed(true);
  }, []);

  return { login, error, isPending };
};
