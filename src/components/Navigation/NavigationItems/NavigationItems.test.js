import React from 'react';
import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigaitonItem/NavigationItem';

//This is the setup of the configuration for the adapter to the test
configure({adapter: new Adapter()});

describe('<NavigationItems>', () => {
    it('should render tho <NavigationItem> if not authenticated', () => {
        const wrapper = shallow(<NavigationItems/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
})