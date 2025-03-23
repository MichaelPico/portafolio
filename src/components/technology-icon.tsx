import React from 'react';
import { Box, VStack, Text, Image, SimpleGrid } from '@chakra-ui/react';

// Import the images
import TypescriptLogo from '../assets/technologies/Typescript_logo_2020.svg';
import CSharpLogo from '../assets/technologies/Logo_C_sharp.svg';
import PythonLogo from '../assets/technologies/Python-logo-notext.svg';
import ReactLogo from '../assets/technologies/React-icon.svg';
import HTMLLogo from '../assets/technologies/HTML5_Badge.svg';
import CSSLogo from '../assets/technologies/CSS3_logo.svg';
import BlazorLogo from '../assets/technologies/blazor.svg';
import SassLogo from '../assets/technologies/Sass_Logo_Color.svg';
import AzureLogo from '../assets/technologies/Microsoft_Azure.svg';
import AzureDevOpsLogo from '../assets/technologies/azure-devops.svg';
import AzurePipelinesLogo from '../assets/technologies/azurepipelines.svg';
import GithubActionsLogo from '../assets/technologies/githubactions.svg';
import ThreeJSLogo from '../assets/technologies/Threejs-logo.svg';

// Enum for supported technologies
export enum Technology {
  TYPESCRIPT = 'typescript',
  CSHARP = 'csharp',
  PYTHON = 'python',
  REACT = 'react',
  HTML = 'html',
  CSS = 'css',
  BLAZOR = 'blazor',
  SASS = 'sass',
  AZURE = 'azure',
  AZURE_DEVOPS = 'azure-devops',
  AZURE_PIPELINES = 'azure-pipelines',
  GITHUB_ACTIONS = 'github-actions',
  THREEJS = 'threejs'  // Added Three.js
}

// Map enum values to display names and file paths
const technologyDetails: Record<Technology, { name: string; path: string }> = {
    [Technology.TYPESCRIPT]: { name: 'TypeScript', path: TypescriptLogo },
    [Technology.CSHARP]: { name: 'C#', path: CSharpLogo },
    [Technology.PYTHON]: { name: 'Python', path: PythonLogo },
    [Technology.REACT]: { name: 'React', path: ReactLogo },
    [Technology.HTML]: { name: 'HTML5', path: HTMLLogo },
    [Technology.CSS]: { name: 'CSS3', path: CSSLogo },
    [Technology.BLAZOR]: { name: 'Blazor', path: BlazorLogo },
    [Technology.SASS]: { name: 'Sass', path: SassLogo },
    [Technology.AZURE]: { name: 'Azure', path: AzureLogo },
    [Technology.AZURE_DEVOPS]: { name: 'Azure DevOps', path: AzureDevOpsLogo },
    [Technology.AZURE_PIPELINES]: { name: 'Azure Pipelines', path: AzurePipelinesLogo },
    [Technology.GITHUB_ACTIONS]: { name: 'GitHub Actions', path: GithubActionsLogo },
    [Technology.THREEJS]: { name: 'Three.js', path: ThreeJSLogo }
  };

interface TechnologyCardProps {
  technology: Technology;
}

// Individual technology card component
export const TechnologyCard: React.FC<TechnologyCardProps> = ({ technology }) => {
  const { name, path } = technologyDetails[technology];
  return (
    <Box
      borderRadius="md"
      overflow="hidden"
      bg="gray.800"
      p={3}
      _hover={{
        transform: 'translateY(-5px)',
        transition: 'transform 0.3s'
      }}
    >
      <VStack spacing={3}>
        <Box height="60px" display="flex" alignItems="center" justifyContent="center">
          <Image src={path} alt={name} height="60px" />
        </Box>
        <Text color="white" fontWeight="medium" textAlign="center">
          {name}
        </Text>
      </VStack>
    </Box>
  );
};