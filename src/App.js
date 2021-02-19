import React, {Component} from 'react'

import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import {Route} from "react-router-dom";
import {Switch} from "react-router";

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



    render () {
      // const burguerBuilder = this.state.show? <BurguerBuilder></BurguerBuilder> :null;
    return (
        <div>
          <Layout>
            <Switch>
                {/*The order with the switch needs to be from the most specific to the less specific one*/}
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/" component={BurguerBuilder}/>
            </Switch>
          </Layout>
        </div>
    );
  };
}

export default App;
