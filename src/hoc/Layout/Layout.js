import React, {Component} from "react";

import Aux from '../Aux/Aux';
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

//We decided to convert this component into a class based one, because actually we want to trigger the BackDrop and SideDrawer
//Using the MENU div that is residing in the Toolbar component. We could convert the SideDrawer component into a stateful one and toggle the SideDrawer and
// Backdrop components to shown/not-shown from there, but since the goal is to reuse the components, here we will handle the toggling from here, where the
//Toolbar and SideDrawer components have a common place, so that we can trigger an event to show the SideDrawer from the MENU and close it as well
class Layout extends Component {

    state = {
        showSideDrawer: false
    }
    //This handler will close the sideDrawer
    closeDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleDrawerClosedHandler = () => {
        //When there is a state that is dependant on the previous state, the safest way to update it is following
        //The prevState convention, otherwise it could lead to unpredictable state updates
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    render() {
        return (
            <Aux>
                <Toolbar showSideDrawer={this.toggleDrawerClosedHandler}/>
                <SideDrawer
                    closed={this.closeDrawerClosedHandler}
                    open={this.state.showSideDrawer}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;