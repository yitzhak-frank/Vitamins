import { NavLink } from "react-router-dom";

const AdminNavBar = ({currentTable, fn: {setSortBy, setOrderBy, showAll, showPages}}) => {
    return(
        <div className="w-100 admin-nav-container bg-secondary d-flex justify-content-between align-items-center shadow">
            <div className="p-1 pr-2 float-right justify-content-start align-items-center" id="admin-nav">
                <NavLink 
                    to="/admin/prods" 
                    className="nav-link d-inline-block" 
                    style={{'color': currentTable === 'prods' && 'white'}}
                >מוצרים</NavLink>
                <NavLink 
                    to="/admin/users" 
                    className="nav-link d-inline-block"
                    style={{'color': currentTable === 'users' && 'white'}}
                >משתמשים</NavLink>
                <span className="nav-link d-inline-block">הזמנות</span>
            </div>
            <div className="sort-select ml-4 mr-2">
                <select onChange={({target: {value}}) => value === '0'? showAll() : showPages(value)}>
                    <option value="10">חלק לעמודים</option>
                    <option value="0">הצג הכל</option>
                </select>
                <select onChange={({target: {value}}) => setSortBy(value)} id="sortBy" className="mx-3">
                    <option value="_id">מיין לפי</option>
                    <option value="name">שם</option>
                    <option value="date_created">תאריך</option>
                    {currentTable === 'prods' && <option value="price">מחיר</option>}
                    {currentTable === 'users' && <option value="email">אימייל</option>}
                </select>
                <select onChange={({target: {value}}) => setOrderBy(value)} id="orderBy">
                    <option value="1">סדר עולה</option>
                    <option value="-1">סדר יורד</option>
                </select>
            </div>
        </div>
    )
}

export default AdminNavBar;