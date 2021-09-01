import React, {useEffect, useState} from 'react';
import NavBar from "./NavBar";
import CurrencyTable from "./CurrencyTable";
import axios from "axios";
import InputComponent from "./InputComponent";


const App = () => {
    const [searchValue, setSearchValue] = useState('');
    const [items, setItems] = useState([]);
    const [logos, setLogos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const BASE_CURRENCY = 'USD';

    const fetchData = async () => {
        const API_KEY = '3ca4e907-5003-45f6-89b7-b2b9953aa8c9';
        const LIMIT_ITEMS = '30';
        const sortBy = 'market_cap';
        const order = 'asc';
        try {
            const {data} = await axios.get(`/v1/cryptocurrency/listings/latest?start=1&limit=${LIMIT_ITEMS}&sort=${sortBy}&sort_dir=${order}&convert=${BASE_CURRENCY}`, {
                    headers: {
                        'X-CMC_PRO_API_KEY': API_KEY,
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            )
            const listOfItemsId = data.data.map(item => item.id).join(',')
            const response = await axios.get(`/v1/cryptocurrency/info?id=${listOfItemsId}`, {
                    headers: {
                        'X-CMC_PRO_API_KEY': API_KEY,
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            )
            setLogos(Object.values(response.data.data).reverse().map(item => item.logo))
            setItems(data.data)
            console.log(data.data)
        } catch (e) {
            alert('Data loading error');
            console.error(e);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onChangeSearchInput = (e) => {
        setSearchValue(e.target.value);
    }

    return (
        <>
            <NavBar/>
            <InputComponent searchValue={searchValue} onChangeSearchInput={onChangeSearchInput}/>
            {
                isLoading
                    ? <h1>Loading...</h1>
                    :
                    <CurrencyTable items={items}
                                   logos={logos}
                                   searchValue={searchValue}
                    />
            }
        </>
    );
};

export default App;

