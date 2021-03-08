import { getDateFormated } from "../../../services/generalFn";

const UserRow = ({user, fn: {setUserToEdit, handleDeleteUser}, index, page}) => {
    const {name, email, date_created, role, _id} = user;
    return(
        <tr>
            <td>{(page * 10) + index + 1}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{getDateFormated(date_created)}</td>
            <td>
                <button className="btn btn-outline-info orders">הזמנות</button>
            </td>
            <td>{role}</td>
            <td>
                <button className="btn btn-outline-primary m-1 edit" onClick={() => setUserToEdit(user)}>עריכה</button>
                <button className="btn btn-outline-danger delete" onClick={() => handleDeleteUser(_id)}>מחיקה</button>
            </td>
        </tr>
    );
}

export default UserRow;