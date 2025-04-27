import { useState, useEffect, useRef, useCallback } from 'react';
import { Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  useMediaQuery,
  useTheme,
  Stack
} from '@mui/material';
import { IconButton } from '@mui/material';

import GradientHeading from '../components/common/GradientHeading';
import '../styles/fonts.css';
import { motion} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountdownTimer from '../components/common/CountdownTimer';
import { AccessTime, LocationOn, Group, EmojiEvents, WorkspacePremium, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import trophyIcon from '../assets/images/trophy-icon.svg';

const Home = () => {
  const lastScrollTime = useRef(0); // Add this line
  const scrollAmount = 320; // Fixed scroll amount for arrow navigation
  
  const events = [
    {
      id: 1,
      title: 'Prompt Craft',
      category: 'Competition',
      image: '/event_photo/promptcraft.jpeg',
      time: '2 hours',
      venue: 'KS01',
      capacity: 50,
      slot: 'II',
      actualTime: '12:20pm To 2:20pm',
      prizePool: {
        first: '₹1,500',
        second: '₹1,000'
      },
      description: 'Welcome to Prompt Craft 2025, an immersive competition designed to challenge participants in mastering the art of prompt engineering! Over two intense rounds, participants will demonstrate their expertise in crafting precise, creative, and optimized prompts for AI models. Round 1 focuses on basic prompt engineering techniques and optimization, while Round 2 challenges participants with complex scenarios requiring advanced prompt chaining and context manipulation. Winners will be judged on prompt effectiveness, creativity, and practical applicability.',
      highlights: [
        'Two challenging rounds with increasing complexity',
        'Hands-on experience with latest AI models',
        'Real-world problem-solving scenarios',
        'Expert mentorship and guidance',
        'Valuable feedback from industry professionals',
        'Networking opportunities with AI enthusiasts'
      ],
      coordinators: {
        staff: ['Mrs.P.Jayasri Archana Devi'],
        students: ['BhuvanKalyan', 'Harshini MD']
      }
    },
    {
      id: 2,
      title: 'UXplore',
      category: 'Design Competition',
      image: '/event_photo/uxplore.jpeg',
      time: '2 hours',
      venue: 'Conference Hall',
      capacity: 30,
      slot: 'II',
      actualTime: '12:20pm To 2:20pm',
      teamSize: '1-2',
      prizePool: {
        first: '₹1,500',
        second: '₹1,000'
      },
      description: 'Design Sphere is an intensive UI/UX design competition that challenges participants to create innovative, user-centric digital experiences. In Round 1, teams will redesign a given interface focusing on usability and aesthetic appeal. Round 2 presents a complex design challenge where participants must create a complete design system including wireframes, prototypes, and user journey maps. The competition emphasizes modern design principles, accessibility standards, and real-world applicability.',
      highlights: [
        'Comprehensive UI/UX design challenges',
        'Industry-standard tool utilization',
        'User research and persona creation',
        'Interactive prototyping',
        'Professional design critique sessions',
        'Portfolio-worthy project opportunities'
      ],
      coordinators: {
        staff: ['Mrs.A.Mariya Monica Celestir'],
        students: ['Maiyazhagan V', 'Vaishnavi S']
      }
    },
    {
      id: 3,
      title: 'Pitch or Pass',
      category: 'Investment Challenge',
      image: '/event_photo/pitchorpass.jpeg',
      time: '2 hours',
      venue: 'Idea Lab(KFR02)',
      capacity: 30,
      slot: 'I',
      actualTime: '9:45am To 11:45am',
      teamSize: '1-3',
      prizePool: {
        first: '₹1,500',
        second: '₹1,000'
      },
      description: 'Pitch or Pass is an exhilarating investment challenge where participants step into the shoes of venture capitalists. Teams will receive comprehensive financial datasets, market analysis reports, and company profiles. They must conduct thorough analysis, develop investment strategies, and create compelling investment proposals. The final round involves presenting their investment thesis to a panel of experienced investors and defending their decisions through detailed Q&A sessions.',
      highlights: [
        'Real-world financial data analysis',
        'Market research and trend analysis',
        'Risk assessment techniques',
        'Investment portfolio optimization',
        'Professional pitch deck creation',
        'Live Q&A with industry experts'
      ],
      coordinators: {
        staff: ['Mr.P.Preejith', 'Mrs.S.Renuka Devi'],
        students: ['Yashwanth P', 'Thejas KS']
      }
    },
    {
      id: 4,
      title: 'The Innovation Quest',
      category: 'Case Analysis',
      image: '/event_photo/theinnovationquest.jpeg',
      time: '2 hours',
      venue: 'Tech Lounge',
      capacity: 45,
      slot: 'II',
      actualTime: '12:20pm To 2:20pm',
      teamSize: '1-3',
      prizePool: {
        first: '₹1,500',
        second: '₹1,000'
      },
      description: 'The Quest for Innovation is an intensive case study competition that challenges participants to solve real-world business and technology problems. Teams will receive detailed case studies from leading companies, requiring them to analyze complex scenarios, identify key challenges, and propose innovative solutions. The competition tests participants\'s analytical thinking, problem-solving abilities, and strategic planning skills.',
      highlights: [
        'Real industry case analysis',
        'Strategic problem-solving',
        'Business model innovation',
        'Technology integration planning',
        'Professional presentation skills',
        'Feedback from industry leaders'
      ],
      coordinators: {
        staff: ['Dr.V.Sampath Kumar', 'Mr.G.Thiyagarajan'],
        students: ['Vijay Kumar V', 'Devika C']
      }
    },
    {
      id: 5,
      title: 'Insight',
      category: 'Project Showcase',
      image: '/event_photo/insight.jpeg',
      time: '2 hours',
      venue: 'Conference Hall',
      capacity: 75,
      slot: 'II',
      actualTime: '12:20pm To 2:20pm',
      teamSize: '1-3',
      prizePool: {
        first: '₹2,500',
        second: '₹1,000'
      },
      description: 'Insight is a premier project showcase event where participants present their innovative AI and Data Science projects. This platform allows students to demonstrate their technical expertise, creativity, and problem-solving abilities through practical applications. Projects will be evaluated based on innovation, technical complexity, practical impact, and presentation quality. Selected projects will receive mentorship opportunities and potential industry collaboration prospects.',
      highlights: [
        'Live project demonstrations',
        'Technical deep-dive sessions',
        'Innovation assessment',
        'Industry mentor feedback',
        'Networking opportunities',
        'Publication opportunities'
      ],
      coordinators: {
        staff: ['Dr. J. Manoranjini', 'Dr. A. Beulah'],
        students: ['Nithish S', 'Praveen B']
      }
    },
    {
      id: 6,
      title: 'Code Heist',
      category: 'Coding Challenge',
      image: '/event_photo/codeheist.jpeg',
      date: '2025',
      time: '2 hours',
      venue: 'Idea Lab(KFR02)',
      capacity: 30,
      slot: 'I',
      actualTime: '9:45am To 11:45am',
      prizePool: {
        first: '₹1,500',
        second: '₹1,000'
      },
      description: 'Code Heist is an immersive coding challenge that puts participants in the role of ethical hackers. Through three progressively challenging rounds, participants must navigate a simulated high-security system, combining coding skills with strategic thinking. Round 1 focuses on basic system penetration, Round 2 involves advanced encryption challenges, and the final round tests participants\' ability to execute a complete system infiltration while maintaining stealth.',
      highlights: [
        'Progressive difficulty levels',
        'Advanced encryption challenges',
        'System security analysis',
        'Code optimization tasks',
        'Real-time monitoring evasion',
        'Strategic resource management'
      ],
      coordinators: {
        staff: ['Ms Selvarani'],
        students: ['R Sai Narayanan', 'M Thofiq Gani']
      }
    },
    {
      id: 7,
      title: 'Papervez',
      category: 'Paper Presentation',
      image: '/event_photo/papervez.jpeg',
      date: '2025',
      time: '2 hours',
      venue: 'Purple Hall',
      capacity: 45,
      slot: 'I',
      actualTime: '9:45 - 11:45',
      teamSize: '1-3',
      prizePool: {
        first: '₹2,500',
        second: '₹1,000'
      },
      description: 'Papervez is an academic paper presentation competition where teams of 1-3 members present their research work in emerging technologies. Participants will showcase their research findings, methodologies, and conclusions through professional presentations.',
      highlights: [
        'Research presentation',
        'Technical paper writing',
        'Academic discussion',
        'Professional feedback',
        'Publication opportunities',
        'Networking with researchers'
      ],
      coordinators: {
        staff: ['Dr. Research Coordinator'],
        students: ['Research Lead 1', 'Research Lead 2']
      }
    },
    {
      id: 8,
      title: 'Workshop',
      category: 'Technical Workshop',
      image: '/event_photo/workshop.jpeg',
      date: '2025',
      time: '2 hours',
      venue: 'Main Seminar Hall',
      capacity: 100,
      slot: 'I',
      actualTime: '9:45 - 11:45',
      description: 'A comprehensive technical workshop focusing on cutting-edge technologies and industry practices. Participants will gain hands-on experience with the latest tools and frameworks while learning from industry experts.',
      highlights: [
        'Hands-on training',
        'Industry expert sessions',
        'Interactive learning',
        'Practical exercises',
        'Take-home resources',
        'Certificate of completion'
      ],
      coordinators: {
        staff: ['Workshop Coordinator'],
        students: ['Workshop Lead 1', 'Workshop Lead 2']
      }
    }
  ];
  
  const theme = useTheme();
  const scrollRef = useRef(null);
  const scrollTrackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Initialize touch event variables
  const touchStartX = useRef(0);
  const touchStartScrollLeft = useRef(0);

  
  
  // Calculate scroll thumb width based on container width
  useEffect(() => {
    if (scrollRef.current && scrollTrackRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const scrollWidth = scrollRef.current.scrollWidth;
      const trackWidth = scrollTrackRef.current.clientWidth;
      const newThumbWidth = Math.max(
        30,
        Math.floor((containerWidth / scrollWidth) * trackWidth)
      );
      setThumbWidth(newThumbWidth);
    }
  }, [events]);

  // Hide default scrollbar and disable arrow key navigation
  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.style.scrollbarWidth = 'none';
      currentRef.style.msOverflowStyle = 'none';
      currentRef.style.overflowX = 'hidden';
      
      const handleKeyDown = (e) => {
        if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
        }
      };
      
      currentRef.addEventListener('keydown', handleKeyDown);
      return () => {
        if (currentRef) {
          currentRef.removeEventListener('keydown', handleKeyDown);
        }
      };
    }
  }, []);
  
  // Update thumb position on scroll


  // Handle scrollbar thumb drag

  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '0px',
    skip: false
  });
  
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 8 });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Custom scrollbar styles
  
  const handleTouchStart = useCallback((e) => {
    if (!scrollRef.current) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartScrollLeft.current = scrollRef.current.scrollLeft;
    setIsDragging(true);
  }, []);
  
  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].clientX;
    const walk = (x - touchStartX.current) * 1.5; // Increased sensitivity
    scrollRef.current.scrollLeft = touchStartScrollLeft.current - walk;
    
    // Update last touch position for velocity calculation
    touchStartX.current = x;
    touchStartScrollLeft.current = scrollRef.current.scrollLeft;
  }, [isDragging]);
  
  const handleTouchEnd = useCallback((e) => {
    if (!isDragging || !scrollRef.current) return;
    setIsDragging(false);
    
    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;
    
    if (Math.abs(diff) > 50) {
      const scrollContainer = scrollRef.current;
      const cardWidth = scrollContainer.firstElementChild?.offsetWidth + 24;
      
      if (diff > 0) {
        // Swipe left - go to next card
        const newIndex = Math.min(Math.floor(scrollContainer.scrollLeft / cardWidth) + 1, events.length - 1);
        scrollToCard(newIndex);
      } else {
        // Swipe right - go to previous card
        const newIndex = Math.max(Math.floor(scrollContainer.scrollLeft / cardWidth) - 1, 0);
        scrollToCard(newIndex);
      }
    }
  }, [isDragging, events.length]);

  let scrollInterval;

const stopAutoScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setIsAutoScrolling(false);
    }
  };


  
  const scrollTimeout = useRef(null);
  
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Basic IntersectionObserver for card visibility
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            
            // Load image when card becomes visible
            const img = card.querySelector('.event-image');
            if (img && !img.src) {
              const eventId = card.dataset.eventId;
              const event = events.find(e => e.id.toString() === eventId);
              if (event) {
                img.src = event.image;
              }
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    // Simple scroll handler
    const handleScroll = () => {
      setScrollPosition(scrollContainer.scrollLeft);
      lastScrollTime.current = Date.now();
    };

    // Basic touch handlers
    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartScrollLeft.current = scrollContainer.scrollLeft;
      setIsDragging(true);
      e.preventDefault();
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const x = e.touches[0].clientX;
      const walk = x - touchStartX.current;
      scrollContainer.scrollLeft = touchStartScrollLeft.current - walk;
      e.preventDefault();
    };

    // Event listeners
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    scrollContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Custom scroll container styling
    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.style.scrollSnapType = 'x mandatory';
    scrollContainer.style.scrollSnapAlign = 'center';
    scrollContainer.style.scrollPadding = '0 24px';
    scrollContainer.style.width = 'calc(100% - 100px)';
    scrollContainer.style.margin = '0 auto';
    scrollContainer.style.gap = '32px';
    scrollContainer.style.padding = '0 24px';
    scrollContainer.style.maxWidth = '1400px';
    scrollContainer.style.overflowX = 'auto';
    scrollContainer.style.scrollbarWidth = 'none';
    scrollContainer.style.msOverflowStyle = 'none';
    scrollContainer.style.WebkitOverflowScrolling = 'touch';
    scrollContainer.style.position = 'relative';
    
    // Hide scrollbar for all browsers
    scrollContainer.style.setProperty('scrollbar-width', 'none', 'important');
    scrollContainer.style.setProperty('-ms-overflow-style', 'none', 'important');

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      scrollContainer.removeEventListener('touchstart', handleTouchStart);
      scrollContainer.removeEventListener('touchmove', handleTouchMove);
      scrollContainer.removeEventListener('touchend', handleTouchEnd);
      observer.disconnect();
    };
  }, [events, isHovering]);




  
  // Events array is now defined above
  // Function to handle smooth scrolling to a specific card


