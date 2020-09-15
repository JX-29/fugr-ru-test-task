import React, {Component} from 'react';
import ReactPaginate from 'react-paginate'
import './App.scss'
import Spinner from "../Spinner";
import Table from "../Table";
import UserInfo from "../UserInfo";
import Buttons from "../Buttons";
import SearchForm from "../SearchForm";
import AddForm from "../AddForm";

class App extends Component {

    state = {
        dataSelected: false, //блокирует отображение кнопок поиска и добавления записей, пока не выбран загружаемый объем данных
        isLoading: true, //отвечает за получение данных с сервера, пока true - идет загрузка
        data: [], //массив, отображаемый в качестве таблицы. Изначально не загружен
        pageLength: 50, //количество записей на одной странице при использовании пагинации
        currentPage: 0, //страница, на которой сейчас находится пользователь
        totalPages: 20, //общее количество страниц
        searchField: '', //поле, по которому сейчас производится поиск
        sortAscending: false, //тип сортировки. По умолчанию сортировки нет. После первого клика переключается на true, что значит сортировку по возрастанию, при повторном клике переключается на false, что значит сортировку по убыванию
        sortField: '', //поле, по которому сортировка происходит
        currentUser: null, //запись, отображаемая в нижнем окне. Не существует, пока не выберем человека из таблицы
        addFormVisible: false, //отвечает за отображение формы добавления новой записи
        searchFormVisible: false //отвечает за отображение формы поиска записи
    }

    //когда страница загрузилась, начинаем запрос данных с сервера и заносим их в state
    async loadData(url) {
        const response = await fetch(url)
        const data = await response.json()
        this.setState({
            dataSelected: true,
            isLoading: false,
            data: data
        })
    };

    //загрузка выбранного объема данных
    dataSelect = (url) => {
        this.setState({
            dataSelected: false,
            isLoading: true,
            addFormVisible: false,
            searchFormVisible: false
        })
        this.loadData(url)
    }

    //функция сортировки
    sortBy = (field) => {
        //если было выбрано поле с сортировкой по убыванию - начинает сортировку по возрастранию
        if (!this.state.sortAscending && this.state.sortField === field) {
            const sortedArr = this.state.data.sort((a, b) => a[field] > b[field] ? 1 : -1)
            this.setState({
                data: sortedArr,
                sortAscending: true,
                sortField: field
            })
            //если было выбрано поле с сортировкой по возрастанию - начинает сортировку по убыванию
        } else if (this.state.sortAscending && this.state.sortField === field) {
            const sortedArr = this.state.data.sort((a, b) => a[field] < b[field] ? 1 : -1)
            this.setState({
                data: sortedArr,
                sortAscending: false,
            })
            //условие которое выполняет сортировку в первый раз, либо если было выбрано другое поле
        } else {
            const sortedArr = this.state.data.sort((a, b) => a[field] > b[field] ? 1 : -1)
            this.setState({
                data: sortedArr,
                sortAscending: true,
                sortField: field
            })
        }
    }


    userSelection = (id) => {
        const selectedUser = this.state.data.filter(user => user.id === id)
        //у добавленных с помощью формы записей нет адреса, так как форма ввода адреса не предусмотрена тестовым заданием. Если пользователь кликнет по добавленной строке - выведется ошибка
        if ( selectedUser[0].address) {
            this.setState({
                //передаем единственный объект из массива, так как запись с таким id только 1
                currentUser: selectedUser[0],
            })
        } else {
            alert('У нас нет данных об этом пользователе')
            this.setState({
                currentUser: null,
            })
        }
    }

    //при нажатии на кнопки появляется нужная форма ,первым аргументом идет форма, которую надо показать, вторым - которую спрятать
    toggleForm = (formToShow, formToHide) => {
        this.setState({
            [formToShow]: true,
            [formToHide]: false
        })
    }

