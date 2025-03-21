import {
	Button,
	ButtonGroup,
	Container,
	Divider,
	IconButton,
	Input,
	Stack,
	Text,
	useColorModeValue as mode,
	Box,
	Flex,
	Icon,
} from '@chakra-ui/react';
import { FaGitHub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { BsPhoneFlip } from 'react-icons/bs';

const Footer = () => (
	<Box w='100%' bg={mode('cyan.300', 'gray.900')}>
		<Container as='footer' maxW='7xl'>
			<Stack
				spacing='8'
				direction={{ base: 'column', md: 'row' }}
				justify='space-between'
				py={{ base: '12', md: '16' }}>
				<Stack spacing={{ base: '6', md: '8' }} align='start'>
					<Flex alignItems='center'>
						<Icon as={<BsPhoneFlip />} h='10' w='10' color={mode('black', 'yellow.200')} />
						<Text fontSize='2xl' fontWeight='extrabold'>
							Tech Lines
						</Text>
					</Flex>
					<Text color='muted'>We love phones</Text>
				</Stack>
				<Stack direction={{ base: 'column-reverse', md: 'column', lg: 'row' }} spacing={{ base: '12', md: '8' }}>
					<Stack direction='row' spacing='8'>
						<Stack spacing='4' minW='36' flex='1'>
							<Text fontSize='sm' fontWeight='semibold' color='subtle'>
								Product
							</Text>
							<Stack spacing='3' shouldWrapChildren>
								<Button variant='link'>How it works</Button>
								<Button variant='link'>Pricing</Button>
							</Stack>
						</Stack>
						<Stack spacing='4' minW='36' flex='1'>
							<Text fontSize='sm' fontWeight='semibold' color='subtle'>
								Legal
							</Text>
							<Stack spacing='3' shouldWrapChildren>
								<Button variant='link'>Privacy</Button>
								<Button variant='link'>Terms</Button>
								<Button variant='link'>License</Button>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	</Box>
);

export default Footer;
