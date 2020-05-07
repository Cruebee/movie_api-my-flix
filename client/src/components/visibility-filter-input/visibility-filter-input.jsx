import React from 'react';
import PropTypes from 'prop-types';
// Redux import
import { connect } from 'react-redux';
// React-bootstrap import
import Form from 'react-bootstrap/Form';
// Action import
import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="filter"
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);