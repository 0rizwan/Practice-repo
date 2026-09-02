import { useEffect, useState, type ChangeEvent } from 'react';
import styles from './Searchbar.module.css'

type ResultsType = {
    id: number;
    name: string
}

type CacheType = Record<string, ResultsType[]>;

const Searchbar = () => {
    const [input, setInput] = useState("");
    const [results, setResults] = useState<ResultsType[]>([]);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const fetchData = async () => {
        let query = input.trim().toLowerCase();
        const storedCache = sessionStorage.getItem("cacheData");
        const cacheData: CacheType = storedCache ? JSON.parse(storedCache) : {};
        if (cacheData[query]) {
            console.log("CACHE", input)
            setResults(cacheData[query]);
            return;
        }
        console.log("API CALL", input);

        try {
            const response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
            const data: { recipes: ResultsType[] } = await response.json();
            setResults(data.recipes);
            sessionStorage.setItem("cacheData", JSON.stringify({
                ...cacheData,
                [query]: data.recipes
            }));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const timer = setTimeout(fetchData, 500);

        return () => clearTimeout(timer);
    }, [input]);

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Autocomplete search bar</h2>
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Search here..."
                    className={styles.searchInput}
                    value={input}
                    onChange={handleSearch}
                    onFocus={() => setShowResults(true)}
                    onBlur={() => setShowResults(false)}
                />
                {
                    showResults &&
                    <ul className={styles.suggestionContainer}>
                        {
                            input.length > 1 && results.length === 0 ?
                                <li>No data found!</li> :
                                results.map((item) => (
                                    <li
                                        onMouseDown={() => {
                                            setInput(item.name);
                                            setShowResults(false);
                                        }}
                                        className={styles.option}
                                        key={item.id}>
                                        {item.name}
                                    </li>
                                ))
                        }
                    </ul>
                }
            </div>
        </div>
    )
}

export default Searchbar