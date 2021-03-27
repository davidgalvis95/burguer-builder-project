import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from 'Auth.module.css'
class Auth extends Component {

    state = {
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
                    //TODO add this validation to the object and in contactData
                    //isEmail: true
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
        //TODO add the email validity here

        return isValid;
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        };

        const form = formElementsArray.map(formElement => (
            <Input key={formElement.id}
                   elementId={formElement.id}
                   elementType={formElement.config.elementType}
                   elementConfig={formElement.config.elementConfig}
                   value={formElement.config.value}
                   invalid={!formElement.config.valid}
                   shouldValidate={formElement.config.validation}
                   touched={formElement.config.touched}
                   errorMsg={'please enter a correct '.concat(formElement.id)}
                   changed={(event) => this.inputChangedHandler(event, formElement.id)}
                   selected={(event) => this.abandonedFieldHandler(event)}
                   abandoned={formElement.config.abandoned}/>
        ))

        return(
            <div className={classes.Auth}>
                <form>
                    {form}
                    <Button type="Success">SUBMIT</Button>
                </form>
            </div>
        )
    }
}

export default Auth;