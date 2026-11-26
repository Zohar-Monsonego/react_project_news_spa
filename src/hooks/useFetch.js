// Step 2: a custom hook that gets JSON from any url.
// It knows nothing about news - you can use it again in every project.

import { useState, useEffect } from "react";

/**
 * @param {string} url - the address to fetch
 * @returns {{ data: any, loading: boolean }}
 *   data    - the JSON that the url returned (null until it arrives)
 *   loading - true while waiting for the answer
 */

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      if (localStorage.getItem(url)) {
        setData(JSON.parse(localStorage.getItem(url)));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw Error("error while trying fetching the data");
        }

        const fetched_data = await response.json();
        setData(fetched_data);
        localStorage.setItem(url, JSON.stringify(fetched_data));
      } catch (e) {
        console.error(e, "error while fetching the data from the API");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  return { data: data, loading: loading };
}
