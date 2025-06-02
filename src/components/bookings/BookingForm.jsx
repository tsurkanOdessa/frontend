import React, { useState } from 'react';

import {
  Box, Typography, TextField, Button, Grid, Divider, FormControl,
  InputLabel, Select, MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import bookingsAPI from '../../api/bookings';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const BookingForm = ({ realty }) => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert("Выберите даты заезда и выезда");
      return;
    }

    const token = localStorage.getItem('accessToken');

    const bookingData = {
      home: realty.id,
      price: realty.price,
      date_from: format(startDate, 'yyyy-MM-dd'),
      date_to: format(endDate, 'yyyy-MM-dd'),
      guests,
    };


    try {
      const data = await bookingsAPI.createBooking(bookingData, token);
      alert('Бронирование успешно создано!');
      console.log(data);
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.error('Ошибка ответа от сервера:', error.response.data);
        alert('Ошибка: ' + JSON.stringify(error.response.data));
      } else if (error.request) {
        console.error('Нет ответа от сервера:', error.request);
        alert('Сервер не отвечает');
      } else {
        console.error('Ошибка запроса:', error.message);
        alert('Произошла ошибка: ' + error.message);
      }
    }

  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          {realty.price} <Typography component="span">/ ночь</Typography>
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Заезд"
              value={startDate}
              onChange={setStartDate}
              format="dd.MM.yyyy"
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDate={new Date()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Выезд"
              value={endDate}
              onChange={setEndDate}
              format="dd.MM.yyyy"
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDate={startDate || new Date()}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Гости</InputLabel>
              <Select
                value={guests}
                label="Гости"
                onChange={(e) => setGuests(e.target.value)}
              >
                {[...Array(realty.beds).keys()].map((num) => (
                  <MenuItem key={num + 1} value={num + 1}>
                    {num + 1} {num + 1 === 1 ? 'гость' : num + 1 < 5 ? 'гостя' : 'гостей'}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Забронировать
        </Button>

        <Typography variant="body2" color="text.secondary" mt={2} textAlign="center">
          Без предоплаты. Оплата при заселении.
        </Typography>
      </Box>
    </LocalizationProvider>
  );
};

export default BookingForm;
