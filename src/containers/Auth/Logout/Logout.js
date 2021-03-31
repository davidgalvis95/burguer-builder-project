import React, {Component} from 'react';
import * as actions from '../../../store/actions/index'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class Logout extends Component {

    componentDidMount() {
        //we could follow the next approach of passing the history and the pushing inside the action
        //but it's better to do it using Redirect links with redux
        // this.props.onLogout(this.props.history);
        this.props.onLogout();
    }

    render () {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps) (Logout);