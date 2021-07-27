import React from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import './testLevelSelectorItem.scss';

const TestLevelsSelectorItem = ({ title, description }) => {

  return (
    <div className='test-level-selector-item'>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <Link to="/test" className='btn'>
        <Button variant="contained" color="primary">
        Take test
        </Button>
      </Link>
    </div>
  );
};

TestLevelsSelectorItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TestLevelsSelectorItem;
