import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux/Aux'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burguer/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burguerBuilderActions from '../../store/actions/index'


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
        purchasing: false,
    }

    componentDidMount() {
        // axios.get('https://react-my-burguer-571ec-default-rtdb.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients: response.data});
        //     })
        //     .catch(error => this.setState({error:error}))
        //     // .catch(error => {})
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
        return sum > 0;
    }

    addIngredientHandler = (type) => {
        const oldCount = this.props.ings[type];
        const updatedCount = oldCount + 1;
        //here we use the spread operator, since we have to edit the state in an immutable way, since arrays and objects are reference types
        //A new constant is generated
        const updatedIngredients = {...this.props.ings};
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.props.price;
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
        const updatedIngredients = {...this.props.ings};
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.props.price;
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
        //the last logic is no longer needed since ingredients will be queried through Redux in the Checkout component
        this.props.history.push('/checkout');
    }


    render() {
        //here we seize the fact that everytime something is rendered, this is again checked to see if the button needs to be disabled
        //here we get the ingredients from the state in an immutable way
        const disabledInfo = {...this.props.ings};
        //if the ingredient for that key has a count of <= 0 then is disabled, otherwise it's not
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        console.log(this.state.error);
        let burguer = this.state.error ? <h3 style={{'textAlign': 'center'}}>Ingredients could not be loaded</h3> :
            <Spinner/>;

        //This was required because initially the state of the ingredients is null with these changes, and after the component gets mounted it will
        // go and fetch the data from firebase, so, that's why this condition is needed, here in this condition we add all the components that are dependant on if
        //there are ingredients or not
        if (this.props.ings) {
            burguer = (
                <Aux>
                    <Burguer ingredients={this.props.ings}/>
                    <BuildControls
                        //Here we can realize a feature in the onIngredientAdded and onIngredientRemoved, that is passed as a reference from the BurguerBuilder,
                        // that they are not passing the property needed in the props passed from redux, this is because the property that is called from BuildControls already is
                        // passing this method from this component following this format {() => onIngredientRemoved(argument)} , so, it implies that the function onIngredientRemoved is already
                        // being called from the BuildControls passing the argument, because the ingredientRemoved calls this.props.onIngredientDeleted respectively
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientDeleted}
                        //here we pass the entire object
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                    />
                </Aux>
            );
            //if the ingredients are set, we also will set the orderSummary
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCanceledHandler}
                purchaseContinued={this.purchaseContinuedHandler}
                price={this.props.price}/>;
        }

        //if the state is loading, then show the spinner
        //set after checking for ingredients, because this happens after
        // if (this.state.loading) {
        //     orderSummary = <Spinner/>;
        // }

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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burguerBuilderActions.addIngredient(ingName)),
        onIngredientDeleted: (ingName) => dispatch(burguerBuilderActions.removeIngredient(ingName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurguerBuilder, axios));
// export default BurguerBuilder;