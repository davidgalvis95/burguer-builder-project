import React, {Component} from 'react';
import { connect }  from "react-redux";

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject} from "../../../shared/utility";


class ContactData extends Component {

    state = {
        prevKey: '',
        prevOrderForm: {},
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false,
                abandoned: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your street'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false,
                abandoned: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your zip code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 6
                },
                valid: false,
                touched: false,
                abandoned: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your country'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 20
                },
                valid: false,
                touched: false,
                abandoned: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your e-mail'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 40,
                    isEmail: true
                },
                valid: false,
                touched: false,
                abandoned: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                //This needs to be set as default in order to send the order
                value: 'fastest',
                //This validation object is added in order to correct some undefined properties when checking for the validation
                //due that this is the kind of object that is passed as rules in the checkValidity method
                validation: {},
                //here we need to set this variable since we are validating each element in this form object, and if one of the properties
                //in this case 'valid' is not defined, it will move it to undefined, which will not behave as the original false
                valid: true,
            }
        },
        formIsValid: false,
    }

    checkValidity(value, rules) {

        let isValid = true;

        //This is the alternative way of solving the: cannot read property 'X' of undefined
        // if(!rules){
        //     return true;
        // }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.isEmail){
            const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = emailRegex.test(String(value).toLowerCase());

        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients);

        // creating the object to sent to the 'backend'
        // when starting to send the request, the state is set to loading
        // this.setState({loading: true});

        //looping over every element of the orderForm and mapping the 'key' of orderForm, into a key of formData,
        // and the value of a given key into the value of formData
        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
            //using destructuring to build an object like
            //  {
            //      name: 'david'
            //      street: '321432'
            //  }
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurguer(order, this.props.token);
    }


    inputChangedHandler = (event, inputIdentifier) => {

        //reusing the updatedObject function here too, as in the actions of the redux state
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: true
        })
        // console.log(event.target.value);
        //here we need to update the state immutably by creating clones of the actual state
        //so far with the next line of code, this only creates a clone of the wrapper object (in this case the array of the outerForm)
        //but it does not create a clone of the internal nested objects as the elementConfig or even the value, that's why we need to clone them all or
        //just replace what we need to replace
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        })

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            // console.log(updatedOrderForm[inputIdentifier]);
            //here once one of the elements is false then all the formIsValid variable is set to false
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    //TODO extract this code and some other methods in a separate common component
    selectAndAbandonedFieldHandler = (event) => {
        this.setState(prevState => {
            const {actualKey, updatedOrderForm} = this.getFormAndActualKeyIfFieldHasBeenAbandoned(event, prevState);

            return{
                orderForm: updatedOrderForm,
                prevKey: actualKey
            }
        });
    }

    getFormAndActualKeyIfFieldHasBeenAbandoned(event, prevState) {
        const actualKey = event.target.id;

        let orderFormHasBeenTouched = false;
        for (let identifier in prevState.orderForm) {
            if (prevState.orderForm[identifier].touched) {
                orderFormHasBeenTouched = true;
            }
        }

        const updatedOrderForm = {...this.state.orderForm}
        if ((prevState.prevKey !== actualKey) && orderFormHasBeenTouched) {
            const updatedPrevElement = {...updatedOrderForm[prevState.prevKey]};
            const updatedActualElement = {...updatedOrderForm[actualKey]};
            [updatedPrevElement.abandoned, updatedActualElement.abandoned] = [true, false];
            [updatedOrderForm[prevState.prevKey], updatedOrderForm[actualKey]] = [updatedPrevElement,updatedActualElement];
        }
        return {actualKey, updatedOrderForm};
    }

    render() {

        // console.log('[render]')
        const formElementsArray = [];
        //converting the orderForm created in the state to an array to dynamically create input elements with the custom component from it
        for (let key in this.state.orderForm) {
            // console.log(this.state.orderForm[key]);
            formElementsArray.push({
                //This is the key of any object, in this case the names of the object e.g 'name', 'street'
                id: key,
                config: this.state.orderForm[key]
            })
        }

        //here we have changed the default input by the custom created input
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => {
                    return <Input
                        //as always when building an array of JSX the key is needed
                        key={formElement.id}
                        elementId={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        //if the form element is not valid, then push this property so that a different style gets generate to that Input component
                        invalid={!formElement.config.valid}
                        //this property is set to know if a particular object should be validated, e.g the select Input component should not be validated,
                        //because it has some default input that is ok. And since the select does not have the validation property, then we take advantage of that
                        //changed for readability in Input component
                        shouldValidate={formElement.config.validation !== undefined}
                        //this is the property that let us know whether a single component has been initially modified
                        touched={formElement.config.touched}
                        errorMsg={'please enter a correct '.concat(formElement.id)}
                        //since here is needed to pass data as two way binding, there we need to get what is now stored
                        //in the value and show that there in the form in the DOM, because so far it's in the memory bu not the DOM
                        //and is not updated because the state of the form is not updated
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        //ref={this.inputRef}
                        selected={(event) => this.selectAndAbandonedFieldHandler(event)}
                        abandoned={formElement.config.abandoned}/>
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>);

        if (this.props.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        price: state.burguerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurguer: (order, token) => dispatch(actions.purchaseBuguer(order, token))
    }
}

//This is done in order to handle the axios errors in the error handler created
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(ContactData, axios));