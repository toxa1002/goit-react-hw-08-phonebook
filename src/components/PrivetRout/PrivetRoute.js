import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import registerSelectors from '../../redux/auth/register-selections'
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';


const PrivetRout = ({
    component: Component,
    redirectTo,
    props,
    ...routeProps
   
}) => {
   const token = useSelector(registerSelectors.getToken);
   const isAuthenticated = useSelector(registerSelectors.getIsAuthenticated)
    if(token && !isAuthenticated) return <TailSpin color="#00BFFF"
    height={150}
    width={150}/>;
    if(isAuthenticated && token) return <Route {...routeProps}
    render={props =><Component {...props}/>}/>;
    return <Redirect to={redirectTo}/>;
    

} 


export default PrivetRout