import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { financeAuth } from "../firebase/config";

export const useLogout = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await financeAuth.signOut();

      dispatch({ type: "LOGOUT" });

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

  return { logout, error, isPending };
};
