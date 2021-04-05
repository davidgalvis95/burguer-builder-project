import React, {Component} from 'react'
import {Route, Switch, withRouter} from "react-router";
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from './store/actions/index'

class App extends Component {

  //this is done to test that when the component gets unmounted the ejected axios interceptors get called  in the wrapper component
  // state = {
  //     show: true
  // }
  //
  // componentDidMount() {
  //     setTimeout(()=>{
  //         this.setState({show:false})
  //     },5000)
  // }

    //This call on the did mount will ensure that every subcomponent(this encloses all the app) from which this app component is parent of,
    //everytime is updated or re-rendered will check if is time to log out due to expiration of the token
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render () {
      // const burguerBuilder = this.state.show? <BurguerBuilder></BurguerBuilder> :null;
    return (
        <div>
          <Layout>
            <Switch>
                {/*The order with the switch needs to be from the most specific to the less specific one*/}
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/auth" component={Auth}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/" component={BurguerBuilder}/>
            </Switch>
          </Layout>
        </div>
    );
  };
}

const mapDispatchToProps = dispatch => {
    return{
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

//When working with redux, it will block the routing component to perform ok, so to get back the routing functionality
//we should enclose our connected component with withRouter, as shown below
export default withRouter(connect(null, mapDispatchToProps)(App));
