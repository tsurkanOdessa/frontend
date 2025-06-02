import React from 'react';
import { Rating as MuiRating } from '@mui/material';

const Rating = ({ value, ...props }) => {
  return (
    <MuiRating
      value={value}
      precision={0.5}
      readOnly
      {...props}
    />
  );
};

export default Rating;