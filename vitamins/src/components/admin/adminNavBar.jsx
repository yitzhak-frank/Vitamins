import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import useWindowSize from '../../hooks/screenSize';
import { getNewInquiriesCount } from "../../services/inquiriesService";

const AdminNavBar = ({currentTable, fn: {setSortBy, setOrderBy, showAll, showPages}}) => {

    const[newInquiriesCount, setNewInquiriesCount] = useState(0);

    useEffect(() => getNewInquiriesSum(), []);

    const { width } = useWindowSize();

    const getNewInquiriesSum = async () => {
        let count = await getNewInquiriesCount();
        setNewInquiriesCount(count);
    }

    const styles = {
        count: {position: 'absolute', top: '5px',left: 0,height: '18px',width: '18px',borderRadius: '50%',backgroundColor: 'red', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontFamily: 'italic', fontWeight: '500'}
    }

    return(
        <>
        <div className="nav-space" style={{height: width > 767 ? '10px' : '70px'}}></div>
        <div className="w-100 admin-nav-container bg-secondary d-block d-md-flex justify-content-between align-items-center shadow">
            <div className="overflow-auto pl-2 pl-sm-0" style={{boxShadow: width < 767 && '0 2px 2px gray'}}>
                <div className="p-1 pr-sm-2 d-flex float-right justify-content-start align-items-center text-right w-100">
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
                    <NavLink 
                        to="/admin/inquiries" 
                        className="nav-link"
                        style={{'color': currentTable === 'inquiries' && 'white', position: 'relative'}}
                    >פניות
                    {newInquiriesCount ? <div className="new-inquiries-count" style={styles.count}>{newInquiriesCount}</div>:''}
                    </NavLink>
                    <div className="nav-link">הזמנות</div>
                </div>
            </div>
            <div className="overflow-auto pl-2 pl-sm-0">
                <div className="sort-select d-flex w-100 ml-4 text-left pr-md-5">
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
                        <option value="-1">סדר יורד</option>
                        <option value="1">סדר עולה</option>
                    </select>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminNavBar;