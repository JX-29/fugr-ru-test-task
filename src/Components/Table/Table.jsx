import React from "react";
import './Table.scss'


function Table({usersInfo, onFieldClick, sortField, sortAscending, onRowClick}) {
    return (

            <table className="table">
                <thead>
                <tr className='arrow'>
                    <th scope="col" onClick={() => onFieldClick('id')} className={
                        //если тип поля соответствует выбранному и сортировка выполнена по возрастанию - стрелка вверх, иначе она будет перевернута
                        sortField === 'id' && sortAscending ? 'sorted-by' : ''}>id </th>
                    <th scope="col" onClick={() => onFieldClick('firstName')} className={sortField === 'firstName' && sortAscending ? 'sorted-by' : ''}>firstName </th>
                    <th scope="col" onClick={() => onFieldClick('lastName')} className={sortField === 'lastName' && sortAscending ? 'sorted-by' : ''}>lastName </th>
                    <th scope="col" onClick={() => onFieldClick('email')} className={sortField === 'email' && sortAscending ? 'sorted-by' : ''}>email </th>
                    <th scope="col" onClick={() => onFieldClick('phone')} className={sortField === 'phone' && sortAscending ? 'sorted-by' : ''}>phone </th>
                </tr>
                </thead>
                <tbody>


                {//проверка на наполнение массива и генерация записей
                    usersInfo !== undefined && usersInfo.map(user => <tr onClick = {() => onRowClick(user.id)} key={`${user.id}_${user.email}`} className="table__field"
                >
                    <th scope="row">{user.id}</th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                </tr>)}
                </tbody>
            </table>

    )
}

export default Table