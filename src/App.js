import React, {Component} from 'react'
import {Redirect, Route, Switch, withRouter} from "react-router";
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index'

class App extends Component {

    //This call on the did mount will ensure that every subcomponent(this encloses all the app) from which this app component is parent of,
    //everytime is updated or re-rendered will check if is time to log out due to expiration of the token
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render () {

        let theRoutes = (<Switch>
                <Route path="/" component={BurguerBuilder}/>
                <Route path="/auth" component={Auth}/>
                <Redirect to="/"/>
            </Switch>);

        if(this.props.isAuthenticated){
            //When we sis not add the Auth component here it was not redirecting when the user was not logged in
            //and wanted to buy a burguer and need to auth and then redirected to keep on buying
            theRoutes = (<Switch>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/auth" component={Auth}/>
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
export default withRouter(connect(null, mapDispatchToProps)(App));
