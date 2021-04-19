import Input from './common/input';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { getCurrentUser } from '../services/usersService';
import { addInquiry } from '../services/inquiriesService';

const Contact = () => {

    const[isLogin, setIsLogin] = useState();

    useEffect(() => setIsLogin(getCurrentUser()), []);

    const styles = {
        textarea: {whiteSpace: 'pre-wrap', height: '100px'},
    }

    const[inputsFocus ,setInputsFocus] = useState({});

    const history = useHistory();

    const validate = values => {
        const errors = {};

        if(!values.name) errors.name = ' *שדה חובה';
        else if(values.name.length < 2) errors.name = ' *אורך השם חייב להיות לפחות שני תוים';
        else if(values.name.length > 100) errors.name = ' *אורך השם לא יכול להיות גדול ממאה תוים';

        if(!values.email) errors.email = ' *שדה חובה';
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = ' *אימייל לא תקין';

        if(!values.msg) errors.msg = ' *שדה חובה';
        else if(values.msg.length < 16) errors.msg = ' *אורך ההודעה חייב להיות לפחות שישה עשר תוים';
        else if(values.msg.length > 500) errors.msg = ' *אורך ההודעה לא יכול להיות גדול מחמש מאות תוים';

        return errors;
    }

    const onSubmit = async values => {
        values.user_id = isLogin.id;
        try {
            await addInquiry(values);
            toast(`${values.name} פנייתך התקבלה במערכת ותענה בהקדם:)`);
            history.replace('home');
        } catch(err) { console.dir(err); toast.error('משהו השתבש נסה שוב מאוחר יותר') }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            msg: ''
        },
        validate,
        onSubmit
    });

    return(
        <div className="container py-5">
        {isLogin ? <>
            <h1 className="text-center text-info pt-5">טופס יצירת קשר</h1>
            <h6 className="text-center text-secondary">מלא את הפרטים הנדרשים ונחזור אליך בהקדם:)</h6>
            <form className="form contact-form pb-5 pt-3 mx-md-5 px-xl-5" onSubmit={formik.handleSubmit}>
                <label className="pr-1 mt-2 text-right d-block" htmlFor="name">שם משתמש</label>
                <Input
                    inputData={{type: 'text', field: 'name', placeholder: 'שם משתמש', inputsFocus}}
                    inputFn={{formik, setInputsFocus}}
                />
                <label className="pr-1 mt-2 text-right d-block" htmlFor="email">כתובת מייל</label>
                <Input
                    inputData={{type: 'email', field: 'email', placeholder: 'כתובת מייל', inputsFocus}}
                    inputFn={{formik, setInputsFocus}}
                />
                <label className="pr-1 mt-2 text-right d-block" htmlFor="msg">הפניה שלך</label>
                <textarea 
                    type="text" className="form-control" name="msg" id="msg" placeholder="הפניה שלך"
                    style={styles.textarea}
                    value={formik.values.msg}
                    onChange={formik.handleChange}
                    onFocus={() => setInputsFocus(inputs => ({...inputs, msg: true}))}
                    onBlur={(e) => {
                        formik.handleBlur(e);
                        setInputsFocus(inputs => ({...inputs, msg: false}));
                    }}
                ></textarea>
                {formik.touched.msg && formik.errors.msg? 
                    <small className="text-danger text-right d-block">{formik.errors.msg}</small>
                :null}
                <button type="submit" className="btn btn-dark btn-block my-5">שלח</button>
            </form>
        </>:  
            <div className="please-login mt-5">
                <h3 className="text-center text-info">לצורך יצירת הקשר עליך להתחבר לחשבונך</h3>
                <h6 className="text-center text-primary">לחץ על אייקון המשתמש והתחבר או הירשם לאתר</h6>
            </div>
        }
        </div>
       
    );
}

export default Contact;