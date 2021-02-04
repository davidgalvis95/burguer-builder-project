import React, {useEffect, useState} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandlerFunctional = (WrappedComponent, axios) => {
    return props => {

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [error, setError] = useState(null);
        const requestInterceptor = axios.interceptors.request.use(
            req => {
                setError(null);
                return req;
            }
        );
        const responseInterceptor = axios.interceptors.response.use(
            res => res,
            error => {
                setError(error);
                console.log('WithErrorHandler: ', error);
                return Promise.reject(error);
            }
        );

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(
            () => {
                return () => {
                    axios.interceptors.request.eject(requestInterceptor);
                    axios.interceptors.response.eject(responseInterceptor);
                };
            },
            [requestInterceptor, responseInterceptor]
        );
        return <>
            <Modal
                show={error !== null}
                modalClosed={() => setError(null)}
            >
                {error !== null ? error.message : null}
            </Modal>
            <WrappedComponent {...props}/>
        </>
    };
};
export default withErrorHandlerFunctional;