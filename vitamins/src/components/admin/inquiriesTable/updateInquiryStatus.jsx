import { toast } from "react-toastify";
import { useFormik } from "formik";
import { updateStatus } from "../../../services/inquiriesService";
import useWindowSize from "../../../hooks/screenSize";

const UpdateInquiryStatus = ({inquiry: {status, comments, _id: inquiryId}, close }) => {

    const { width } = useWindowSize();

    const styles ={
        cover: {position: 'fixed', top: '0', zIndex: '99', height: '100vh', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)'},
        form: {maxWidth: width > 800 ? '700px' : '95%', maxHeight: '575px', overflowY: 'auto', width: '100%', height: '100%', borderRadius: '10px'},
        textarea: {whiteSpace: 'pre-wrap', width: '100%'}
    }

    const validate = values => {
        const errors  = {};
        const options = ['ממתין לטיפול' , 'בטיפול' , 'טיפול הסתיים'];

        if(!values.status || !options.includes(values.status)) errors.status = '*ערך לא תקין';

        if(values.comments.length && values.comments.length < 4) errors.comments = '*אורך ההערה חייב להיות לפחות ארבעה תווים';
        else if(values.comments.length > 500) errors.comments = '*אורך ההערה לא יכול להיות גדול מחמש מאות תווים';

        return errors;
    }

    const onSubmit = async values => {
        if(!values.comments || values.comments === comments) delete values.comments;
        if(!values.status   || values.status   === status)   delete values.status;
        if(!Object.keys(values).length) return toast.warning('הזן מידע חדש בשביל לעדכן');
        try {
            await updateStatus(values, inquiryId);
            toast('המידע התעדכן בהצלחה');
            close();
        } catch(err) { toast.error('משהו השתבש נסה שוב מאוחר יותר') }
    }

    const formik = useFormik({
        initialValues: {
            status,
            comments
        },
        validate,
        onSubmit
    })

    return(
        <div className="dark-cover d-flex justify-content-center align-items-center" style={styles.cover}>
            <form 
                className="p-1 p-sm-3 m-1 m-sm-3 mx-auto inquiry bg-light" 
                style={styles.form}
                onSubmit={formik.handleSubmit}
            >
                <h2 className="text-center text-info my-3">עדכן סטטוס</h2>
                <div className="select py-3 mx-auto" style={{width: '120px'}}>
                    <label htmlFor="status" className="ml-3 text-info">בחר סטטוס:</label>
                    <select 
                        name="status" 
                        id="status" 
                        className="" 
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option value="" label="בחר סטטוס" disabled></option>
                        <option value="ממתין לטיפול" label="ממתין לטיפול"></option>
                        <option value="בטיפול" label="בטיפול"></option>
                        <option value="טיפול הסתיים" label="טיפול הסתיים"></option>
                    </select>
                    {formik.touched.status && formik.errors.status? 
                        <small className="text-danger text-center d-block">{formik.errors.status}</small>
                    :null}
                </div>
                <label htmlFor="comments" className="d-block text-center text-info">הערות:</label>
                <textarea 
                    name="comments" 
                    id="comments" 
                    className="p-2"
                    cols="30" 
                    rows="10"
                    style={styles.textarea}
                    value={formik.values.comments}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                ></textarea>
                {formik.touched.comments && formik.errors.comments? 
                    <small className="text-danger text-right d-block">{formik.errors.comments}</small>
                :null}
                <div className="buttons d-sm-flex p-1 p-sm-0">
                    <button className="btn btn-lg btn-block btn-outline-danger m-1" onClick={close}>סגור</button>
                    <button className="btn btn-lg btn-block btn-outline-success m-1">עדכן</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateInquiryStatus;