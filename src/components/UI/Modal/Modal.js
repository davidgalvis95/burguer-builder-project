import React,{Component} from 'react';

import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

//We have converted this component into a class based component because we want to create a condition
//so that of the show properties are not changed the Modal neither the OrderSummary(because it's a child of this one) get updated
//Thus, improving performance
class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Modal] DidUpdate')
    }

    render() {
        return (
            //This aux is added to hold the ability of returning a single JSX object which contains 2 components, now adding the Backdrop one
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)': 'translateY(-200%)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;