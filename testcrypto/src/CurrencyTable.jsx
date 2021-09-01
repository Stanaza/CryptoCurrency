import React from 'react';
import {Table} from "react-bootstrap";


const CurrencyTable = ({items, logos, searchValue}) => {

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()),);

    const lasUpdated = (date) => {
        const formatDate = new Date(date)
        return  (`${formatDate.getHours()}:${formatDate.getMinutes()}:${formatDate.getSeconds()}`)
    }

    return (
        <Table striped bordered hover variant="dark" responsive>
            <thead>
            <tr>
                <th>Name</th>
                <th>Symbol</th>
                <th>Logo</th>
                <th>Last price</th>
                <th>1h change</th>
                <th>24h change</th>
                <th>Market Cap</th>
                <th>Data update time</th>
            </tr>
            </thead>
            <tbody>
            {
                filteredItems.map((item, index) =>
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.symbol}</td>
                        <td><img src={logos[index]} width="30" height="30" alt={item.name}/></td>
                        <td>{item.quote.USD.price} $</td>
                        <td>{item.quote.USD.percent_change_1h}</td>
                        <td>{item.quote.USD.percent_change_24h}</td>
                        <td>{item.quote.USD.market_cap} $</td>
                        <td>{lasUpdated(item.last_updated)}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

export default CurrencyTable;
