import React from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import './itemStyle.scss';

const TestLevelsSelectorItem = ({ title, description }) => {

  return (
    <div className='test-level-selector-item'>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
        <Button 
            disableElevation 
            className="btn" 
            variant="contained" 
            color="primary"
            component={Link} 
            to="/test"> 
          Take test
      </Button>
    </div>
  );
};

TestLevelsSelectorItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default TestLevelsSelectorItem;
