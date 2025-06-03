import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

import RealtyCard from '../../components/realty/RealtyCard';
import RealtyFilters from '../../components/realty/RealtyFilters';
import Pagination from '../../components/common/Pagination';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const HomePage = () => {
  const [realtyList, setRealtyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    rooms: '',
    beds: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    distanceToSea: '',
    distanceToCenter: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: 'price', direction: 'asc' });

  const fetchRealtyList = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: currentPage,
        ordering: sortConfig.direction === 'asc' ? sortConfig.key : `-${sortConfig.key}`,
        ...filters.rooms && { rooms: filters.rooms },
        ...filters.beds && { beds: filters.beds },
        ...filters.type && { type: filters.type },
        ...filters.minPrice && { price_min: filters.minPrice },
        ...filters.maxPrice && { price_max: filters.maxPrice },
        ...filters.distanceToSea && { distance_to_sea: filters.distanceToSea },
        ...filters.distanceToCenter && { distance_to_center: filters.distanceToCenter },
        is_active: true,
      };

      const response = await axios.get('http://127.0.0.1:8000/api/realty/', { params });
      const itemsPerPage = response.data.page_size;
      setRealtyList(response.data.results);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
    } catch (err) {
      setError(err.message || 'Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealtyList();
  }, [currentPage, filters, sortConfig]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // сброс на первую страницу при смене фильтра
  };

  const handleSortChange = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
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
        <Typography color="error">Ошибка: {error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Header />

      <Box
        sx={{
          height: '180px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          mb: 4,
        }}
      >
        <Box sx={{ backgroundColor: 'rgba(0,0,0,0.5)', p: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Найдите идеальное жилье для отдыха
          </Typography>
          <Typography variant="h5">
            Арендуйте уютные апартаменты у моря по лучшим ценам
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="xl">
        <RealtyFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          sortConfig={sortConfig}
          onSortChange={handleSortChange}
        />

        {realtyList.length === 0 ? (
          <Box textAlign="center" my={4}>
            <Typography variant="h5">Нет объектов, соответствующих вашим критериям</Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={4} sx={{ mb: 4 }}>
              {realtyList.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <RealtyCard realty={item} />
                </Grid>
              ))}
            </Grid>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default HomePage;
