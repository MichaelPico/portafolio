import { Box, Flex, Image, Link } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import MPLogo from '../assets/michael-pico-logo.svg';

const Navbar = () => {

  const linkedin_url = process.env.REACT_APP_LINKEDIN_URL;
  const github_url = process.env.REACT_APP_GITHUB_URL;
  return (
    <Box as="nav" position="fixed" w="100%" top={0} zIndex={100}>
      <Flex 
        px={8} 
        py={4} 
        justify="space-between"
        align="center"
        bg="rgba(0, 0, 0, 0.9)"
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
            href={github_url}
            isExternal
            color="gray.400"
            _hover={{
              color: 'white'
            }}
          >
            <FaGithub size={40} />
          </Link>
          <Link 
            href={linkedin_url}
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
