import React, {Component} from 'react'

import Layout from './hoc/Layout/Layout'
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder';

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
            <BurguerBuilder></BurguerBuilder>
          </Layout>
        </div>
    );
  };
}

export default App;
