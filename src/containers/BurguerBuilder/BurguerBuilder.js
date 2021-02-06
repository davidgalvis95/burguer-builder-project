import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurguerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:null
    }

    componentDidMount() {
        axios.get('https://react-my-burguer-571ec-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => this.setState({error:error}))
            // .catch(error => {})
    }

    updatePurchaseState(ingredients) {
        //When this object is called in the handlers, those methods have not finished their execution, so we may be playing with the old ingredients object instead of the new one
        //this is why that we pass the updatedIngredients object into this method from the handlers
        // const ingredients = { ...this.state.ingredients }

        const sum = Object.keys(ingredients).map(ingredientKey => {
            return ingredients[ingredientKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        //here we use the spread operator, since we have to edit the state in an immutable way, since arrays and objects are reference types
        //A new constant is generated
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        //here we use the spread operator, since we have to edit the state in an immutable way, since arrays and objects are reference types
        //A new constant is generated
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    //This method has to work as an arrow function, since if that one works as a normal declared method the this keyword will point internally to the method, and not to the class
    //as it's needed here
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCanceledHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinuedHandler = () => {
        //creating the object to sent to the 'backend'
        //when starting to send the request, the state is set to loading
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            });

    }


    render() {
        //here we seize the fact that everytime something is rendered, this is again checked to see if the button needs to be disabled
        //here we get the ingredients from the state in an immutable way
        const disabledInfo = {...this.state.ingredients};
        //if the ingredient for that key has a count of <= 0 then is disabled, otherwise it's not
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        console.log(this.state.error);
        let burguer = this.state.error ? <h3 style={{'textAlign':'center'}}>Ingredients could not be loaded</h3>:<Spinner/>;

        //This was required because initially the state of the ingredients is null with these changes, and after the component gets mounted it will
        // go and fetch the data from firebase, so, that's why this condition is needed, here in this condition we add all the components that are dependant on if
        //there are ingredients or not
        if(this.state.ingredients) {
            burguer = (
                <Aux>
                    <Burguer ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        //here we pass the entire object
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}
                    />
                </Aux>
            );
            //if the ingredients are set, we also will set the orderSummary
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCanceledHandler}
                purchaseContinued={this.purchaseContinuedHandler}
                price={this.state.totalPrice}/>;
        }

        //if the state is loading, then show the spinner
        //set after checking for ingredients, because this happens after
        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>
                {/*If this is done this way this.purchaseCanceledHandler() will cause react to render an infinite loop in componentDidMount hook*/}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceledHandler}>
                    {/*Actually order summary is being shown even if the show property is not being triggered by the purchaseHandler and the 'Order now' button*/}
                    {orderSummary}
                </Modal>
                {burguer}
            </Aux>
        )
    }
}

export default withErrorHandler(BurguerBuilder, axios);