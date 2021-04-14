import React from "react";
import {configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurguerBuilder } from "./BurguerBuilder";
import BuildControls from "../../components/Burguer/BuildControls/BuildControls";

configure({adapter: new Adapter()});

describe('BurguerBuilder test', () => {

    let wrapper;

    beforeEach(() => {
        //This is done this way cuz the BurguerBuilder passes some properties in the componentDidMount, and this test complains about those
        //That maybe we use here, and the setProps of the wrapper set them up after the component is mounted
        //so is pretty late, then need to set them up when building the BurguerBuilder in the shallow instead, to catch them
        wrapper = shallow(<BurguerBuilder onInitIngredients={() => {}}/>);
    })

    it('should render BuildControls when receiving ingredients',  () => {
        wrapper.setProps({ings: {salad:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})