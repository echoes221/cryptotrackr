'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tickerActions from 'ducks/tickers';
import AddTicker from './containers/add-ticker';
import { FloatingButton } from 'components/buttons';
import Slider from 'components/slider';
import Ticker from 'components/ticker';
import CoinData from './containers/coin-data';

class Dashboard extends Component {
    constructor (props) {
        super(props);

        this.state = {
            dialogOpen: false,
            selectedTicker: null
        };
    }

    /**
     * When triggered sets the dialog open state to the inverse of what it was
     * previously.
     *
     * @for Dashboard
     * @handleOpenState
     */
    handleDialogOpenState () {
        this.setState({ dialogOpen: !this.state.dialogOpen });
    }

    render () {
        const { dialogOpen, selectedTicker } = this.state;
        const { tickers } = this.props;
        const { addTicker } = this.props.actions;

        return (
            <div>
                <Slider>
                    {tickers.map(tickerId =>
                        <div key = {tickerId} >
                            <Ticker options = {{ tickerId }} />
                        </div>
                    )}
                </Slider>
            </div>
        );
    }
}

Dashboard.propTypes = {
    tickers: PropTypes.array,
    actions: PropTypes.object
};

const mapStateToProps = (state) =>({
    tickers: state.tickers
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(tickerActions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

//
// <CoinData tickerId = {selectedTicker || tickers[0]}/>
// <AddTicker
//     open = {dialogOpen}
//     addTicker = {addTicker}
//     handleOpenState = {() => this.handleDialogOpenState()}
// />
// <FloatingButton onClick = {() => this.handleDialogOpenState()}/>
