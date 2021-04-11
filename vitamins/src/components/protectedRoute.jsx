import { Redirect, Route } from 'react-router-dom';
import { checkIfAdmin, getCurrentUser } from '../services/usersService';

const ProtectedRoute = (props) => {
    const {component: Componenet, table, computedMatch: {params}} = props;
    return <Route render={() => {
        if(!getCurrentUser() || !checkIfAdmin()) return <Redirect to={{pathname: "/", state: {from: props.location}}}/>
        else return <Componenet {...props} table={table} params={params}/>
    }}/>
}

export default ProtectedRoute;