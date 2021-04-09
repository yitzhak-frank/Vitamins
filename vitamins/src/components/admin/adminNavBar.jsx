import { NavLink } from "react-router-dom";
import useWindowSize from '../../hooks/screenSize';

const AdminNavBar = ({currentTable, fn: {setSortBy, setOrderBy, showAll, showPages}}) => {

    const { width } = useWindowSize()

    return(
        <>
        <div className="nav-space" style={{height: width > 767 ? '10px' : '90px'}}></div>
        <div className="w-100 admin-nav-container bg-secondary d-flex justify-content-between align-items-center shadow">
            <div className={
                "p-1 pr-2 d-block d-md-flex float-right justify-content-start align-items-center text-right"
            } id="admin-nav">
                <NavLink 
                    to="/admin/prods" 
                    className="nav-link" 
                    style={{'color': currentTable === 'prods' && 'white'}}
                >מוצרים</NavLink>
                <NavLink 
                    to="/admin/users" 
                    className="nav-link"
                    style={{'color': currentTable === 'users' && 'white'}}
                >משתמשים</NavLink>
                <div className="nav-link">הזמנות</div>
            </div>
            <div className="sort-select d-block d-md-flex ml-4 text-left">
                <select onChange={({target: {value}}) => value === '0'? showAll() : showPages(value)} className="d-block mr-3">
                    <option value="10">חלק לעמודים</option>
                    <option value="0">הצג הכל</option>
                </select>
                <select onChange={({target: {value}}) => setSortBy(value)} id="sortBy" className="d-block my-3 mr-3">
                    <option value="_id">מיין לפי</option>
                    <option value="name">שם</option>
                    <option value="date_created">תאריך</option>
                    {currentTable === 'prods' && <option value="price">מחיר</option>}
                    {currentTable === 'users' && <option value="email">אימייל</option>}
                </select>
                <select onChange={({target: {value}}) => setOrderBy(value)} id="orderBy" className="d-block mr-3">
                    <option value="1">סדר עולה</option>
                    <option value="-1">סדר יורד</option>
                </select>
            </div>
        </div>
        </>
    )
}

export default AdminNavBar;