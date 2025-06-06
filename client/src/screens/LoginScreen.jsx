import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Container, FormControl, HStack, Heading, Stack, Text, useToast } from '@chakra-ui/react'
import {Formik} from 'formik'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link as ReactLink, useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import PasswordField from '../components/PasswordField'
import PasswordForgottenForm from '../components/PasswordForgottenForm'
import TextField from '../components/TextField'
import {login, googleLogin} from '../redux/actions/userActions'
import {useGoogleLogin} from '@react-oauth/google'
import axios from 'axios'
import {FcGoogle} from 'react-icons/fc'


const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const redirect = '/products';
	const toast = useToast();
	
	const { loading, error, userInfo, serverMsg } = useSelector((state) => state.user);
	const [showPasswordReset, setShowPasswordReset] = useState(false);
	
	useEffect(() => {
	if(userInfo) {
		if(location.state?.from) {
			navigate(location.state.from);
		} else {
			navigate(redirect);
		}
		toast({
			description: 'Login successful',
			status: 'success',
			isClosable: true,
		});
	}
	if(serverMsg) {
		toast({
			description: serverMsg,
			status: 'success',
			isClosable: true,
		});
	}
	}, [userInfo, navigate, redirect, error, location.state, serverMsg, showPasswordReset, toast]);
	
	const handleGoogleLogin = useGoogleLogin({
		onSuccess: async (response) => {
			const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
				headers: {Authorization: `Bearer ${response.access_token}`},
			}).then((res) => res.data);
			const {sub, email, name, picture} = userInfo;
			dispatch(googleLogin(sub, email, name, picture));
		}
	})
	
	return (
		<Formik initialValues={{email: '', password: ''}}
		validationSchema={Yup.object({email: Yup.string().email('Invalid email address').required('Required'), password: Yup.string().min(1, 'Password is too short - must contain at least 1 character.').required('Required') })} onSubmit={(values) => {
			dispatch(login(values.email, values.password));
		}}>
			{(formik) => (
				<Container maxW='lg' py={{base: '12', md: '24'}} px={{base: '0', md: '8'}} minH='4xl'>
					<Stack spacing='8'>
						<Stack spacing='6'>
							<Stack spacing={{base: '2', md: '3'}} textAlign='center'>
								<Heading fontSize={{base: 'md', lg: 'xl'}}>Log in to your account</Heading>
							<HStack spacing='1' justify='center'>
								<Text>Don't have an account?</Text>
								<Button as={ReactLink} to='/registration' variant='link' colorScheme='cyan'>Sign up</Button>
							</HStack>
							</Stack>
						</Stack>
						<Box py={{base: '0', md: '8'}} px={{base: '4', sm: '10'}} bg={{base: 'transparent', md: 'bg-surface'}} boxShadow={{base: 'none', md: 'xl'}}>
						<Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
							{error && (
								<Alert status='error' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center'>
									<AlertIcon />
									<AlertTitle>We are sorry!</AlertTitle>
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}
							<Stack spacing='5'>
								<FormControl>
									<TextField type='text' name='email' placeholder='your@example.com' label='Email'/>
									<PasswordField type='password' name='password' placeholder='your password' label='Password'/>
									<Button my='2' onClick={() => setShowPasswordReset(!showPasswordReset)}
									        size='sm' variant='outline' colorScheme='cyan'>Forgot password?</Button>
									{showPasswordReset && <PasswordForgottenForm />}
								</FormControl>
							</Stack>
							<Stack spacing='6'>
								<Button colorScheme='cyan' size='lg' fontSize='md' isLoading={loading} type='submit'>Sign in</Button>
								<Button colorScheme='cyan' size='lg' fontSize='md' isLoading={loading} type='submit' leftIcon={<FcGoogle/>} onClick={() => handleGoogleLogin()}>Google sign in</Button>
							</Stack>
						</Stack>
						</Box>
						
						
					</Stack>
					
				</Container>
			)}
			
		</Formik>
	);
}
export default LoginScreen;