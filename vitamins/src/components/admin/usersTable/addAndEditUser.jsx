import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { addItem, editItem } from "../../../services/adminService";
import { createCart } from "../../../services/cartService";
import Input from "../../common/input";

const AddAndEditUser = ({user, fn: {closeForm, reRender}}) => {

    const[inputsFocus, setInputsFocus] = useState({});

    const styles = {
        formContainer: {width: '100%', height: '100%'},
        form: {backgroundColor: '#ddd', maxWidth: '700px', maxHeight: '550px', overflowY: 'auto'}
    }

    const validate = values => {
        const errors = {};

        if(!values.name) errors.name = ' *שדה חובה';
        else if(values.name.length < 2) errors.name = ' *אורך השם חייב להיות לפחות שני תוים';
        else if(values.name.length > 100) errors.name = ' *אורך השם לא יכול להיות גדול ממאה תוים';

        if(!values.email) errors.email = ' *שדה חובה';
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = ' *אימייל לא תקין';

        if(!values.role) errors.role = ' *שדה חובה';
        else if(values.role !== 'admin' && values.role !== 'regular') errors.role = '*ערך לא תקין בחר admin או regular'

        if(!user) {
            if(!values.password) errors.password = ' *שדה חובה';
            else if(values.password.length < 6) errors.password = ' *אורך הסיסמא חייב להיות לפחות שישה תוים';
            else if(values.password.length > 100) errors.password = ' *אורך הסיסמא לא יכול להיות גדול ממאה תוים';
        }

        return errors;
    }

    const onSubmit = async values => {
        if(
            user && 
            !values.password && 
            values.name  === user.name && 
            values.email === user.email && 
            values.role  === user.role
        )return toast.warning('הזן מידע חדש בשביל לעדכן');

        if(values.password) values.pass = values.password;
        delete values.password;
        try {
            if(!user) {
                let {_id} = await addItem('users', values);
                await createCart(_id);
            } else await editItem('users', user._id, values);
            closeForm(null);
            reRender(val => !val);
            toast(`המשתמש ${user ? 'התעדכן' : 'התווסף'} בהצלחה`);
        } catch(err) { toast.error('משהו השתבש נסה שנית מאוחר יותר') }
    }

    const formik = useFormik({
        initialValues: {
            name:  user ? user.name : '',
            email: user ? user.email : '',
            role:  user ? user.role  : '',
            password: ''
        },
        validate,
        onSubmit
    });

    return (
        <div className="user-form-container d-flex justify-content-center align-items-center" style={styles.formContainer}>
            <form 
                className="form p-4 m-2" 
                style={styles.form}
                onSubmit={formik.handleSubmit}
            >
                <h4 className="text-center text-info">פרטי המשתמש</h4>
                <div className="row pt-2">
                    <div className="form-group col-sm-12 col-md-6">
                        <label className="d-block text-right" htmlFor="name">שם משתמש:</label>
                        <Input
                            inputData={{type: 'text', field: 'name', placeholder: 'שם משתמש', inputsFocus}}
                            inputFn={{formik, setInputsFocus}}
                        />
                    </div>
                    <div className="form-group col-sm-12 col-md-6">
                        <label className="d-block text-right" htmlFor="email">כתובת מייל:</label>
                        <Input
                            inputData={{type: 'email', field: 'email', placeholder: 'כתובת מייל', inputsFocus}}
                            inputFn={{formik, setInputsFocus}}
                        />
                    </div>
                    <div className="form-group col-sm-12 col-md-6">
                        <label className="d-block text-right" htmlFor="password">סיסמא:</label>
                        <Input
                            inputData={{type: 'text', field: 'password', placeholder: 'סיסמא', inputsFocus}}
                            inputFn={{formik, setInputsFocus}}
                        />
                    </div>
                    <div className="form-group col-sm-12 col-md-6">
                        <label className="d-block text-right" htmlFor="role">סיווג:</label>
                        <Input
                            inputData={{type: 'text', field: 'role', placeholder: 'סיווג', inputsFocus}}
                            inputFn={{formik, setInputsFocus}}
                        />
                    </div>
                </div>
                <div className="buttons d-flex pt-2">
                    <button 
                        type="button" id="close_form" className="btn btn-outline-danger m-2 btn-block"
                        onClick={() => closeForm(null)}
                    >סגור</button>
                    <button type="submit" id="submit" className="btn btn-outline-primary m-2 btn-block">שלח</button>
                </div>
            </form>
        </div>
    );
}

export default AddAndEditUser;