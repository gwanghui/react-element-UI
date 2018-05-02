import React from 'react';
import {expect} from 'chai';
import {shallow} from "enzyme";
import sinon from "sinon";

import TextField from "../../../src/component/input/text-field";

describe('Text Field Component spec', () => {
    const spyOnChange = sinon.spy();

    let wrapper;
    let instance;

    beforeEach(() => {
        wrapper = shallow(<TextField label={'some label'}
                                     onChange={spyOnChange}
                                     focusOnMount={true}
                                     name={'some text field'}
        />);

        instance = wrapper.instance();
    });

    afterEach(() => {
        spyOnChange.reset();
    });

    describe('lifecycle', () => {
        it('calls textField.focus when props.focusOnMount is true and componentDidMount is called', () => {
            instance.textField = {
                focus: sinon.spy()
            };

            instance.componentDidMount();

            expect(instance.textField.focus.called).to.be.true;
        });
        
        it('when value in props is exist, set cursor point to end of value', () => {
            wrapper.setProps({value: 'some value'});
            instance.textField = {
                focus: () => {},
                input: {}
            };
            instance.componentDidMount();

            expect(wrapper.instance().textField.input.selectionStart).to.be.equal(10);
        });
    });
});