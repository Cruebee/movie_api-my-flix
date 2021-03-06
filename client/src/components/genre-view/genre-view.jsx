import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// react-router imports
import { Link } from 'react-router-dom';

import './genre-view.scss';

/**
 * @function GenreView displays Genres
 * @description Displays Genres and info, Name and Description.
 * @param {string} props - genre, movies
 * @returns {GenreView}
 */
export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { Genre } = this.props;

    if (!Genre) return null;

    return (
      <Card className='genre-view' style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title className='genre-info'>
            <span className='label'>Name: </span>
            {Genre[0].Name}
          </Card.Title>
          <Card.Text className='genre-info'>
            <span className='label'>Description: </span>
            {Genre[0].Description}
          </Card.Text>
          <Link to={`/`}>
            <Button variant='btn' className='back-button'>
              Back
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

GenreView.propTypes = {
  Genre: arrayOf(
    PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    })
  ).isRequired,
};
