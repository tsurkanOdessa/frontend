import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  Divider,
  IconButton
} from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              RentHome
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Лучшие предложения по аренде жилья для вашего отдыха.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="linkedin">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Навигация
            </Typography>
            <Box display="flex" flexDirection="column">
              <MuiLink component={Link} to="/" color="inherit" underline="hover" mb={1}>
                Главная
              </MuiLink>
              <MuiLink component={Link} to="/realty" color="inherit" underline="hover" mb={1}>
                Каталог
              </MuiLink>
              <MuiLink component={Link} to="/about" color="inherit" underline="hover" mb={1}>
                О нас
              </MuiLink>
              <MuiLink component={Link} to="/contact" color="inherit" underline="hover">
                Контакты
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Помощь
            </Typography>
            <Box display="flex" flexDirection="column">
              <MuiLink component={Link} to="/faq" color="inherit" underline="hover" mb={1}>
                FAQ
              </MuiLink>
              <MuiLink component={Link} to="/terms" color="inherit" underline="hover" mb={1}>
                Условия использования
              </MuiLink>
              <MuiLink component={Link} to="/privacy" color="inherit" underline="hover">
                Политика конфиденциальности
              </MuiLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Контакты
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              г. Одесса, ул. Дерибасовская, 1
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              info@renthome.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              +38 (048) 123-45-67
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} RentHome. Все права защищены.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;