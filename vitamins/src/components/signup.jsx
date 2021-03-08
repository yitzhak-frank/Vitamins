import Input from './common/input';
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import { useState } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { userSignUp } from '../services/usersService';
import { createCart } from '../services/cartService';
import { indexesManager, LOGIN_INDEX, SIGNUP_DATA } from '../redux-store/indexes-reduser';

const SignUp = ({indexesManager}) => {

    const[inputsFocus ,setInputsFocus] = useState({});

    const history = useHistory();

    const validate = values => {
        const errors = {};

        if(!values.name) errors.name = ' *שדה חובה';
        else if(values.name.length < 2) errors.name = ' *אורך השם חייב להיות לפחות שני תוים';
        else if(values.name.length > 100) errors.name = ' *אורך השם לא יכול להיות גדול ממאה תוים';

        if(!values.email) errors.email = ' *שדה חובה';
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = ' *אימייל לא תקין';

        if(!values.password) errors.password = ' *שדה חובה';
        else if(values.password.length < 6) errors.password = ' *אורך הסיסמא חייב להיות לפחות שישה תוים';
        else if(values.password.length > 100) errors.password = ' *אורך הסיסמא לא יכול להיות גדול ממאה תוים';

        if(!values.verifyPass) errors.verifyPass = ' *שדה חובה';
        else if(values.verifyPass !== values.password) errors.verifyPass = ' *הסיסמא אינה תואמת לסיסמא שהזנת';
        
        return errors;
    }

    const onSubmit = async values => {
        let user = { name: values.name, email: values.email, pass: values.password };
        try {
            let userInfo = await userSignUp(user);
            await createCart(userInfo._id);

            toast(`${user.name} ברוך בואך לאתר ויטמינים`);
            history.replace('home');
            
            indexesManager(SIGNUP_DATA, user);
            indexesManager(LOGIN_INDEX, true);
        } catch(err) { console.dir(err) }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            verifyPass: ''
        },
        validate,
        onSubmit
    });

    return(
        <div className="container py-5">
            <form className="form sign-up-form py-5 mx-md-5 px-xl-5" onSubmit={formik.handleSubmit}>
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
                <label className="pr-1 mt-2 text-right d-block" htmlFor="password">סיסמא</label>
                <Input
                    inputData={{type: 'password', field: 'password', placeholder: 'סיסמא', inputsFocus}}
                    inputFn={{formik, setInputsFocus}}
                />
                <label className="pr-1 mt-2 text-right d-block" htmlFor="verifyPass">אימות סיסמא</label>
                <Input
                    inputData={{type: 'password', field: 'verifyPass', placeholder: 'אימות סיסמא', inputsFocus}}
                    inputFn={{formik, setInputsFocus}}
                />
                <button type="submit" className="btn btn-dark btn-block my-5">הירשם</button>
            </form>
        </div>
    );
}

const mapStateToProps = ({indexes}) => ({indexes});
const mapDispatchToProps = (dispatch) => ({indexesManager: (type, state) => dispatch(indexesManager(type, state))})
  
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);