import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Button, Chip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';
import KingBedIcon from '@mui/icons-material/KingBed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

const RealtyCard = ({ realty }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="100"
        image={realty.image || '/default-property.jpg'}
        alt={realty.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="h6" component="h3" fontWeight="bold">
            {realty.title}
          </Typography>
          <Rating value={4.5} precision={0.5} readOnly />
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <PlaceIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" ml={0.5}>
            {realty.address?.city}, {realty.address?.street}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box display="flex" alignItems="center">
            <KingBedIcon fontSize="small" color="action" />
            <Typography variant="body2" ml={0.5}>
              {realty.beds} спальных мест
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <SquareFootIcon fontSize="small" color="action" />
            <Typography variant="body2" ml={0.5}>
              {realty.area} м²
            </Typography>
          </Box>
        </Box>

        <Box mb={2}>
          {realty.attributes?.map(attr => (
            <Chip key={attr.id} label={attr.name} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
          ))}
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            ${realty.price} <Typography variant="body2" component="span">/ ночь</Typography>
          </Typography>
          <Button
            component={Link}
            to={`/realty/${realty.id}`}
            variant="contained"
            color="primary"
            size="small"
          >
            Подробнее
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RealtyCard;