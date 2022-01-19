import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(response => {
                    if (!response.ok){
                        // npx json-server --watch data/db.json --port 8000 to start db
                        throw Error('Could not fetch data from server...');
                    }
                    return response.json();
                })
                .then(data => {
                    setData(data);
                    setIsLoading(false);
                    setError(null);
                })
                .catch(err => {
                    if(err.name === 'AbortError'){
                        console.log(err.name);
                    } else {
                        setIsLoading(false);
                        setError(err.message);
                    }
                })
        }, 2000);
        return () => abortCont.abort();

    }, [url])

    return {data, isLoading, error}
};

export default useFetch;