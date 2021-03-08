import { Redirect, Route } from 'react-router-dom';
import {checkAdminToken, checkIfAdmin} from '../services/usersService';

const ProtectedRoute = ({component: Componenet, table}) => {
    checkAdminToken();
    return <Route render={(props) => {
        if(!checkIfAdmin()) return <Redirect to={{pathname: "/", state: {from: props.location}}}/>
        else return <Componenet {...props} table={table}/>
    }}/>
}

export default ProtectedRoute;