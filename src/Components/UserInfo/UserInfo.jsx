import React from "react";
import './UserInfo.scss'

function UserInfo({selectedUser}) {

    const {address, description, firstName, lastName} = selectedUser
    const {city, state, streetAddress, zip} = address


    return(
        <ul className="list-group ">
            <li className="list-group-item active" aria-disabled="true">Выбран пользователь <b>{`${firstName} ${lastName}`}</b></li>
            <li className="list-group-item border-bottom-0 border-top-0">Описание: </li>
            <li className="list-group-item">
                <textarea>{description}</textarea></li>
            <li className="list-group-item">Адрес проживания: <b>{streetAddress}</b></li>
            <li className="list-group-item">Город: <b>{city}</b></li>
            <li className="list-group-item">Провинция/штат: <b>{state}</b></li>
            <li className="list-group-item">Индекс: <b>{zip}</b></li>
        </ul>
    )
}

export default UserInfo