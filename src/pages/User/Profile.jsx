import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Button,
  TextField,
  Divider,
  CircularProgress,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  Bookmark,
  History,
  Settings
} from '@mui/icons-material';
import authAPI from '../../api/auth';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('accessToken');
        const userData = await authAPI.getUserProfile(token);
        setUser(userData);
        setFormData({
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('accessToken');
      await authAPI.updateUserProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email
      }, token);
      setUser(prev => ({
        ...prev,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email
      }));
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
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

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Мой профиль
          </Typography>

          {!editMode && (
            <Button
              variant="outlined"
              onClick={() => setEditMode(true)}
            >
              Редактировать
            </Button>
          )}
        </Box>

        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
          <Tab label="Профиль" icon={<Person />} />
          <Tab label="Бронирования" icon={<Bookmark />} />
          <Tab label="История" icon={<History />} />
          <Tab label="Настройки" icon={<Settings />} />
        </Tabs>

        {tabValue === 0 && (
          <Box>
            {editMode ? (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Имя"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Фамилия"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid span={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
                </Grid>

                <Box display="flex" justifyContent="flex-end" mt={3}>
                  <Button
                    variant="outlined"
                    onClick={() => setEditMode(false)}
                    sx={{ mr: 2 }}
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Сохранить'}
                  </Button>
                </Box>
              </form>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} display="flex" justifyContent="center">
                  <Avatar
                    alt={`${user.first_name} ${user.last_name}`}
                    src="/user-avatar.jpg"
                    sx={{ width: 150, height: 150 }}
                  />
                </Grid>

                <Grid item xs={12} md={8}>
                  <Typography variant="h5" gutterBottom>
                    {user.first_name} {user.last_name}
                  </Typography>

                  <Box display="flex" alignItems="center" mb={1}>
                    <Email color="action" sx={{ mr: 1 }} />
                    <Typography>{user.email}</Typography>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <Lock color="action" sx={{ mr: 1 }} />
                    <Typography>********</Typography>
                    <Button size="small" sx={{ ml: 1 }}>Изменить пароль</Button>
                  </Box>
                </Grid>
              </Grid>
            )}
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Активные бронирования
            </Typography>
            <Typography color="text.secondary">
              Здесь будут отображаться ваши текущие бронирования
            </Typography>
          </Box>
        )}

        {tabValue === 2 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              История бронирований
            </Typography>
            <Typography color="text.secondary">
              Здесь будет отображаться история ваших бронирований
            </Typography>
          </Box>
        )}

        {tabValue === 3 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Настройки аккаунта
            </Typography>
            <Typography color="text.secondary">
              Здесь будут настройки вашего аккаунта
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;