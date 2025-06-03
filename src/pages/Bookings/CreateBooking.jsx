import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import bookingsAPI from '../../api/bookings';
import { useEffect } from 'react';

const steps = ['Выбор дат', 'Подтверждение'];

const CreateBooking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate) {
      setError('Пожалуйста, выберите даты заезда и выезда');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await bookingsAPI.createBooking({
        date_from: startDate.toISOString().split('T')[0],
        date_to: endDate.toISOString().split('T')[0],
        guests,
        home: 1 // В реальном приложении это будет ID выбранного жилья
      });
      navigate('/bookings', { state: { bookingCreated: true } });
    } catch (err) {
      setError(err.response?.data?.detail || 'Ошибка при создании бронирования');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          Новое бронирование
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {activeStep === 0 && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Дата заезда"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  format="dd.MM.yyyy"
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={new Date()}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Дата выезда"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  format="dd.MM.yyyy"
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={startDate || new Date()}
                />
              </Grid>
              <Grid span={12}>
                <FormControl fullWidth>
                  <InputLabel>Количество гостей</InputLabel>
                  <Select
                    value={guests}
                    label="Количество гостей"
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </LocalizationProvider>
        )}

        {activeStep === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Подтверждение бронирования
            </Typography>
            <Typography paragraph>
              Пожалуйста, проверьте детали вашего бронирования:
            </Typography>

            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <Typography><strong>Дата заезда:</strong> {startDate?.toLocaleDateString()}</Typography>
              <Typography><strong>Дата выезда:</strong> {endDate?.toLocaleDateString()}</Typography>
              <Typography><strong>Гости:</strong> {guests}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">
                <strong>Итого:</strong> $1200
              </Typography>
            </Paper>

            <Typography variant="body2" color="text.secondary">
              Нажимая "Подтвердить", вы соглашаетесь с условиями бронирования.
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Назад
            </Button>
          )}

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Подтвердить'}
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Далее
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateBooking;