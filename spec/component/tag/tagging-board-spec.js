import React from 'react';
import {expect} from 'chai';
import * as sinon from "sinon";
import {shallow} from "enzyme";

import TaggingBoard from '../../../src/component/tag/tagging-board';
import ChipGroup from '../../../src/component/chips/chip-group';
import TextField from "../../../src/component/input/text-field";

describe('Tagging Board Spec', () => {

    const spyOnChangeSelectedTags = sinon.spy();
    const tags = [
        {id: 1, name: 'hello'},
        {id: 2, name: 'react'},
        {id: 3, name: 'tag'},
        {id: 4, name: 'world'},
    ];

    let wrapper;
    let instance;

    beforeEach(() => {
        wrapper = shallow(<TaggingBoard tags={tags}
                                        selectedTags={[]}
                                        onChangeSelectedTags={spyOnChangeSelectedTags}/>);
        instance = wrapper.instance();
    });

    afterEach(() => {
        spyOnChangeSelectedTags.reset();
    });

    describe('lifecycle', () => {
        it('set tag prop to reorderedTags state when tag prop changed', () => {
            wrapper.setState({reorderedTags: []});
            instance.componentWillReceiveProps({tags: [{id: 11, name: 'new tag'}]});

            expect(instance.state.reorderedTags).to.deep.equal([{id: 11, name: 'new tag'}]);
        });
    });

    describe('render', () => {
        describe('ChipGroup', () => {
            it('pass empty array to props.selectedItems when searchText exist', () => {
                wrapper.setState({searchText: 'hello'});

                expect(wrapper.find(ChipGroup).prop('selectedItems')).to.deep.equal([]);
            });

            it('pass filtered tags by selected tags to items', () => {
                wrapper.setProps({selectedTags: [{id: 1, name: 'tag1'}]});
                wrapper.setState({reorderedTags: [{id: 1, name: 'tag1'}, {id: 2, name: 'tag2'}],});
                expect(wrapper.find(ChipGroup).prop('items')).to.deep.equal([{id: 2, name: 'tag2'}]);
            });
        });

        describe('title', () => {
            it('show title when title exists', () => {
                expect(wrapper.find('.tagging-board-header__title').length).to.equal(0);
                wrapper.setProps({title: 'hello'});

                expect(wrapper.find('.tagging-board-header__title').text()).to.equal('hello');
            });

            it('show sub title when subTitle exists', () => {
                expect(wrapper.find('.tagging-board-header__sub-title').length).to.equal(0);
                wrapper.setProps({title: 'hello', subTitle: 'world'});

                expect(wrapper.find('.tagging-board-header__sub-title').text()).to.equal('world');
            });
        });

        describe('search area', () => {
            beforeEach(() => {
                wrapper.setProps({
                    enableSearch: true,
                    tags: [],
                });
            });

            it('show TextField when enableSearch is true', () => {
                expect(wrapper.find('.tagging-board-search').length).to.equal(1);
            });

            it('pass true to disabled when reorderedTags are empty', () => {
                wrapper.setState({reorderedTags: []});

                expect(wrapper.find(TextField).prop('disabled')).to.be.true;
            });

            it('pass false to disabled when reorderedTags are not empty', () => {
                wrapper.setState({reorderedTags: [{id: 1, name: 'a'}]});

                expect(wrapper.find(TextField).prop('disabled')).to.be.false;
            });
        });

        describe('search result', () => {
            it('show no search result text when enableSearch is true and matched tags by searchText are empty', () => {
                wrapper.setProps({tags: [{id: 1, name: 'a'}], emptySearchResultText: 'empty result', enableSearch: true});
                wrapper.setState({searchText: 'world'});

                expect(wrapper.find('.tagging-board__empty-search-result-text').length).to.equal(1);
                expect(wrapper.find('.tagging-board__empty-search-result-text').text()).to.equal('editTagPop.search.noResult');
            });

            it('hide no search result when matched tags by searchText exist', () => {
                wrapper.setProps({tags: [{id: 1, name: 'hello'}], emptySearchResultText: 'empty result', enableSearch: true});
                wrapper.setState({searchText: 'e'});

                expect(wrapper.find('.tagging-board__empty-search-result-text').length).to.equal(0);
            });

            it('hide no search result when enableSearch is false', () => {
                wrapper.setProps({tags: [{id: 1, name: 'a'}], emptySearchResultText: 'empty result', enableSearch: false});
                wrapper.setState({searchText: 'world'});

                expect(wrapper.find('.tagging-board__empty-search-result-text').length).to.equal(0);
            });

            it('hide no search result when searchText is empty', () => {
                wrapper.setProps({tags: [], emptySearchResultText: 'empty result', enableSearch: true});
                wrapper.setState({searchText: ''});

                expect(wrapper.find('.tagging-board__empty-search-result-text').length).to.equal(0);
            });
        });

        describe('empty tags', () => {
            it('show empty tags text when tags are empty', () => {
                wrapper.setProps({tags: []});

                expect(wrapper.find('.tagging-board__empty-items-text').length).to.equal(1);
                expect(wrapper.find('.tagging-board__empty-items-text').text()).to.equal('editTagPop.search.empty')
            });

            it('should not show empty text when tags exist', () => {
                wrapper.setProps({tags: [{id: 1, name: 'a'}]});

                expect(wrapper.find('.tagging-board__empty-items-text').length).to.equal(0);
            });
        });

        describe('ChipGroup', () => {
            it('should not show when reorderedTags are empty', () => {
                wrapper.setState({reorderedTags: []});

                expect(wrapper.find(ChipGroup).length).to.equal(0);
            });

            it('should not show when search result are empty', () => {
                wrapper.setProps({
                    enableSearch: true,
                    selectedTags: [{id: 2, name: 'b'}],
                });
                wrapper.setState({
                    searchText: 'b',
                    reorderedTags: [{id: 1, name: 'a'}, {id: 2, name: 'b'}],
                });

                expect(wrapper.find(ChipGroup).length).to.equal(0);
            });

            it('pass empty array to selectedItems when search text are not empty', () => {
                wrapper.setProps({
                    enableSearch: true,
                    selectedTags: [{id: 2, name: 'b'}],
                });
                wrapper.setState({
                    searchText: 'a',
                    reorderedTags: [{id: 1, name: 'a'}, {id: 2, name: 'b'}],
                });

                expect(wrapper.find(ChipGroup).prop('selectedItems')).to.deep.equal([]);
            });
        });
    });

    describe('events', () => {
        describe('TextField', () => {
            it('set search text to state when search text changed', () => {
                wrapper.find(TextField).simulate('change', {target: {value: 'hello'}});

                expect(instance.state.searchText).to.equal('hello');
            });
        });

        describe('ChipGroup', () => {
            describe('select event', () => {
                it('call onChangeSelectedTags with selectedTags when select event triggered', () => {
                    wrapper.setProps({selectedTags: []});
                    wrapper.find(ChipGroup).simulate('select', {id: 1, name: 'hello'});

                    expect(spyOnChangeSelectedTags.calledWith([{id: 1, name: 'hello'}])).to.true;
                });

                it('set empty string to state.searchText when chip add event triggered', () => {
                    wrapper.setProps({enableSearch: true});
                    wrapper.setState({searchText: 'hello'});
                    wrapper.find(ChipGroup).simulate('select', {id: 1, name: 'hello'});

                    expect(instance.state.searchText).to.equal('');
                });
            });

            describe('deselect event', () => {
                it('remove selected tag to selectedTags when deselect event triggered', () => {
                    wrapper.setProps({selectedTags: [{id: 1, name: 'hello'}]});
                    wrapper.setState({
                        reorderedTags: [{id: 1, name: 'hello'}, {id: 2, name: 'world'}]
                    });
                    wrapper.find(ChipGroup).simulate('deselect', {id: 1, name: 'hello'});

                    expect(instance.state.reorderedTags).to.deep.equal(
                        [{id: 2, name: 'world'}, {id: 1, name: 'hello'}]);
                });

                it('call onChangeSelectedTags with selectedTags when deselect event triggered', () => {
                    wrapper.setProps({selectedTags: [{id: 1, name: 'hello'}]});
                    wrapper.find(ChipGroup).simulate('deselect', {id: 1, name: 'hello'});

                    expect(spyOnChangeSelectedTags.calledWith([])).to.true;
                });
            });
        });
    });
});