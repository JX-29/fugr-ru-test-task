import React from "react";
import './AddForm.scss'


class AddForm extends React.Component {

    state = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    }

    changeValue = (fieldValue, e) => {
        this.setState({
        [fieldValue]: e.target.value
        })
    }
    cleanFields = () => {
        this.setState({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        })
    }

    sendData = (user) => {
        const {onAdd} = this.props
        const {id, email, firstName, lastName, phone} = this.state
        //проверяем заполненность полей
        if (id && firstName && lastName && email && phone) {
            onAdd(user)
            //чистим поля
            this.cleanFields()
        } else alert("Заполните все поля ввода")
    }





    render() {
        const {id, email, firstName, lastName, phone} = this.state

        //в функцию передается тип поля, который подставляется и передает значение инпута нужному свойству объекта user


        return (
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">id </th>
                        <th scope="col">firstName </th>
                        <th scope="col">lastName </th>
                        <th scope="col">email </th>
                        <th scope="col">phone </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">
                            <div className="form-group">
                                <input type="number" value={id} onChange={(e) => this.changeValue('id', e)} className="form-control" placeholder=""/>
                            </div></th>
                        <td><input value={firstName} onChange={(e) => this.changeValue('firstName',e)} className="form-control" placeholder=""/></td>
                        <td><input value={lastName} onChange={(e) => this.changeValue('lastName',e)} className="form-control" placeholder=""/></td>
                        <td><input value={email} onChange={(e) => this.changeValue('email',e)} className="form-control" placeholder=""/></td>
                        <td><input value={phone} onChange={(e) => this.changeValue('phone',e)} className="form-control" placeholder=""/></td>
                    </tr>
                    </tbody>
                </table>
                <button className="btn btn-primary" onClick={() => this.sendData(this.state)} type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Добавить в таблицу
                </button>
            </div>
        )
    }


}

export default AddForm