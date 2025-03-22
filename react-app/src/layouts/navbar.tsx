import { Box, Flex, Image, Link } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import MPLogo from '../assets/michael-pico-logo.svg';

const Navbar = () => {
  return (
    <Box as="nav" position="fixed" w="100%" top={0} zIndex={100}>
      <Flex 
        px={8} 
        py={4} 
        justify="space-between"
        align="center"
        bg="black"
        borderBottom="2px"
        borderColor="gray.900"
      >
        <Image 
          src={MPLogo} 
          alt="MP Logo"
          h="40px"
          _hover={{
            transform: 'scale(1.05)',
            transition: 'transform 0.2s'
          }}
        />
        <Flex gap={4}>
          <Link 
            href="https://github.com/your-github-username" 
            isExternal
            color="gray.400"
            _hover={{
              color: 'white'
            }}
          >
            <FaGithub size={40} />
          </Link>
          <Link 
            href="https://linkedin.com/in/your-linkedin-profile" 
            isExternal
            color="gray.400"
            _hover={{
              color: 'white'
            }}
          >
            <FaLinkedin size={40} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
