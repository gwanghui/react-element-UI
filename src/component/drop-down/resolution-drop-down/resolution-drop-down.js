import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ResolutionView from "./resolution-view";
import ResolutionMenu from "./resolution-menu";

export default class ResolutionDropDown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpened: false,
            resolution: null,
        };

        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.selectResolutionAndCloseMenu = this.selectResolutionAndCloseMenu.bind(this);
    }

    openMenu() {
        this.setState({menuOpened: true});
    }

    closeMenu() {
        this.setState({menuOpened: false});
    }

    selectResolutionAndCloseMenu(resolution) {
        const {onChange} = this.props;

        this.setState({resolution, menuOpened: false});

        onChange(resolution);
    }

    render() {
        const {resolution, menuOpened} = this.state;

        return (
            <div>
                <ResolutionView onClick={this.openMenu} resolution={resolution} menuOpened={menuOpened}/>
                {
                    this.state.menuOpened &&
                    <ResolutionMenu items={this.props.resolutionItems}
                                    onItemSelected={this.selectResolutionAndCloseMenu}
                                    selectedItem={this.state.resolution}
                                    onBlur={this.closeMenu}
                    />
                }
            </div>
        )
    }
}

ResolutionDropDown.propTypes = {
    resolutionItems: PropTypes.array.isRequired,
    onChange: PropTypes.func,
};
