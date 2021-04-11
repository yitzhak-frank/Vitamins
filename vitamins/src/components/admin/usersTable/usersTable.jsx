import AddItemBtn from "../addItemBtn";
import AddAndEditUser from "./addAndEditUser";
import UserRow from "./userRow";

const UsersTable = ({
    tableData: users, currentPage, addItemIndex, itemToEdit: userToEdit, 
    fn: {reRender, handleDeleteItem, handleCloseForm, setAddItemIndex, setItemToEdit}
}) => {

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
            <AddItemBtn setIndex={setAddItemIndex} item={'משתמש'} />
            {
            addItemIndex || userToEdit ? 
                <div className="dark-form-cover"  onClick={handleCloseForm}>
                    <AddAndEditUser user={userToEdit} fn={{closeForm: (userToEdit ? setItemToEdit : setAddItemIndex), reRender}}/>
                </div>
            :''}
        </>
    );
}

export default UsersTable;