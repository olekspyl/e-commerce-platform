import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Center,
	Container,
	FormControl,
	Heading,
	Text,
	VStack,
	useBreakpointValue,
	useToast,
	Stack
} from '@chakra-ui/react'
import {Formik} from "formik"
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link as ReactLink, useParams} from "react-router-dom"
import * as Yup from "yup"
import PasswordField from '../components/PasswordField'
import {resetPassword, resetState} from "../redux/actions/userActions"

 const PasswordResetScreen = () => {
	const {token} = useParams();
	const dispatch = useDispatch();
	const toast = useToast();
	const {error, loading, serverStatus, serverMsg} = useSelector((state) => state.user)
	const headingBR = useBreakpointValue({base: "xs", md: "sm"})
	const boxBR = useBreakpointValue({base: "transparent", md: "bg-surface"})

	useEffect(() => {
		if (serverStatus && serverMsg) {
			toast({
				description: `${serverMsg}`,
				status: 'success',
				isClosable: true,
			})
			dispatch(resetState())
		}
	
	}, [error, serverStatus, serverMsg, dispatch, toast])
	
	return serverStatus ?
		<Center minH='90vh'>
			<VStack>
				<Text my='10' fontSize='xl'>
					Password reset successfully
				</Text>
				<Button as={ReactLink} to='/login' colorScheme='cyan' variant='outline' w='300px'>
					Log in
				</Button>
				<Button as={ReactLink} to='/products' colorScheme='cyan' w='300px' variant='outline'>
					Products
				</Button>
			</VStack>
		</Center>
		: (<Formik initialValues={{password: ''}}
		validationSchema={Yup.object({
			password: Yup.string().min(1, 'Password is too short - must contain at least 1 character.').required('Required'),
			confirmPassword: Yup.string().min(1, 'Password is too short - must contain at least 1 character.').required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match'),
		})} onSubmit={(values) => {
			dispatch(resetPassword(values.password, token));
		}}>
			{(formik) => (
				<Container maxW='lg' py={{base: '12', md: '24'}} px={{base: '0', md: '8'}} minH='4xl'>
					<Stack spacing='8'>
						<Stack spacing={{base: '2', md: '3'}} textAlign='center'>
							<Heading size={headingBR}>
								Reset your password
							</Heading>
						</Stack>
					</Stack>
					<Box py={{base: '0', md: '8'}} px={{base: '4', md: '10'}} bg={{boxBR}} boxShadow={{base: 'none', md: 'xl'}}>
						<Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
							{error && (
								<Alert status='error' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center'>
									<AlertIcon/>
									<AlertTitle>We are sorry!</AlertTitle>
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							)}
							<Stack spacing='5'>
								<FormControl>
									<PasswordField type='password' name='password' placeholder='your password' label='New password'/>
									<PasswordField type='password' name='confirmPassword' placeholder='Confirm your new password' label='Confirm your password'/>
								</FormControl>
							</Stack>
							<Stack spacing='6'>
								<Button colorScheme='cyan' size='lg' fontSize='md' isLoading={loading} type='submit'>
									Set new Password
								</Button>
							</Stack>
						</Stack>
					</Box>
				</Container>
				)}
				</Formik>)
}

export default PasswordResetScreen
