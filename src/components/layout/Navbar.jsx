import { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Slide, useScrollTrigger, Button, useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileMenu from './MobileMenu';
import { useLocation } from 'react-router-dom';
import dataloreImage from '/college logo.png';
import dataloreLogoSvg from '/weblogo.png';
import arqlogo from  '/arq logo.png'; 

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const trigger = useScrollTrigger();
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pages = [
    { title: 'Home', path: '/' },
    { 
title: 'Events', path: '/events',
    },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Toolbar spacer */}
      <Box
        sx={{
          height: { 
            xs: '60px',   // Extra small screens
            sm: '70px',   // Small screens
            md: '80px',   // Medium screens
            lg: scrolled ? '100px' : '120px' // Large screens
          },
          transition: 'all 0.3s ease-in-out'
        }}
      />
      
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar 
          position="fixed" 
          sx={{ 
            background: scrolled 
              ? 'rgba(10, 10, 10, 0.95)' 
              : 'rgba(18, 18, 18, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '2px solid rgba(156, 39, 176, 0.1)',
            transition: 'all 0.3s ease-in-out',
            boxShadow: scrolled 
              ? '0 4px 20px rgba(156, 39, 176, 0.15)' 
              : 'none',
          }}
        >
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            px: { xs: 2, sm: 3, md: 0 },
            position: 'relative'
          }}>
            {/* DATALORE Logo */}
            <RouterLink to="/">
              <Box
                component="img"
                src={dataloreLogoSvg}
                alt="DATALORE Logo"
                sx={{
                  height: { 
                    xs: '35px',
                    sm: '40px',
                    md: '45px',
                    lg: scrolled ? '50px' : '55px'
                  },
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
            </RouterLink>

            {/* Desktop Navigation - Centered */}
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: { md: 3, lg: 4 },
              justifyContent: 'center',
              flex: 1,
              mx: 4
            }}>
              {pages.map((page, index) => (
                <motion.div
                  key={page.title}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={RouterLink}
                    to={page.path}
                    sx={{
                      color: location.pathname === page.path ? '#BA68C8' : 'white',
                      fontSize: { md: '1.1rem', lg: '1.25rem' },
                      padding: { md: '10px 20px', lg: '12px 24px' },
                      fontWeight: 600,
                      letterSpacing: '0.5px',
                      position: 'relative',
                      minWidth: 'auto',
                      whiteSpace: 'nowrap',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: location.pathname === page.path ? '80%' : '0',
                        height: '2px',
                        background: 'linear-gradient(90deg, #9C27B0, #BA68C8)',
                        transition: 'all 0.3s ease',
                        transform: 'translateX(-50%)'
                      },
                      '&:hover': {
                        color: '#BA68C8',
                        background: 'rgba(156, 39, 176, 0.08)',
                        '&::after': {
                          width: '80%'
                        }
                      }
                    }}
                  >
                    {page.title}
                  </Button>
                </motion.div>
              ))}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2, md: 2 } }}>
              {/* ARQ Logo */}
              <Box
                component="img"
                src={arqlogo}
                alt="ARQ Logo"
                sx={{
                  height: { 
                    xs: '50px',
                    sm: '55px',
                    md: '60px',
                    lg: scrolled ? '70px' : '80px'
                  },
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    filter: 'brightness(1.1)'
                  },
                  mr: { xs: 1, sm: 0 }
                }}
              />

              {/* College Logo */}
              <RouterLink to="https://rajalakshmi.org/" target="_blank">
                <Box
                  component="img"
                  src={dataloreImage}
                  alt="College Logo"
                  sx={{
                    height: { xs: '35px', sm: '40px', md: '45px', lg: scrolled ? '50px' : '60px' },
                    width: 'auto',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      filter: 'brightness(1.1)',
                      transform: 'scale(1.02)'
                    }
                  }}
                />
              </RouterLink>
            </Box>
          
            {/* Futuristic Mobile Menu Button */}
            <Box sx={{ 
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              position: 'relative',
              right: 0,
              mr: 2
            }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                <IconButton
                  onClick={() => setIsOpen(true)}
                  sx={{
                    color: 'white',
                    padding: { xs: '10px', sm: '14px' },
                    background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.4) 0%, rgba(18, 18, 18, 0.8) 100%)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(156, 39, 176, 0.8)',
                    borderRadius: '16px',
                    boxShadow: '0 0 20px rgba(156, 39, 176, 0.8)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.6) 0%, rgba(18, 18, 18, 0.8) 100%)',
                      boxShadow: '0 0 30px rgba(156, 39, 176, 1)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: '-4px',
                        borderRadius: '16px',
                        padding: '2px',
                        background: 'linear-gradient(45deg, #9C27B0, #BA68C8)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        animation: 'rotate 4s linear infinite'
                      }
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: isOpen ? 180 : 0,
                      scale: isOpen ? 1.3 : 1
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    <MenuIcon 
                      sx={{ 
                        fontSize: { xs: '30px', sm: '34px' },
                        filter: 'drop-shadow(0 0 10px rgba(156, 39, 176, 0.9))',
                        '&:hover': {
                          filter: 'drop-shadow(0 0 15px rgba(156, 39, 176, 1))'
                        },
                        '& .MuiSvgIcon-root': {
                          transform: 'scale(2)',
                          '& path': {
                            strokeWidth: 1.5
                          }
                        }
                      }} 
                    />
                  </motion.div>
                </IconButton>
              </motion.div>
            </Box>
          </Box>
        </AppBar>
      </Slide>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} navItems={pages} />
    </>
  );
};

export default Navbar;