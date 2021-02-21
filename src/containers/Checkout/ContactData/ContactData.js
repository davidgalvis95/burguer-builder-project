import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'


class ContactData extends Component {
    state = {
        orderForm: {
            customer: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'your name'
                    },
                    value: ''
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'your street'
                    },
                    value: ''
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'your zip code'
                    },
                    value: ''
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'your country'
                    },
                    value: ''
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'your e-mail'
                    },
                    value: ''
                },
                deliveryMethod: {
                    //We do need to create this type in the custom Input component since so far we only have 'input' and 'textarea', but no select
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: ''
                }
            }
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
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false});
            });
    }

    render() {

        const formElementsArray = [];
        //converting the orderForm created in the state to an array to dynamically create input elements with the custom component from it
        for(let key in this.state.orderForm){
            formElementsArray.push({
                //This is the key of any object, in this case the names of the object e.g 'name', 'street'
                id: key,
                config: this.state.orderForm[key]
            })
        }

        //here we have changed the default input by the custom created input
        let form = (<form>
            {formElementsArray.map(formElement => {
                return <Input
                    //as always when building an array of JSX the key is needed
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                />
            })}
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>);

        if (this.state.loading) {
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