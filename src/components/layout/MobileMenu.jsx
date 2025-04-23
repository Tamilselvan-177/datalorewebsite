import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Box,
  Button,
  Typography,
  Divider,
  useTheme
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Particles } from '@tsparticles/react';
import { loadFull } from 'tsparticles';

const MobileMenu = ({ isOpen, onClose, navItems }) => {
  const theme = useTheme();
  
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          maxWidth: { xs: '100%', sm: '400px' },
          background: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(156, 39, 176, 0.3)',
          boxShadow: '-4px 0 30px rgba(156, 39, 176, 0.3)',
          overflow: 'hidden',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 30%, rgba(156, 39, 176, 0.1) 0%, transparent 60%)',
            zIndex: 0
          }
        }
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
          particles: {
            color: {
              value: theme.palette.primary.main,
            },
            links: {
              color: theme.palette.primary.main,
              distance: 150,
              enable: true,
              opacity: 0.3,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 40,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid rgba(156, 39, 176, 0.2)'
        }}>
          <Box
            component="img"
            src="/weblogo.png"
            sx={{
              height: { xs: '30px', sm: '35px' },
              transition: 'all 0.3s ease-in-out',
              filter: 'brightness(1.1)',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
            alt="DATALORE '25"
          />
          <IconButton
            onClick={onClose}
            sx={{
              color: 'white',
              background: 'rgba(156, 39, 176, 0.1)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(156, 39, 176, 0.2)',
              borderRadius: '12px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                background: 'rgba(156, 39, 176, 0.2)',
                transform: 'scale(1.05)',
                boxShadow: '0 0 15px rgba(156, 39, 176, 0.3)'
              },
              '&:active': {
                transform: 'scale(0.95)'
              }
            }}
          >
            <CloseIcon sx={{
              transition: 'transform 0.3s ease',
              transform: 'rotate(0deg)',
              '&:hover': {
                transform: 'rotate(90deg)'
              }
            }}/>
          </IconButton>
        </Box>
        
        <List sx={{ p: 2, flexGrow: 1, position: 'relative', zIndex: 1 }}>
          {/* Navigation Items */}
          {navItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 50, rotate: 5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                type: 'spring',
                stiffness: 100,
                damping: 10
              }}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -2, 2, -2, 2, 0],
                transition: { duration: 0.6 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ListItem
                component={RouterLink}
                to={item.path}
                onClick={onClose}
                sx={{
                  py: 2,
                  px: 3,
                  color: 'white',
                  clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
                  mb: 3,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: 'rgba(18, 18, 18, 0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(156, 39, 176, 0.3)',
                  boxShadow: '0 4px 30px rgba(156, 39, 176, 0.3)',
                  '&:hover': {
                    background: 'rgba(156, 39, 176, 0.25)',
                    transform: 'translateX(8px) scale(1.03)',
                    boxShadow: '0 8px 30px rgba(156, 39, 176, 0.5)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-2px',
                      left: '-2px',
                      right: '-2px',
                      bottom: '-2px',
                      background: 'linear-gradient(45deg, #9C27B0, #BA68C8)',
                      zIndex: -1,
                      clipPath: 'polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)',
                      opacity: 0.7
                    }
                  },
                }}
              >
                <ListItemText 
                  primary={item.title}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '1.2rem',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                    }
                  }}
                />
              </ListItem>
            </motion.div>
          ))}

          
        </List>

        <Box sx={{ p: 3, borderTop: '1px solid rgba(156, 39, 176, 0.2)' }}>
          <Button
            component={RouterLink}
            to="/register"
            variant="contained"
            fullWidth
            onClick={onClose}
            sx={{
              py: 2,
              background: 'linear-gradient(135deg, #9C27B0 0%, #BA68C8 100%)',
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(156, 39, 176, 0.3)',
              '&:hover': {
                boxShadow: '0 8px 25px rgba(156, 39, 176, 0.5)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Register Now
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;