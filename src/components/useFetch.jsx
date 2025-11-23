import { useState, useEffect } from "react";

const useFetch = (url, delay = 0) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        if (delay) await new Promise(res => setTimeout(res, delay));

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, delay]);

  return { data, loading, error };
};

export default useFetch;