    //функция нарезки страниц. Делит массив на несколько массивов с 50 записями
    pagesCut = (onePageArr, pageLength) => {
        let array = onePageArr; //изначальная страница с записями
        let size = pageLength; //количество записей на одной странице
        let pagesArr = []; //массив со страницами
        for (let i = 0; i <Math.ceil(array.length/size); i++){
            pagesArr[i] = array.slice((i*size), (i*size) + size);
        }
        return pagesArr[this.state.currentPage]

    }

    //сравнение значения поля поиска со значениями массива. Возвращает массив значений, полностью соответствующий поиску
    searchProc = (searchInfo) => {
        if (!searchInfo) {
            return this.state.data
        } else {
            return this.state.data.filter(user =>
            {
                return user['firstName'].toLocaleLowerCase().includes(searchInfo.toLocaleLowerCase()) ||
                    user['lastName'].toLocaleLowerCase().includes(searchInfo.toLocaleLowerCase()) ||
                    user['phone'].toLocaleLowerCase().includes(searchInfo.toLocaleLowerCase()) ||
                    user['email'].toLocaleLowerCase().includes(searchInfo.toLocaleLowerCase()) ||
                    user['id'].toString().toLocaleLowerCase().includes(searchInfo.toLocaleLowerCase())
            })

        }
    }
    //получает номер страницы из пагинатора и переходит на нее
    handlePageClick = ({selected}) => {
        this.setState({currentPage: selected})
    }

    findRecord = (search) => {
        this.setState({
            searchField: search
        })
    }

    createNewUser = (newUser) => {
        //если был введен id, который есть в таблице - выводится ошибка
        if (this.state.data.filter(user => user.id == newUser.id).length === 0) {
            this.setState(({data}) => {
                const newArr = [newUser, ...data]
                return {
                    data: newArr,
                    //после нажатия пользователь возвращается на первую страницу чтобы увидеть результат
                    currentPage: 0
                }
            })
        } else {
            alert(`Пользователь с такими данными уже существует. Пожалуйста, введите другой id`)
        }
    }

    render() {

        const {isLoading, data, sortField, sortAscending, currentUser, addFormVisible, searchFormVisible, dataSelected, pageLength, searchField, totalPages} = this.state

        //обработанные данные. в searchProc передается значение строки поиска, по ней фильтруется полученный с сервера массив данных. Далее pagesCut получает размер страницы при нарезке и отфильтрованный массив, после чего делит его на необходимое количество страниц указанного размера
        const processedData = this.pagesCut(this.searchProc(searchField), pageLength);

        return (
            <div className="App">
                <div className='container'>
                    <Buttons onButtonSelectData = {(url) => this.dataSelect(url)} onButtonToggleForm = {(formToShow, formToHide) => this.toggleForm(formToShow, formToHide)} dataSelected={dataSelected}/>
                    {//форма появляется после нажатия на кнопку "добавить нового пользователя"
                        addFormVisible && <AddForm onAdd = {(user) => this.createNewUser(user)}/>}
                    {searchFormVisible && <SearchForm onSearch = {(search) => this.findRecord(search)}/>}
                    {//таблица демонстрирует процесс загрузки, пока пользователь не выберет объем загружаемых данных и пока с сервера не придут данные. Когда данные получены - отображается таблица
                    isLoading ? <Spinner/> :
                    <Table
                        addFormVisible = {addFormVisible}
                        onFieldClick = {this.sortBy}
                        usersInfo = {processedData}
                        sortField={sortField}
                        sortAscending={sortAscending}
                        onRowClick = {this.userSelection}/>
                    }
                    {data.length > pageLength && <ReactPaginate
                        previousLabel={'<<'}
                        nextLabel={'>>'}
                        breakLabel={'...'}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link '}
                        activeClassName={'active'}
                        previousClassName={'page-item'}
                        nextClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextLinkClassName={'page-link'}
                        breakClassName ={'page-item'}
                        breakLinkClassName ={'page-link'}
                    />}
                    {//этот компонент появится только если пользователь из списка был выбран
                        currentUser && <UserInfo selectedUser = {currentUser} />}
                </div>
            </div>
        );
    }
}

export default App;
