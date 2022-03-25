import { useState, useEffect } from "react";
import { financeAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);
    try {
      const res = await financeAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res.user);

      if (!res) {
        throw new Error("Could not signup");
      }

      await res.user.updateProfile({ displayName });

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isClosed) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isClosed) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => setIsClosed(true);
  }, []);

  return { error, isPending, signup };
};
