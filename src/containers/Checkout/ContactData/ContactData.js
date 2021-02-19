import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);

        // creating the object to sent to the 'backend'
        // when starting to send the request, the state is set to loading
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'David Galvis',
                address: {
                    address: 'test address 111',
                    zipCode: '123282',
                    country: 'Colombia'
                },
                deliveryMethod: 'fastest'
            }
        }

        //sending the request to the api
        //until we get a response or an error, the state is set no not loading

        //This is just a test url to test the error handler that wraps this component
        // axios.post('/orders.jso', order)
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                this.setState({loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false });
            });
    }

    render() {
        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);

        if(!this.state.loading){
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
}

export default ContactData;