const ITEM_HEIGHT = 300; // Fixed height for each event card



  const itemsPerView = 3; // Fixed to show exactly 3 items

const updateVisibleRange = () => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const itemWidth = container.firstElementChild?.offsetWidth || 0;
    
    if (itemWidth === 0) return;
    
    const startIndex = Math.floor(scrollLeft / itemWidth);
    const endIndex = Math.min(events.length, startIndex + itemsPerView);
    
    setVisibleRange({
      start: startIndex,
      end: endIndex
    });
  };

  const handleCardScroll = () => {
    if (!scrollRef.current) return;
    
    // Use requestAnimationFrame for smooth scrolling
    requestAnimationFrame(() => {
      setScrollPosition(scrollRef.current.scrollLeft);
      lastScrollTime.current = Date.now(); // Corrected assignment
      updateVisibleRange();
    });
  };

  // Optimized scroll event handling with throttling
  const throttledScroll = (e) => {
    if (!scrollTimeout.current) {
      scrollTimeout.current = requestAnimationFrame(() => {
        handleCardScroll(e);
        scrollTimeout.current = null;
      });
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Initial visible range calculation
    updateVisibleRange();

    scrollContainer.addEventListener('scroll', throttledScroll, { passive: true });
    scrollContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    scrollContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    scrollContainer.addEventListener('touchend', handleTouchEnd);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', throttledScroll);
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchmove', handleTouchMove);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  // Render only visible items
  const visibleEvents = events.slice(visibleRange.start, visibleRange.end);

  const handleNextSlide = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handlePrevSlide = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  // Add event listeners for arrow buttons
  useEffect(() => {
    const nextButton = document.getElementById('next-slide-button');
    const prevButton = document.getElementById('prev-slide-button');

    if (nextButton) {
      nextButton.style.marginRight = '20px'; // Increase right margin
      nextButton.addEventListener('click', handleNextSlide);
    }

    if (prevButton) {
      prevButton.style.marginLeft = '20px'; // Increase left margin
      prevButton.addEventListener('click', handlePrevSlide);
    }

    return () => {
      if (nextButton) {
        nextButton.removeEventListener('click', handleNextSlide);
      }

      if (prevButton) {
        prevButton.removeEventListener('click', handlePrevSlide);
      }
    };
  }, []);

  const scrollToCard = (index) => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const cardWidth = container.firstElementChild?.offsetWidth + 32;
    const targetScroll = index * cardWidth;
    
    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    setCurrentSlide(index);
  };

  const prizePool = {
    total: "₹20,000+",
    breakdown: [
      { position: "First Prize Pool", amount: "₹7,000", icon: EmojiEvents },
      { position: "Second Prize Pool", amount: "₹5,000", icon: EmojiEvents }
    ],
    perks: [
      "Merit Certificates for Winners",
      "Participation Certificates for All",
      "Industry Recognition",
      "Networking Opportunities"
    ]
  };

  const eventVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.4
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };




  // [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerSlide = 3;
  

  


  // Removed duplicate useEffect hook
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval;
    let lastScrollTime = Date.now();

    const handleScroll = () => {
      if (!scrollContainer) return;
      
      // Use requestAnimationFrame for smooth scrolling
      requestAnimationFrame(() => {
        setScrollPosition(scrollContainer.scrollLeft);
        lastScrollTime = Date.now();
      });
    };
  
    // Optimized scroll event handling with throttling
    
  
    // Optimized touch handling
    
  
    
  
  
    // Add optimized smooth scroll behavior via CSS
    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.style.scrollSnapType = 'x proximity'; // Better snap behavior
    scrollContainer.style.WebkitOverflowScrolling = 'touch'; // Improved momentum scrolling on iOS
  
    

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      stopAutoScroll();
    };
  }, [isHovering]);

