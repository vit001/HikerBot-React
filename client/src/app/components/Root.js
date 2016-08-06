import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../store/actions';
import MapView from '../../map/index';

class Root extends Component {
  render() {
    const {loading, error} = this.props;
    if (error) {
      return <div>{error}</div>;
    }

    return loading
      ? <div>loading</div>
      : <MapView />;
  }
}

export default connect(
  ({error, data}) => ({
    error,
    loading: error === null && data === null
  }),
  dispatch => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(Root);