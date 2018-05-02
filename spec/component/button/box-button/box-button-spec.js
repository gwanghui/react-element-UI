import React from 'react';
import {expect} from 'chai';
import * as sinon from "sinon";
import {shallow} from "enzyme";
import MaterialFlatButton from 'material-ui/FlatButton';
import BoxButton from "../../../../src/component/button/box-button/box-button";

describe('BoxButton Spec', () => {
    const spyOnClick = sinon.spy();

    let wrapper;

    const defaultStyle = {
        padding: 0,
        height: '30px',
        minWidth: '30px',
        border: '1px solid #5c65c0',
        borderRadius: '0',
    };

    const defaultLabelStyle = {
        padding: '0 11px',
        fontSize: '13px',
        fontWeight: '600',
        lineHeight: '20px',
        display: 'block',
        color: '#2e3ab1',
    };

    const defaultProps = {
        style: defaultStyle,
        labelStyle: defaultLabelStyle,
        hoverColor: "#5c65c0",
    };

    beforeEach(() => {
        wrapper = shallow(<BoxButton label={'text'}/>);
    });

    describe('render', () => {
        it('default value', () => {
            expect(wrapper.find(MaterialFlatButton).exists()).to.true;
            expect(wrapper.find(MaterialFlatButton).getElement().props.style).to.deep.equal(defaultStyle);
            expect(wrapper.find(MaterialFlatButton).getElement().props.labelStyle).to.deep.equal(defaultLabelStyle);
            expect(wrapper.find(MaterialFlatButton).getElement().props.label).to.deep.equal('text');
        });

        it('specific value', () => {
            wrapper = shallow(<BoxButton label={'text2'}
                                         primary={true}
                                         secondary={false}
                                         disabled={false}
                                         fullWidth={true}
                                         backgroundColor={'#ffffff'}
                                         style={Object.assign({}, defaultStyle)}
                                         labelStyle={Object.assign({}, defaultLabelStyle)}
                                         onClick={spyOnClick}
            />);

            expect(wrapper.find(MaterialFlatButton).getElement().props.label).to.deep.equal('text2');
            expect(wrapper.find(MaterialFlatButton).getElement().props.primary).to.be.true;
            expect(wrapper.find(MaterialFlatButton).getElement().props.secondary).to.be.false;
            expect(wrapper.find(MaterialFlatButton).getElement().props.disabled).to.be.false;
            expect(wrapper.find(MaterialFlatButton).getElement().props.fullWidth).to.be.true;
            expect(wrapper.find(MaterialFlatButton).getElement().props.backgroundColor).to.deep.equal('#ffffff');
            expect(wrapper.find(MaterialFlatButton).getElement().props.style).to.deep.equal(defaultStyle);
            expect(wrapper.find(MaterialFlatButton).getElement().props.labelStyle).to.deep.equal(defaultLabelStyle);
            expect(wrapper.find(MaterialFlatButton).getElement().props.onClick).to.deep.equal(spyOnClick);
        });
    });

    describe('inner function', () => {
        const disabledBorder = '1px solid #c0c3e7';
        const disabledLabelColor = '#c0c3e7';

        const hoverBorder = '1px solid #5c65c0';
        const hoverLabelColor = '#ffffff';
        const hoverColor = '#5c65c0';

        const defaultBackgroundColor = undefined;

        let mockMaterialFlatButtonProps = {...defaultProps};

        describe('setPseudoClassStyle Spec', () => {
            it('set disabled style when disabled is true', () => {
                wrapper.setProps({disabled: true});

                wrapper.instance().setPseudoClassStyle(mockMaterialFlatButtonProps);

                expect(mockMaterialFlatButtonProps.style.border).to.be.deep.equal(disabledBorder);
                expect(mockMaterialFlatButtonProps.labelStyle.color).to.be.deep.equal(disabledLabelColor);
                expect(mockMaterialFlatButtonProps.style.backgroundColor).to.be.deep.equal(defaultBackgroundColor);
                expect(mockMaterialFlatButtonProps.hoverColor).to.be.deep.equal(defaultBackgroundColor);
            });

            it('set disabled style when disabled is true and hover is true', () => {
                wrapper.setProps({disabled: true});
                wrapper.setState({hover: true});

                wrapper.instance().setPseudoClassStyle(mockMaterialFlatButtonProps);

                expect(mockMaterialFlatButtonProps.style.border).to.be.deep.equal(disabledBorder);
                expect(mockMaterialFlatButtonProps.labelStyle.color).to.be.deep.equal(disabledLabelColor);
                expect(mockMaterialFlatButtonProps.style.backgroundColor).to.be.deep.equal(defaultBackgroundColor);
                expect(mockMaterialFlatButtonProps.hoverColor).to.be.deep.equal(defaultBackgroundColor);
            });

            it('set hover style when hover state is true and disabled is false', () => {
                wrapper.setProps({disabled: false});
                wrapper.setState({hover: true});

                wrapper.instance().setPseudoClassStyle(mockMaterialFlatButtonProps);

                expect(mockMaterialFlatButtonProps.style.border).to.be.deep.equal(hoverBorder);
                expect(mockMaterialFlatButtonProps.labelStyle.color).to.be.deep.equal(hoverLabelColor);
                expect(mockMaterialFlatButtonProps.style.backgroundColor).to.be.deep.equal(hoverColor);
                expect(mockMaterialFlatButtonProps.hoverColor).to.be.deep.equal(hoverColor);
            });

            it('set normal style when disable is false and hover is false', () => {
                wrapper.setProps({disabled: false});
                wrapper.setState({hover: false});

                wrapper.instance().setPseudoClassStyle(mockMaterialFlatButtonProps);

                expect(mockMaterialFlatButtonProps.style.border).to.be.deep.equal(defaultStyle.border);
                expect(mockMaterialFlatButtonProps.labelStyle.color).to.be.deep.equal(defaultLabelStyle.color);
                expect(mockMaterialFlatButtonProps.style.backgroundColor).to.be.deep.equal(defaultBackgroundColor);
                expect(mockMaterialFlatButtonProps.hoverColor).to.be.deep.equal(defaultBackgroundColor);
            });
        });
    });

    describe('event', () => {
        it('onMouseOver', () => {
            wrapper.find('div').simulate('mouseover');
            expect(wrapper.state('hover')).to.be.true;
        });

        it('onMouseLeave', () => {
            wrapper.setState({hover: true});

             wrapper.find('div').simulate('mouseleave');
             expect(wrapper.state('hover')).to.be.false;
        });
    });
});
