import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import DragArea from "../../../src/component/drag-area/drag-area";

describe('Search Area Spec', () => {
    let wrapper;
    let spySetSelectedContentsItemIds = sinon.spy();

    const folders = [{id:1}];
    const contents = [{id:3}];

    const headerHeight = 200;
    const wrapperClassName = 'some class name';

    beforeEach(() => {
        wrapper = shallow(<DragArea isDrawing={false}
                                    isPressCtrlKey={false}
                                    isEnableSelectFolder={true}
                                    headerHeight={headerHeight}
                                    wrapperClassName={wrapperClassName}
                                    startArea={undefined}
                                    endArea={undefined}
                                    contents={contents}
                                    folders={folders}
                                    selectedContentsItemIds={[]}
                                    setSelectedContentsItemIds={spySetSelectedContentsItemIds}
        />);
    });

    afterEach(() => {
        spySetSelectedContentsItemIds.reset();
    });

    describe('render test', () => {
        it('one div is rendered', () => {
            expect(wrapper.find('div')).to.be.lengthOf(1);
        });
    });

    describe('componentWillReceiveProps test', () => {
        beforeEach(() => {
            sinon.stub(wrapper.instance(), 'setChangedAreaStyle').returns('updated style');
        });

        afterEach(() => {
            wrapper.instance().setChangedAreaStyle.reset();
        });

        it('when folders or contents is changed, set ids array from folders and contents and calculate total folder height', () => {
            wrapper.instance().componentWillReceiveProps({folders: [{id: 1},{id: 2},{id: 3}], contents: [{id: 4},{id: 5},{id: 6}]});

            expect(wrapper.instance().itemsIds).to.be.deep.equal([1,2,3,4,5,6]);
            expect(wrapper.instance().totalFolerHeight).to.be.deep.equal(123);
        });

        it('props.endArea is not exist or when selectedContentsItemIds is changed, then do not anything', () => {
            wrapper.instance().style = {style: 'some style'};

            wrapper.instance().componentWillReceiveProps({folders, contents});
            wrapper.setProps({endArea: {}, selectedContentsItemIds: ["1"]});
            wrapper.instance().componentWillReceiveProps({folders, contents, selectedContentsItemIds: ["2"]});

            expect(wrapper.instance().style).to.be.deep.equal({style: 'some style'});
            expect(wrapper.instance().setChangedAreaStyle.called).to.be.false;
        });

        it('when isDrawing is false, then initialize', () => {
            wrapper.instance().preHandleIds = ["1", "2"];
            wrapper.setProps({endArea: {}});
            wrapper.setProps({isDrawing: false});

            expect(wrapper.instance().style).to.be.deep.equal({
                position: 'fixed',
                backgroundColor: 'rgba(92, 101, 192, 0.1)',
                border: '1px solid #2e3ab1',
                zIndex: 5,
                display: 'none',
            });
            expect(wrapper.instance().preHandleIds).to.be.deep.equal([]);
        });

        it('area is changed, then call getChangedAreaStyle', () => {
            const nextProps = {
                endArea: {
                    point: {X: 1, Y: 1}
                }
            };

            wrapper.setProps({endArea: {point: {X: 0, Y: 0}}, isDrawing: true});
            wrapper.setProps(nextProps);

            expect(wrapper.instance().setChangedAreaStyle.called).to.be.true;
        });
    });

    describe('setChangedAreaStyle test', () => {
        beforeEach(() => {
            sinon.stub(wrapper.instance(), 'selectItemInDragArea');
        });

        afterEach(() => {
            wrapper.instance().selectItemInDragArea.reset();
        });

        it('when drag to right and down, then set style and call selectItemInDragArea', () => {
            const props = {
                startArea: {point: {X: 0, Y: 0}, scroll: {top: 0, left: 0}},
                endArea: {point: {X: 100, Y: 100}, scroll: {top: 100, left: 100}},
            };

            wrapper.instance().setChangedAreaStyle(props);
            expect(wrapper.instance().style).to.be.deep.equal({
                position: 'fixed',
                backgroundColor: 'rgba(92, 101, 192, 0.1)',
                border: '1px solid #2e3ab1',
                zIndex: 5,
                display: 'block',
                top: '-100px',
                left: '-100px',
                width: '200px',
                height: '200px',
            });
            expect(wrapper.instance().selectItemInDragArea.calledWith(props, 200, 200)).to.be.true;
        });

        it('when drag to left and up, then set style and call selectItemInDragArea', () => {
            const props = {
                startArea: {point: {X: 100, Y: 100}, scroll: {top: 100, left: 100}},
                endArea: {point: {X: 0, Y: 0}, scroll: {top: 0, left: 0}},
            };

            wrapper.instance().setChangedAreaStyle(props);
            expect(wrapper.instance().style).to.be.deep.equal({
                position: 'fixed',
                backgroundColor: 'rgba(92, 101, 192, 0.1)',
                border: '1px solid #2e3ab1',
                zIndex: 5,
                display: 'block',
                top: '0px',
                left: '0px',
                width: '200px',
                height: '200px',
            });
            expect(wrapper.instance().selectItemInDragArea.calledWith(props, -200, -200)).to.be.true;
        });
    });

    describe('selectItemInDragArea test', () => {
        const folders = [
            {id: 'folder1', name: 'folder1'}, {id: 'folder2', name: 'folder2'}, {id: 'folder3', name: 'folder3'},
            {id: 'folder4', name: 'folder4'}, {id: 'folder5', name: 'folder5'}, {id: 'folder6', name: 'folder6'}
        ];

        const contents = [
            {id: 'content1', name: 'content1'}, {id: 'content2', name: 'content2'}, {id: 'content3', name: 'content3'},
            {id: 'content4', name: 'content4'}, {id: 'content5', name: 'content5'}, {id: 'content6', name: 'content6'}
        ];

        const selectedContentsItemIds = ['folder6', 'content1'];

        const props = {
            folders, contents, selectedContentsItemIds,
            setSelectedContentsItemIds: spySetSelectedContentsItemIds,
            isPressCtrlKey: false, isEnableSelectFolder: true,
            headerHeight,
            wrapperClassName,
        };

        beforeEach(() => {
            wrapper.setProps({folders, contents});
        });

        it('when selected item is only folder, call setSelectedContentsItemIds with selected items', () => {
            let newProps = {...props};
            newProps.startArea = {
                point: {X: 0, Y: headerHeight}, scroll: {top: 0, left: 0}, className: wrapperClassName
            };
            newProps.endArea = {
                point: {X: 100, Y: headerHeight + 100}, scroll: {top: 100, left: 0}, className: 'some class'
            };

            wrapper.instance().selectItemInDragArea(newProps, -100, 200);
            expect(spySetSelectedContentsItemIds.calledWith(
                ['folder1', 'folder2', 'folder3', 'folder4', 'folder5']
            )).to.be.true;
        });

        it('when selected item is folder and contents, call setSelectedContentsItemIds with selected items', () => {
            let newProps = {...props};
            newProps.startArea = {
                point: {X: 100, Y: headerHeight + 200}, scroll: {top: 200, left: 0}, className: wrapperClassName
            };
            newProps.endArea = {
                point: {X: 0, Y: headerHeight + 100}, scroll: {top: 0, left: 0}
            };

            wrapper.instance().selectItemInDragArea(newProps, -100, -300);
            expect(spySetSelectedContentsItemIds.calledWith(
                ['folder3', 'folder4', 'folder5', 'folder6', 'content1', 'content2', 'content3']
            )).to.be.true;
        });

        it('when selected item is only contents, call setSelectedContentsItemIds with selected items', () => {
            let newProps = {...props};
            newProps.startArea = {
                point: {X: 0, Y: headerHeight + 246}, scroll: {top: 0, left: 0}, className: wrapperClassName
            };
            newProps.endArea = {
                point: {X: 100, Y: headerHeight + 446}, scroll: {top: 100, left: 0}, className: 'some-class'
            };

            wrapper.instance().selectItemInDragArea(newProps, -100, 300);

            expect(spySetSelectedContentsItemIds.calledWith(
                ['content1', 'content2', 'content3', 'content4', 'content5']
            )).to.be.true;
        });

        it('when endArea.point.Y is less than headerHeight, call setSelectedContentsItemIds with empty items', () => {
            let newProps = {...props};
            newProps.startArea = {
                point: {X: 0, Y: 0}, scroll: {top: 0, left: 0}, className: 'some-class'
            };
            newProps.endArea = {
                point: {X: 100, Y: 100}, scroll: {top: 0, left: 0}
            };

            wrapper.instance().selectItemInDragArea(newProps, -100, 100);

            expect(spySetSelectedContentsItemIds.calledWith([])).to.be.true;
        });

        it('when drag with ctrl key, then pre selected item is unselected and new selected item is selected', () => {
            let newProps = {...props};
            newProps.isPressCtrlKey = true;
            newProps.selectedContentsItemIds = ['folder4', 'folder5', 'folder6'];
            newProps.startArea = {
                point: {X: 0, Y: 221+220}, scroll: {top: 0, left: 0}, className: wrapperClassName
            };
            newProps.endArea = {
                point: {X: 100, Y: 221+340}, scroll: {top: 0, left: 0}, className: 'some-class'
            };

            wrapper.instance().selectItemInDragArea(newProps, -100, 105);

            expect(spySetSelectedContentsItemIds.calledWith(
                ['folder4', 'folder5', 'content1', 'content2']
            )).to.be.true;
        });

        it('when isEnableSelectFolder is false, call setSelectedContentsItemIds without folder items', () => {
            let newProps = {...props};
            newProps.startArea = {
                point: {X: 0, Y: headerHeight + 200}, scroll: {top: 0, left: 0}, className: wrapperClassName
            };
            newProps.endArea = {
                point: {X: 100, Y: headerHeight + 400}, scroll: {top: 0, left: 0}
            };
            newProps.isEnableSelectFolder = false;

            wrapper.instance().selectItemInDragArea(newProps, 100, 200);
            expect(spySetSelectedContentsItemIds.calledWith(
                ['content1', 'content2', 'content3']
            )).to.be.true;
        });
    });
});