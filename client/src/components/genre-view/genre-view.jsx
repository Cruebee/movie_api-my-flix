import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// react-router imports
import { Link } from 'react-router-dom';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { Genre } = this.props;

    if (!Genre) return null;

    return (
      <Card className="genre-view" style={{ width: "32rem" }}>
        <Card.Body>
          <Card.Title className="genre-name">Name: {Genre[0].Name}</Card.Title>
          <Card.Text className="genre-description">Description: {Genre[0].Description}</Card.Text>
          <Link to={`/`}>
            <Button
              variant="primary"
            >
              Back
          </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
