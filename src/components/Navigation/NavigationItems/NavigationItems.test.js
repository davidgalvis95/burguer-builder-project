import React from 'react';
import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigaitonItem/NavigationItem';

//This is the setup of the configuration for the adapter to the test
configure({adapter: new Adapter()});

describe('<NavigationItems>', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems/>);
    })

    it('should render two <NavigationItem> if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('should render three <NavigationItem> if authenticated', () => {
        wrapper = shallow(<NavigationItems/>).setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
})