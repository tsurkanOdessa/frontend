import React, { useState, useEffect } from 'react';
import axios from 'axios';
const isAuthenticated = !!localStorage.getItem('accessToken');
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  Chip
} from '@mui/material';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/reserve/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookings(response.data.results);
      } catch (error) {
        console.error('Ошибка загрузки бронирований:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <CircularProgress />
        </Box>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
          <Typography color="error">Error: {error}</Typography>
        </Box>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Мои бронирования
          </Typography>
          <Button
            component={Link}
            to="/bookings/new"
            variant="contained"
            color="primary"
          >
            Новое бронирование
          </Button>
        </Box>

        {bookings.length === 0 ? (
          <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" mb={2}>
              У вас пока нет бронирований
            </Typography>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              color="primary"
            >
              Найти жилье
            </Button>
          </Paper>
        ) : (
          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Жилье</TableCell>
                  <TableCell>Даты</TableCell>
                  <TableCell>Гости</TableCell>
                  <TableCell>Цена</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <HomeIcon color="action" sx={{ mr: 1 }} />
                        <Typography>{booking.home.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <EventIcon color="action" sx={{ mr: 1 }} />
                        <Typography>
                          {new Date(booking.date_from).toLocaleDateString()} -{' '}
                          {new Date(booking.date_to).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <PersonIcon color="action" sx={{ mr: 1 }} />
                        <Typography>{booking.guests}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <PaidIcon color="action" sx={{ mr: 1 }} />
                        <Typography>${booking.price}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        color={getStatusColor(booking.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {isAuthenticated && (
                        <Button
                          component={Link}
                          to={`/bookings/${booking.id}`}
                          variant="outlined"
                          size="small"
                        >
                          Подробнее
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default BookingList;
