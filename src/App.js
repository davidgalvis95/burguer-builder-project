import React, {Component} from 'react'

import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';
import Checkout from "./containers/Checkout/Checkout";

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
              {/*{burguerBuilder}*/}
            <BurguerBuilder/>
            {/*This checkout is added in order to see how it looks(to be implemented with router)*/}
            <Checkout/>
          </Layout>
        </div>
    );
  };
}

export default App;
