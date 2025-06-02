import React from 'react';
import { Card as MuiCard } from '@mui/material';

const Card = ({ children, ...props }) => {
  return (
    <MuiCard elevation={3} {...props}>
      {children}
    </MuiCard>
  );
};

export default Card;