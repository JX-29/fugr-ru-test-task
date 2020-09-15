import React from "react";
import './SearchForm.scss'


function SearchForm({onSearch}) {

    const [value, setValue] = React.useState('')

    function valueChange(event) {
        setValue(event.target.value)
    }


    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <button className="btn btn-outline-primary"
                        onClick={() => onSearch(value)}
                        type="button" id="button-addon1">Найти
                </button>
            </div>
            <input type="text" className="form-control"
                   value={value}
                   onChange={valueChange}
                   placeholder=""
                   aria-label="Example text with button addon" aria-describedby="button-addon1"
            />
        </div>
    )
}

export default SearchForm