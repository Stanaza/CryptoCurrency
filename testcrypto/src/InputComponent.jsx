import React from 'react';
import { FormControl, InputGroup} from "react-bootstrap";

const InputComponent = ({onChangeSearchInput, searchValue}) => {

    return (
        <>
            <InputGroup size="lg">
                <FormControl
                    placeholder="Search Coin Name"
                    aria-label="Search Coin Name"
                    aria-describedby="basic-addon2"
                    value={searchValue}
                    onChange={e => onChangeSearchInput(e)}
                />
            </InputGroup>
        </>
    );
};

export default InputComponent;
