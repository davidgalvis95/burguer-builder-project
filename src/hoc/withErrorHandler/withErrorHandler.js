import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

//this component is created with lowercase, since it wont be used to produce JSX but only to wrap another component
//the one into which we will handle its errors
const withErrorHandler = (WrappedComponent, axios) => {
    // return (props) => {
    //     return (
    //         <Aux>
    //             <Modal>Something went wrong</Modal>
    //             <WrappedComponent {...props}/>
    //         </Aux>
    //     )
    // }

    //we need to convert the component into a class based one due that, we need to perform some requests using axios, to intercept errors
    //to do so, we'll need to use the componentDidMount
    return class extends Component {



        //here is where all the logic to intercept the error resides
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                response: false
            }

        }

        reqInterceptor = null;
        resInterceptor = null;

        interceptErrors = () => {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                //here we set the error:null since we want no errors when sending a new request (reset the state)
                this.setState({error:null});
                //we need to return the request in order to get that working ok!
                console.log(req)
                return req;
            });
            //we need to return the response in order to get that working ok, the shortest way to do it is by doing the res => res
            this.resInterceptor = axios.interceptors.response.use(res => res,error => {
                //here we will set the error the we receive if we get back a bad response
                this.setState({error:error});
                console.log(error)
                this.setState({response:true});
                return Promise.reject(error);
            });
        }

        //Here we are ejecting the request interceptors of this particular instance of returned by the withErrorHandler
        //due that we do not want all the interceptors to exist even if they are not being used now, otherwise we won't have a hoc component
        //because the more components we wrap with this one to intercept the errors, the more complexity we will get
        //so for every instance that we create of this returned component will store interceptors that we will need to eject once the component is unmounted
        //otherwise it could create memory leaks
        componentWillUnmount() {
            console.log('WillMount [WithErrorHandler]',this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        closeModalAndAcknowledgeErrorHandler = () => {
            this.setState({error:null})
        }

        render() {

            this.interceptErrors();

            let modalForErrors = null;
            if(this.state.response){
                // eslint-disable-next-line no-lone-blocks
                //{/*these are the properties we get back from the modal, that we can use in favor to handle the desired behavior*/}
                //{/*e.g. the Modal with the error message will be shown only if there is an error (show:true) and when using the modalClosed property*/}
                //{/*activated by the clicked property of the backdrop when clicking it, we will reset the error to null*/}
                modalForErrors = <Modal show={this.state.error} modalClosed={this.closeModalAndAcknowledgeErrorHandler}>
                    {/*since the Modal component will be present everytime (just is not being shown) and there wont be errors everytime*/}
                    {/*like when the Modal is build the first time, then we only will display the message of the error if there's an error, otherwise we won't*/}
                    {/*{this.state.error.message}*/}
                    {this.state.error ? this.state.error.message : null}
                </Modal>
            }

            return (
                <Aux>
                    {modalForErrors}
                    {/*Here it's receiving the wrapped component props*/}
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;