import React from 'react';
import { Box, Grid, TextField, MenuItem, Button, Typography, Paper } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';

const RealtyFilters = ({ filters, onFilterChange, sortConfig, onSortChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  const handleSort = (key) => {
    onSortChange(key);
  };

  const clearFilters = () => {
    onFilterChange({
      rooms: '',
      beds: '',
      minPrice: '',
      maxPrice: '',
      distanceToSea: '',
      distanceToCenter: '',
    });
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Box display="flex" alignItems="center" mb={2}>
        <TuneIcon color="primary" />
        <Typography variant="h6" ml={1}>Фильтры</Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            select
            fullWidth
            label="Комнаты"
            name="rooms"
            value={filters.rooms}
            onChange={handleChange}
          >
            <MenuItem value="">Любое</MenuItem>
            {[1, 2, 3, 4, 5].map((num) => (
              <MenuItem key={num} value={num}>
                {num} {num === 1 ? 'комната' : num < 5 ? 'комнаты' : 'комнат'}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            select
            fullWidth
            label="Спальные места"
            name="beds"
            value={filters.beds}
            onChange={handleChange}
          >
            <MenuItem value="">Любое</MenuItem>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label="Мин. цена"
            name="minPrice"
            type="number"
            value={filters.minPrice}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label="Макс. цена"
            name="maxPrice"
            type="number"
            value={filters.maxPrice}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            label="До моря (км)"
            name="distanceToSea"
            type="number"
            value={filters.distanceToSea}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={2}>
          <Box display="flex" alignItems="center" height="100%">
            <Button
              variant="outlined"
              onClick={clearFilters}
              fullWidth
            >
              Сбросить
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box display="flex" alignItems="center" mt={3}>
        <SortIcon color="primary" />
        <Typography variant="subtitle1" ml={1}>Сортировка:</Typography>
        <Button
          onClick={() => handleSort('price')}
          color={sortConfig.key === 'price' ? 'primary' : 'inherit'}
          sx={{ ml: 1 }}
        >
          По цене {sortConfig.key === 'price' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </Button>
        <Button
          onClick={() => handleSort('distance_to_sea')}
          color={sortConfig.key === 'distance_to_sea' ? 'primary' : 'inherit'}
          sx={{ ml: 1 }}
        >
          По удаленности от моря {sortConfig.key === 'distance_to_sea' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
        </Button>
      </Box>
    </Paper>
  );
};

export default RealtyFilters;