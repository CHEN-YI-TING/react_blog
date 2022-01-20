import { useState, useEffect } from "react";
const useFetch = (url) => {
  const [data, setData] = useState(null);
  //加載狀態為true
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        //check error
        if (!res.ok) {
          throw Error("could not fetch data");
        }
        return res.json();
      })
      .then((data) => {
        //ARRAY OF DATA
        setData(data);
        //如果資料加載完成，就將loading狀態改成false
        setError("");
        setIsPending(false);
      })
      .catch((err) => {
        //console.log(err.message);
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setData(null);
          setError(err.message);
        }
      });
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
