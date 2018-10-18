import React, { Component } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import './Layout.scss';

class Layout extends Component {
  render() {
    const { route: { routes } = {} } = this.props;
    return (
      <div className="is-fluid od-layout-class-placeholder">
        { renderRoutes(routes) }
      </div>
    );
  }
}

Layout.propTypes = {
  route: PropTypes.object
};

Layout.defaultProps = {
  route: undefined
};

const mapStateToProps = () => {
  return { };
};

export default connect(mapStateToProps)(Layout);
