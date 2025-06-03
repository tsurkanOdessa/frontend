import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  Event,
  Person,
  Home,
  Paid,
  ArrowBack,
  Cancel,
  CheckCircle
} from '@mui/icons-material';
import bookingsAPI from '../../api/bookings';

const BookingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        const response = await bookingsAPI.getBookingDetail(id,token);
        setBooking(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const handleCancel = async () => {
    if (!window.confirm('Вы уверены, что хотите отменить бронирование?')) return;

    setCancelLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      await bookingsAPI.cancelBooking(id,token);
      navigate('/bookings', { state: { bookingCancelled: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setCancelLoading(false);
    }
  };

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
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!booking) return null;


  return (
   <>
   <Header />

    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/bookings')}
        sx={{ mb: 2 }}
      >
        Назад к бронированиям
      </Button>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Бронирование #{booking.id}
          </Typography>
          <Chip
            label={booking.status}
            color={
              booking.status === 'confirmed' ? 'success' :
              booking.status === 'cancelled' ? 'error' : 'warning'
            }
            icon={
              booking.status === 'confirmed' ? <CheckCircle /> :
              booking.status === 'cancelled' ? <Cancel /> : null
            }
          />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Детали бронирования
            </Typography>

            <List>
              <ListItem>
                <ListItemText
                  primary="Даты"
                  secondary={`${new Date(booking.date_from).toLocaleDateString()} - ${new Date(booking.date_to).toLocaleDateString()}`}
                  secondaryTypographyProps={{ display: 'flex', alignItems: 'center' }}
                />
                <Event color="action" sx={{ ml: 1 }} />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Гости"
                  secondary={booking.guests}
                  secondaryTypographyProps={{ display: 'flex', alignItems: 'center' }}
                />
                <Person color="action" sx={{ ml: 1 }} />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Жилье"
                  secondary={booking.home.title}
                  secondaryTypographyProps={{ display: 'flex', alignItems: 'center' }}
                />
                <Home color="action" sx={{ ml: 1 }} />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Стоимость"
                  secondary={`$${booking.price}`}
                  secondaryTypographyProps={{ display: 'flex', alignItems: 'center' }}
                />
                <Paid color="action" sx={{ ml: 1 }} />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Контактная информация
            </Typography>



            <List>
              <ListItem>
                <ListItemText
                  primary="Имя"
                  secondary={booking.renter.first_name}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Email"
                  secondary={booking.renter.email}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Телефон"
                  secondary="+7 (123) 456-78-90"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="flex-end">
          {booking.status !== 'cancelled' && (
            <Button
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              onClick={handleCancel}
              disabled={cancelLoading}
              sx={{ mr: 2 }}
            >
              {cancelLoading ? <CircularProgress size={24} /> : 'Отменить бронирование'}
            </Button>
          )}

          <Button
            variant="contained"

              onClick={() => {
                console.log('Booking object:', booking); // Добавьте это для отладки
                const homeId = booking?.home;
                if (homeId) {
                  navigate(`/realty/${homeId}`);
                } else {
                  console.warn('home.id отсутствует в booking:', booking);
                  alert('Ошибка: жильё не найдено. Проверьте консоль для подробностей.');
                }
              }}
          >
            Посмотреть жилье
          </Button>

        </Box>
      </Paper>
    </Container>

      <Footer />
      </>
  );
};

export default BookingDetail;