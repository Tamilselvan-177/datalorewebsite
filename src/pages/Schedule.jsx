import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SectionHeading from '../components/common/SectionHeading';

const Schedule = () => {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading>Event Schedule</SectionHeading>
        <Typography variant="body1" color="text.secondary">
          Coming soon - Check back for the complete schedule of events.
        </Typography>
      </motion.div>
    </Container>
  );
};

export default Schedule;