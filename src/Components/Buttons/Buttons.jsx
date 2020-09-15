import React from "react";

import './Buttons.scss'


function Buttons({onButtonSelectData, onButtonToggleForm, dataSelected}) {

    const smallData = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

    const bigData = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'

    return(
        <div className='buttons'>

            <button onClick={() => onButtonSelectData(smallData)} className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Загрузить малый объем данных
            </button>
            <button onClick={() => onButtonSelectData(bigData)} className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Загрузить большой объем данных
            </button>
            {dataSelected && <button onClick={() => onButtonToggleForm("searchFormVisible", "addFormVisible")}
                                     className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample"
                                     aria-expanded="false" aria-controls="collapseExample">
                Найти пользователя
            </button>}
            {dataSelected && <button onClick={() => onButtonToggleForm('addFormVisible', 'searchFormVisible')} className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample"
                                     aria-expanded="false" aria-controls="collapseExample">
                Добавить нового пользователя
            </button>}
        </div>
    )
}

export default Buttons