import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Rating,
  Divider,
  CircularProgress,
  Tab,
  Tabs,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton
} from '@mui/material';
import {
  Place,
  KingBed,
  Bathtub,
  SquareFoot,
  Wifi,
  AcUnit,
  Pets,
  BeachAccess,
  DirectionsCar,
  Star,
  Share,
  Favorite
} from '@mui/icons-material';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import BookingForm from '../../components/bookings/BookingForm';
import realtyAPI from '../../api/realty';

const RealtyDetail = () => {
  const { id } = useParams();
  const [realty, setRealty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchRealty = async () => {
      try {
        setLoading(true);
        const response = await realtyAPI.getRealtyDetail(id);
        setRealty(response);

        const galleryImages = response.images?.map(img => ({
          original: img.url,
          thumbnail: img.thumbnail
        })) || [{ original: '/default-property.jpg', thumbnail: '/default-property-thumb.jpg' }];

        setImages(galleryImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRealty();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  if (!realty) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            {realty.title}
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={4.5} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary" ml={1}>
              24 отзыва
            </Typography>
            <Box display="flex" alignItems="center" ml={2}>
              <Place fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" ml={0.5}>
                {realty.address?.city}, {realty.address?.street}, {realty.address?.house_number}
              </Typography>
            </Box>
          </Box>

          <Box mb={4}>
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={false}
              showNav={false}
            />
          </Box>

          <Box display="flex" justifyContent="space-between" mb={3}>
            <Box>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
              <IconButton aria-label="add to favorites">
                <Favorite />
              </IconButton>
            </Box>
            <Typography variant="h5" fontWeight="bold">
              ${realty.price} <Typography component="span" variant="body1">/ ночь</Typography>
            </Typography>
          </Box>

          <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box display="flex" alignItems="center">
                  <KingBed color="action" />
                  <Box ml={1}>
                    <Typography variant="body2">Спальных мест</Typography>
                    <Typography fontWeight="bold">{realty.beds}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box display="flex" alignItems="center">
                  <Bathtub color="action" />
                  <Box ml={1}>
                    <Typography variant="body2">Комнат</Typography>
                    <Typography fontWeight="bold">{realty.rooms}</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box display="flex" alignItems="center">
                  <SquareFoot color="action" />
                  <Box ml={1}>
                    <Typography variant="body2">Площадь</Typography>
                    <Typography fontWeight="bold">{realty.area} м²</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box display="flex" alignItems="center">
                  <BeachAccess color="action" />
                  <Box ml={1}>
                    <Typography variant="body2">До моря</Typography>
                    <Typography fontWeight="bold">{realty.distance_to_sea} км</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
            <Tab label="Описание" />
            <Tab label="Удобства" />
            <Tab label="Отзывы" />
          </Tabs>

          <Divider sx={{ mb: 3 }} />

          {tabValue === 0 && (
            <Typography variant="body1" paragraph>
              {realty.description}
            </Typography>
          )}

          {tabValue === 1 && (
            <Grid container spacing={2}>
              {realty.attributes?.map(attr => (
                <Grid item xs={6} sm={4} key={attr.id}>
                  <Box display="flex" alignItems="center">
                    <Star color="primary" fontSize="small" />
                    <Typography variant="body1" ml={1}>{attr.name}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" mb={2}>Отзывы гостей</Typography>
              <List>
                {[1, 2, 3].map((item) => (
                  <ListItem key={item} alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="User" src="/user-avatar.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Александр Петров"
                      secondary={
                        <>
                          <Rating value={5} readOnly size="small" />
                          <Typography variant="body2" color="text.primary">
                            Отличное место для отдыха! Все было просто замечательно.
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            15 мая 2023
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
            <BookingForm realty={realty} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RealtyDetail;