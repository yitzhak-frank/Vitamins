import useScrollPositionBottom from "../../../hooks/scrollPosition";
import AddAndEditUser from "./addAndEditUser";
import UserRow from "./userRow";

const UsersTable = ({
    tableData: users, currentPage, addItemIndex, itemToEdit: userToEdit, 
    fn: {reRender, handleDeleteItem, handleCloseForm, setAddItemIndex, setItemToEdit}
}) => {

    const scrollPositionBottom = useScrollPositionBottom();
    
    const styles = { 
        addBtn: {bottom: scrollPositionBottom > 115 ? 20 : 115 - scrollPositionBottom} 
    };
    
    return(
        <>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>שם משתמש</th>
                        <th>אימייל</th>
                        <th>תאריך כניסה</th>
                        <th>הזמנות</th>
                        <th>סיווג</th>
                        <th>עריכה & מחיקה</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => <UserRow 
                        key={user._id}
                        user={user} 
                        fn={{setUserToEdit: setItemToEdit, handleDeleteUser: handleDeleteItem}}
                        index={index}
                        page={currentPage}
                    />)}
                </tbody>
            </table>
            <i id="add-btn" className="fas fa-plus shadow bg-secondary" 
                style={styles.addBtn}
                onClick={() => setAddItemIndex(!addItemIndex)}
            />
            {
            addItemIndex ? 
                <div className="dark-form-cover"  onClick={handleCloseForm}>
                    <AddAndEditUser fn={{closeForm: setAddItemIndex, reRender}}/>
                </div>:
            userToEdit ? 
                <div className="dark-form-cover"  onClick={handleCloseForm}>
                    <AddAndEditUser user={userToEdit} fn={{closeForm: setItemToEdit, reRender}}/>
                </div>
            :''}
        </>
    );
}

export default UsersTable;