const totalSlides = 8;

const handleMouseEnter = () => {
  setIsHovering(true);
};

const handleMouseLeave = () => {
  setIsHovering(false);
};
const EventsSection = ({ events, scrollRef, handleMouseEnter, handleMouseLeave, eventVariants, theme }) 
  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, position: 'relative', py: 8 }}>
      <IconButton 
        className="arrow left" 
        onClick={() => scrollToCard(Math.max(0, currentSlide - 1))}
        sx={{
          position: 'absolute',
          left: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.7)'
          }
        }}
      >
        <ArrowBackIos />
      </IconButton>
      
      <IconButton 
        className="arrow right" 
        onClick={() => scrollToCard(Math.min(events.length - 1, currentSlide + 1))}
        sx={{
          position: 'absolute',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.7)'
          }
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    

  <Box
    component={motion.div}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    sx={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      py: { xs: 4, md: 8 }
    }}
  >
        <GradientHeading variant="h2" component="h1" sx={{ fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' } }}>
          Welcome to Datalore '25
        </GradientHeading>
        <Typography 
          variant="h3" 
          color="text.secondary" 
          sx={{ 
            fontFamily: 'var(--font-primary)',
            mb: 4, 
            maxWidth: 'sm', 
            mx: 'auto',
            fontSize: { xs: '0.9rem', sm: '1.25rem', md: '1.4rem' },
            lineHeight: 1.6,
            opacity: 0.9,
            letterSpacing: '0.01em',
            px: { xs: 1, sm: 0 }
          }}
        >
          Join us for an extraordinary journey into the future of technology
        </Typography>
        <CountdownTimer />

        <Box
          component={motion.div}
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          sx={{ mt: 6 }}
        >
          <Button
            onClick={(e) => {
              e.preventDefault();
              const eventsSection = document.getElementById('events-section');
              if (eventsSection) { // Add null check
                window.scrollTo({
                  top: eventsSection.offsetTop,
                  behavior: 'smooth'
                });
              }

              // Add gradient animation keyframes
              const style = document.createElement('style');
              style.textContent = `
                @keyframes gradientShift {
                  0% { background-position: 0% 50% }
                  50% { background-position: 100% 50% }
                  100% { background-position: 0% 50% }
                }
              `;
              document.head.appendChild(style);

              // Animate overlay to full screen
              requestAnimationFrame(() => {
                overlay.style.transform = 'scale(60)';
                overlay.style.borderRadius = '0';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100vw';
                overlay.style.height = '100vh';
              });

              // Navigate after animation completes
              setTimeout(() => {
                window.location.href = '/register';
              }, 800);
            }}
            aria-label="Navigate to registration page"
            variant="contained"
            size="large"
            sx={{
              py: 2,
              px: 6,
              width: '280px',
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              fontWeight: 800,
              textTransform: 'none',
              borderRadius: '30px',
              background: 'linear-gradient(135deg, #9C27B0 0%, #E1BEE7 50%, #9C27B0 100%)',
              backgroundSize: '400% 400%',
              animation: 'gradient 8s ease infinite, pulse 2s ease-in-out infinite',
              boxShadow: '0 15px 45px rgba(156, 39, 176, 0.2)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              mt: 4,
              mx: 'auto',
              display: 'block',
              position: 'relative',
              overflow: 'hidden',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                transition: 'all 0.6s ease',
                zIndex: 1,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                inset: -3,
                background: 'linear-gradient(135deg, #9C27B0, #E1BEE7, #9C27B0)',
                filter: 'blur(20px)',
                opacity: 0,
                transition: 'opacity 0.4s ease',
                zIndex: -1,
              },
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.03)',
                boxShadow: '0 15px 45px rgba(156, 39, 176, 0.3)',
                border: '2px solid rgba(156, 39, 176, 0.8)',
                },
                margin: '0 20px',
                transform: 'translateY(-5px) scale(1.02) rotateX(10deg)',
                '&::before': {
                  left: '100%',
                },
                '&::after': {
                  opacity: 0.8,
                },
                '@keyframes gradient': {
                '0%': { backgroundPosition: '0% 50%' },
                '50%': { backgroundPosition: '100% 50%' },
                '100%': { backgroundPosition: '0% 50%' },
              },
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.02)' },
                '100%': { transform: 'scale(1)' },
              },
              }
            }
          >
                Registration closed
          </Button>
        </Box>
      </Box>
      
      {/* Events Section */}
      <Box sx={{ overflow: 'hidden', width: '100%', position: 'relative', py: 8 }}>
      <Typography
        variant="h3"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          mb: 6,
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem' },
          background: 'linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textTransform: 'uppercase',
          letterSpacing: '0.2em'
        }}
      >
        Events
      </Typography>

      <Box
        ref={scrollRef}
        position="relative"
        sx={{
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          px: 4,
          pb: 4,
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          [theme.breakpoints.up('md')]: {
            '&::-webkit-scrollbar': {
              display: 'block',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: theme.palette.background.default,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.primary.main,
              borderRadius: '4px',
            },
          },
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {events.map((event) => (
          <Card
            key={event.id}
            component={motion.div}
            variants={eventVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            sx={{
              width: { xs: '85%', sm: '45%', md: 'calc(33.333% - 16px)' },
              flexShrink: 0,
              scrollSnapAlign: 'start',
              background: 'linear-gradient(145deg, rgba(18,18,18,0.9), rgba(18,18,18,0.95))',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              border: '1px solid rgba(156, 39, 176, 0.3)',
              boxShadow: '0 8px 30px rgba(156, 39, 176, 0.3)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.03)',
                boxShadow: '0 15px 45px rgba(156, 39, 176, 0.3)',
                border: '2px solid rgba(156, 39, 176, 0.8)',
              },
              mx: 2,
            }}
          >
            <CardMedia
              component="img"
              height="150"
              image={event.image}
              alt={event.title}
              sx={{
                width: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                borderBottom: '1px solid rgba(156, 39, 176, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 500,
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  letterSpacing: '0.5px',
                  mb: 2,
                }}
              >
                {event.title}
              </Typography>
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.time}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.venue}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Group sx={{ fontSize: 18, color: 'primary.main' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.capacity} participants
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>

      {/* Prize Pool Section */}
      <Box
        ref={ref}
        component={motion.div}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
        sx={{ py: 8 }}
      >
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem' },
            background: 'linear-gradient(45deg, #9C27B0 30%, #BA68C8 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textTransform: 'uppercase',
            letterSpacing: '0.2em'
          }}
        >
          Rewards & Prizes
        </Typography>

        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} md={6}>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  textAlign: 'center',
                  p: 4
                }}
              >
              <Box
                  component="img"
                  src={trophyIcon}
                  alt="Trophy"
                  sx={{
                    width: { xs: '200px', md: '250px' },
                    height: 'auto',
                    mb: 3,
                    filter: 'drop-shadow(0 0 20px rgba(156, 39, 176, 0.3))',
                    animation: 'float 3s ease-in-out infinite'
                  }}
                />
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                    background: 'linear-gradient(45deg, #9C27B0 30%, #E1BEE7 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2
                  }}
                >
                  {prizePool.total}
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    color: "#9C27B0",
                    fontWeight: 10000,
                    mb: 4
                  }}
                >
                  Total Prize Pool
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  background: 'rgba(18, 18, 18, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(156, 39, 176, 0.2)'
                }}
              >
                <Box sx={{ mb: 4 }}>
                  {prizePool.breakdown.map((prize, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        p: 2,
                        borderRadius: '10px',
                        background: 'rgba(156, 39, 176, 0.1)',
                        border: '1px solid rgba(156, 39, 176, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
  transform: 'translateY(-8px) scale(1.03)',
  boxShadow: '0 15px 45px rgba(156, 39, 176, 0.3)',
  border: '2px solid rgba(156, 39, 176, 0.8)',
},
margin: '0 20px',
                          transform: 'translateX(10px)',
                          background: 'rgba(156, 39, 176, 0.15)',
                          border: '1px solid rgba(156, 39, 176, 0.3)'
                        }
                      }
                    >
                      <prize.icon
                        sx={{
                          fontSize: '4rem',
                          color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32',
                          mr: 2
                        }}
                      />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h2" sx={{ color: '#fff' }}>
                          {prize.position}
                        </Typography>
                        <Typography variant="h2" sx={{ color: theme.palette.primary.main, fontWeight: 10000 }}>
                          {prize.amount}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ my: 3, borderColor: 'rgba(156, 39, 176, 0.2)' }} />

                <Typography variant="h2" sx={{ mb: 2, color: '#fff' }} align="center">
                  Additional Perks
                </Typography>
                <Grid container spacing={2}>
                  {prizePool.perks.map((perk, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          p: 1
                        }}
                      >
                        <WorkspacePremium sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          {perk}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
      </Container>
  );
};

export default Home;
            

                  


                  
