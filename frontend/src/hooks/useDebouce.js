import  { useEffect, useState } from "react";

function useDebouce(query, delay = 300) {
  const [result, setResult] = useState("");
  useEffect(() => {
    let timer = setTimeout(() => setResult(query), delay);
    return () => clearTimeout(timer);
  }, [query, delay]);

  return result;
}

export default useDebouce;
