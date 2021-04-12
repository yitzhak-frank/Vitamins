import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import Pagination from "./pagination";
import UsersTable from "./usersTable/usersTable";
import AdminNavBar from "./adminNavBar";
import ProductsTable from "./productsTable/productsTable";
import InquiriesTable from "./inquiriesTable/inquiriesTable";
import { toast } from "react-toastify";
import { checkParentsClass } from "../../services/generalFn";
import { useState, useEffect } from "react";
import { deleteItem, getCount, getSearchCount, getTableData, searchItems } from "../../services/adminService";

const AdminApp = ({table}) => {

    const searchOptions = {
        prods: [
            {value: 'name', label: 'שם מוצר'},
            {value: 'description', label: 'תיאור'},
            {value: 'price', label: 'מחיר'},
            {value: 'more_info', label: 'מידע נוסף'}
        ],
        users: [
            {value: 'name', label: 'שם משתמש'},
            {value: 'email', label: 'כתובת מייל'},
            {value: 'role', label: 'סיווג'}
        ],
        inquiries: [
            {value: 'name', label: 'שם לקוח'},
            {value: 'email', label: 'כתובת מייל'},
            {value: 'msg', label: 'פנייה'},
            {value: 'status', label: 'סטטוס'},
            {value: 'comments', label: 'הערות'}
        ]
    }

    const[currentTable, setCurrentTable] = useState(table);
    const[tableData,    setTableData]    = useState({});
    const[currentPage,  setCurrentPage]  = useState(0);
    const[sortBy,       setSortBy]       = useState('_id');
    const[orderBy,      setOrderBy]      = useState(-1);
    const[itemsCount,   setItemsCount]   = useState(0);
    const[pagesCount,   setPagesCount]   = useState([]);
    const[amontToShow,  setAmontToShow]  = useState(10);
    const[reRender,     setReRender]     = useState(false);
    const[searchValue,  setSearchValue]  = useState('');
    const[searchFields, setSearchFields] = useState('');
    const[selectValue,  setSelectValue]  = useState(searchOptions[currentTable][0])
    const[loading,      setLoading]      = useState(false);
    const[showAllIndex, setShowAllIndex] = useState(false);
    const[addItemIndex, setAddItemIndex] = useState(false);
    const[itemToEdit,   setItemToEdit]   = useState(null);

    useEffect(() => {
        let data, count, pages = [];
        (async () => {
            setLoading(true);
            if(!searchValue || !searchFields) {
                data  = await getTableData(currentTable, sortBy, orderBy, currentPage * 10, amontToShow);
                count = await getCount(currentTable);
            } else {
                data  = await searchItems(currentTable, sortBy, orderBy, currentPage * 10, amontToShow, searchValue, searchFields);
                count = await getSearchCount(currentTable, searchValue, searchFields);
            }
            setLoading(false);
            showAllIndex && setAmontToShow(count);
            let pagesCount = !showAllIndex ? Math.ceil(count / amontToShow): 1;
            for(let i = 1; i <= pagesCount; i++) pages.push(i);
            setTableData({[currentTable]: data});
            setItemsCount(count);
            setPagesCount(pages);
        })();
    }, [currentTable, sortBy, orderBy, currentPage, amontToShow, showAllIndex, reRender, searchValue, searchFields]);

    useEffect(() => {
        setCurrentTable(table);
        setCurrentPage(0);
    }, [table]);

    useEffect(() => setCurrentPage(0), [searchValue, searchFields]);

    useEffect(() => setSelectValue(searchOptions[currentTable][0]), [currentTable])

    const showAll = () => {
        setPagesCount([]);
        setCurrentPage(0);
        setShowAllIndex(index => !index);
        setAmontToShow(itemsCount);
    }

    const showPages = (value) => {
        setShowAllIndex(index => !index);
        setAmontToShow(value);
    }

    const handleDeleteItem = async (itemId) => {
        let item = currentTable === 'users' ? 'משתמש' : 'prods' ? 'פנייה' : 'מוצר' ;
        if(!window.confirm(`האם אתה בטוח שאתה רוצה למחוק את ה${item}?`)) return;
        try {
            await deleteItem(currentTable, itemId);
            setReRender(val => !val);
            toast(`ה${item} ${currentTable === 'inquiries' ? 'נמחקה' : 'נמחק'} בהצלחה`);
        } catch(err) { toast.error('משהו השתבש נסה שוב מאוחר יותר') };
    }

    const handleCloseForm = ({target: element}) => {
        if(checkParentsClass(element, 'form')) return;
        if(addItemIndex) setAddItemIndex(false);
        else if(itemToEdit) setItemToEdit(null);
    }

    return (
        <div style={{paddingBottom: '125px'}} className="admin-app">
            <AdminNavBar
                fn={{setSortBy, setOrderBy, setSearchFields, showAll, showPages}}
                currentTable={currentTable}
            />

            <div className="admin-tables-head d-flex justify-content-between" style={{flexBasis: 3}}>
                <h6 className="pages-text text-right">
                    עמוד <span className="text-info">{currentPage + 1}</span> {' '}
                    מתוך <span className="text-info">{pagesCount.length}</span>
                </h6>
                <form 
                    className="form-inline d-flex justify-content-center md-form form-sm active-pink active-pink-2 mt-5 search-admin"
                    style={{flexGrow: 2}}
                >
                    <i className="fas fa-search mb-3" aria-hidden="true"></i>
                    <input id="search" className="form-control form-control-sm w-75" type="text" placeholder="חפש"
                        aria-label="Search" onChange={({target: {value}}) => setSearchValue(value)}/>
                </form>
            </div>
            <Select 
                closeMenuOnSelect={false}
                components={makeAnimated()}
                options={searchOptions[currentTable]} 
                className="mb-3 mx-2 mx-sm-3 mx-md-4 mx-xl-5"
                isMulti
                value={selectValue}
                placeholder="חפש ב..."
                onChange={(options) => {
                    setSearchFields(String(options.map(option => option.value)));
                    setSelectValue(options);
                }}
            />

            <div className="table-container">
                {currentTable === 'prods' && tableData[currentTable] ? <ProductsTable 
                    tableData={tableData[currentTable]} 
                    currentPage={currentPage}
                    itemToEdit={itemToEdit}
                    addItemIndex={addItemIndex}
                    fn={{reRender: setReRender, handleDeleteItem, handleCloseForm, setAddItemIndex, setItemToEdit}}
                />: 
                currentTable === 'users' && tableData[currentTable] ? <UsersTable
                    tableData={tableData[currentTable]} 
                    currentPage={currentPage}
                    itemToEdit={itemToEdit}
                    addItemIndex={addItemIndex}
                    fn={{reRender: setReRender, handleDeleteItem, handleCloseForm, setAddItemIndex, setItemToEdit}}
                />:
                currentTable === 'inquiries' && tableData[currentTable] ? <InquiriesTable
                    tableData={tableData[currentTable]} 
                    currentPage={currentPage}
                    fn={{handleDeleteItem}}
                />
                : ''}
            </div>

            {pagesCount.length > 1 && <Pagination 
                pagesCount={pagesCount} 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
            />}

            {loading && 
                <div id="loading" className="d-flex align-items-center justify-content-center">
                    <i className="fas fa-spinner fa-spin m-3" ></i>
                    <h2>טוען...</h2>
                </div>
            }
        </div>
    );
}

export default AdminApp;