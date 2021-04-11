import { Link } from "react-router-dom";
import { getDateFormated, htmlEntities } from "../../../services/generalFn";

const InquiryRow = ({inquiry, fn: {handleDeleteImquiry}, index, page}) => {
    const {name, email, date_created, date_updated, status, isOpened, _id} = inquiry;

    return(
        <tr>
            <td style={{color: isOpened || 'red'}}>{(page * 10) + index + 1}{isOpened || <><br/><small>new</small></>}</td>
            <td>{htmlEntities(name)}</td>
            <td>{email}</td>
            <td>{getDateFormated(date_created)}</td>
            <td>{status}</td>
            <td>{getDateFormated(date_updated)}</td>
            <td>
                <Link to={`/admin/inquiries/inquiry/${_id}`} className="btn btn-outline-success open m-1">פתיחה</Link>
                <button className="btn btn-outline-danger delete" onClick={() => handleDeleteImquiry(_id)}>מחיקה</button>
            </td>
        </tr>
    );
}

export default InquiryRow;