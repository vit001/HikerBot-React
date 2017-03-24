import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from './Header';
import * as actions from '../store/actions';

class Root extends Component {
  constructor(props) {
    super(props);
    this.getCurrentPosition = this.getCurrentPosition.bind(this);
    this.getPoints          = this.getPoints.bind(this);
    this.getDetailPoint     = this.getDetailPoint.bind(this);
  }

  getCurrentPosition() {
    const {actions: {getCurrentPosition}} = this.props;
    getCurrentPosition();
  }

  getPoints() {
    const {bounds, zoom, actions: {getPoints}} = this.props;
    getPoints(bounds, zoom);
  }

  getDetailPoint() {
      // For testing
      let id      = 350;    // Campo Trading Post
      let version = 0; // 0 = Latest Version
      getDetailPoint(id, version);
  }

  render() {
    const {children} = this.props;
    return (
      <div className="container-fluid">
          <button onClick={this.getCurrentPosition}>Get Current Position</button>
          <button onClick={this.getPoints}>Get Points</button>
          <button onClick={this.getDetailPoint}>Get Point Detail</button>
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