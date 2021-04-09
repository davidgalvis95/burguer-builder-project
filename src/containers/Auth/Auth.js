import React, {Component} from 'react';
import {connect} from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from "react-router";
import {updateObject} from "../../shared/utility";


class Auth extends Component {

    state = {
        prevKey: '',
        prevOrderForm: {},
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10,
                    isEmail: true
                },
                valid: false,
                touched: false,
                abandoned: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 10,
                },
                valid: false,
                touched: false,
                abandoned: false
            }
        },
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.buildingBurguer && this.props.authRedirectPath !== '/'){
            //if the customer is not building the burguer and the path is set to a different thing just
            //redirect to home again
            this.props.onSetAuthRedirectPath()
        }
    }

    checkValidity(value, rules) {

        let isValid = true;

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

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })

        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchModeHandler = () => {
        return this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        })
    }

    //TODO extract this code and some other methods in a separate common component
    selectAndAbandonedFieldHandler = (event) => {

        this.setState(prevState => {
            const {actualKey, updatedAuthForm} = this.getFormAndActualKeyIfFieldHasBeenAbandoned(event, prevState);

            return{
                controls: updatedAuthForm,
                prevKey: actualKey
            }
        });
    }

    getFormAndActualKeyIfFieldHasBeenAbandoned(event, prevState) {
        const actualKey = event.target.id;

        console.log(actualKey);
        let authFormHasBeenTouched = false;
        for (let identifier in prevState.controls) {
            if (prevState.controls[identifier].touched) {
                authFormHasBeenTouched = true;
            }
        }

        const updatedAuthForm = {...this.state.controls};
        if ((prevState.prevKey !== actualKey) && authFormHasBeenTouched) {
            const updatedPrevElement = {...updatedAuthForm[prevState.prevKey]};
            const updatedActualElement = {...updatedAuthForm[actualKey]};
            [updatedPrevElement.abandoned, updatedActualElement.abandoned] = [true, false];
            [updatedAuthForm[prevState.prevKey], updatedAuthForm[actualKey]] = [updatedPrevElement,updatedActualElement];
        }
        return {actualKey, updatedAuthForm};
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        console.log(formElementsArray);

        let form = formElementsArray.map(formElement => {

            console.log(formElement.config.abandoned)
            return <Input key={formElement.id}
                   elementId={formElement.id}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   shouldValidate={formElement.config.validation !== undefined}
                   touched={formElement.config.touched}
                   errorMsg={'please enter a correct '.concat(formElement.id)}
                   changed={(event) => this.inputChangedHandler(event, formElement.id)}
                   selected={(event) => this.selectAndAbandonedFieldHandler(event)}
                   abandoned={formElement.config.abandoned}/>
        });

        if(this.props.loading){
            form = <Spinner/>;
        }

        let errorMessage = null;

        if(this.props.error){
            //This is mapped this way because that is the way in which we get the message from the error in firebase
            //we can change this depending on the backend stuff we are connecting to
            errorMessage = ( <p>{this.props.error.message}</p>)
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button
                    clicked={this.switchModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignUp ?"SIGNIN": "SIGNUP"}</Button>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        //whenever the user is authenticated we should have a token, that's why we know
        isAuthenticated: state.auth.token != null,
        buildingBurguer: state.burguerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);