import React, {Component} from 'react'
import {Redirect, Route, Switch, withRouter} from "react-router";
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index'
import asyncComponent from "./hoc/AsyncComponent/AsyncComponent";

//This is a way that has been learnt to load components when they are needed and not all the time
const asyncCheckout = asyncComponent( () => {
    return import("./containers/Checkout/Checkout");
})

const asyncOrders = asyncComponent( () => {
    return import("./containers/Orders/Orders");
})

const asyncAuth = asyncComponent( () => {
    return import("./containers/Auth/Auth");
})

class App extends Component {

    //This call on the did mount will ensure that every subcomponent(this encloses all the app) from which this app component is parent of,
    //everytime is updated or re-rendered will check if is time to log out due to expiration of the token
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render () {

        let theRoutes = (<Switch>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" component={BurguerBuilder}/>
                <Redirect to="/"/>
            </Switch>);

        if(this.props.isAuthenticated){
            //When we sis not add the Auth component here it was not redirecting when the user was not logged in
            //and wanted to buy a burguer and need to auth and then redirected to keep on buying
            theRoutes = (<Switch>
                <Route path="/checkout" component={asyncCheckout}/>
                <Route path="/orders" component={asyncOrders}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" component={asyncAuth}/>
                <Route path="/" component={BurguerBuilder}/>
            </Switch>);
        }

        return (
            <div>
              <Layout>
                  {theRoutes}
              </Layout>
            </div>
        );
  };
}

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

//When working with redux, it will block the routing component to perform ok, so to get back the routing functionality
//we should enclose our connected component with withRouter, as shown below
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
