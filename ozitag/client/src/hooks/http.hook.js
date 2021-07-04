import { useCallback, useState } from "react";
// server API
export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setLoading(true);
      try {
        // stringify body
        if (body) {
          body = JSON.stringify(body);
          headers["Content-Type"] = "application/json";
        }

        //response server
        const response = await fetch(url, { method, body, headers });
        // json format data
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Response error");
        }

        setLoading(false);

        return data;
      } catch (e) {
        console.log("e-mas", e.message);
        setLoading(false);
        setError(e.message);

        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
