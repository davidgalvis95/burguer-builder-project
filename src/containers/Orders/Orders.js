import React, {Component} from 'react';

import Order from '../../components/Order/Order'
import axios from "../../axios-orders";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{

    state ={
        orders:[],
        loading:true
    }

    //Here we use the component did mount because the axios loading will be called only when the component is loaded, no when is updated or any other action
    //also because the component will be called once
    componentDidMount() {
        axios.get('/orders.json').then(res => {
            console.log(res.data);
            const fetchedOrders = [];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({loading:false, orders:fetchedOrders});
        }).catch(err => {
            console.log(err);
            this.setState({loading:false});
        })
    }

    render() {
        return (
            <div>
                <Order/>
                <Order/>
            </div>
        );
    }
}

//Error handler that was created to intercept errors from axios
export default withErrorHandler(Orders, axios);