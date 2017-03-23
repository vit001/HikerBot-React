import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from './Header';
import * as actions from '../store/actions';

class Root extends Component {
  constructor(props) {
    super(props);
    this.getCurrentPositionClick = this.getCurrentPositionClick.bind(this);
    this.getPoints = this.getPoints.bind(this);
  }

  getCurrentPositionClick() {
    const {actions: {getCurrentPosition}} = this.props;
    getCurrentPosition();
  }

  getPoints() {
    const {bounds, zoom, actions: {getPoints}} = this.props;
    getPoints(bounds, zoom);
  }

  render() {
    const {children} = this.props;
    return (
      <div className="container-fluid">
        <button onClick={this.getCurrentPositionClick}>Get Current Position</button>
        <button onClick={this.getPoints}>Get Points</button>
        <Header/>
          {children}
      </div>
    );
  }
}

export default connect(
  ({map: {bounds, zoom}}) => ({bounds, zoom}),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Root);