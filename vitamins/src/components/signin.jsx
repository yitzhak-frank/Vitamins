import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import { useFormik } from 'formik';
import { getCurrentUser, login, logout } from "../services/usersService";
import { indexesManager, LOGIN_INDEX, USER_INDEX } from "../redux-store/indexes-reduser";
import Input from "./common/input";

const SignIn = ({indexes, indexesManager}) => {

    const[inputsFocus ,setInputsFocus] = useState({});
    
    const validate = values => {
        const errors = {};
        
        if(!values.email) errors.email = ' *שדה חובה';
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = ' *אימייל לא תקין';

        if(!values.password) errors.password = ' *שדה חובה';
        else if(values.password.length < 6) errors.password = ' *אורך הסיסמא חייב להיות לפחות שישה תוים';
        else if(values.password.length > 100) errors.password = ' *אורך הסיסמא לא יכול להיות גדול ממאה תוים';

        return errors;
    }

    const onSubmit = async values => {
        const {email, password} = values;
        try {
            await login(email, password);
            indexesManager(USER_INDEX, getCurrentUser().name);
        } catch(err) { console.dir(err) }
    }

    const formik = useFormik({
        initialValues: {
            email: indexes.signupData.email,
            password: indexes.signupData.pass
        },
        validate,
        onSubmit
    });

    const handleSignOut = () => {
        logout();
        indexesManager(USER_INDEX, '');
        indexesManager(LOGIN_INDEX, false);
    }

    return (
        <div className="login shadow">
            {!indexes.user? <div className="before-login">
                <form id="login_form" className="form" onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <Input
                            inputData={{type: 'email', field: 'email', placeholder: 'כתובת מייל', inputsFocus}}
                            inputFn={{formik, setInputsFocus}}
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            inputData={{type: 'password', field: 'password', placeholder: 'סיסמא', inputsFocus}}
                            inputFn={{formik, setInputsFocus}}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark btn-block">התחבר</button>
                </form>
                <p className="pt-2"> עדיין לא פתחת חשבון? 
                    <Link 
                        to="/sign-up" 
                        className="sign-up text-info" 
                        onClick={() => indexesManager(LOGIN_INDEX, false)}
                    > הירשם
                    </Link>
                </p>
                <p>Email: admin@gmail.com <br/> Password: 123456</p>
            </div>:
            <div className="when-login">
                <h5>שלום <span className="user-name">{indexes.user}</span></h5>
                <h6> {'התחברת בהצלחה, קניה מהנה:)'}</h6>
                <button id="log-out" className="btn btn-dark btn-block" onClick={handleSignOut}>התנתק</button>
            </div>}
        </div>
    )
}

const mapStateToProps = ({indexes}) => ({indexes});
const mapDispatchToProps = (dispatch) => ({indexesManager: (type, state) => dispatch(indexesManager(type, state))})
  
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);