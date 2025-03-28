import {
	FormControl,
	FormErrorMessage,
	FormLabel,
} from '@chakra-ui/form-control'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Input } from '@chakra-ui/input'
import { Button, InputGroup, InputRightElement } from '@chakra-ui/react'
import { Field, useField } from 'formik'
import { useState } from 'react'

const PasswordField = ({ label, type, name, placeholder }) => {
	const [showPassword, setShowPassword] = useState(false)
	const [field, meta] = useField({ type, name, placeholder })
	return (
		<FormControl isInvalid={meta.touched && meta.error} mb='6'>
			<FormLabel noOfLines={1}>{label}</FormLabel>
			<InputGroup>
				<Field as={Input} {...field} type={showPassword ? 'text' : type} />
				<InputRightElement h='full'>
					<Button
						variant='ghost'
						onClick={() => setShowPassword(showPassword => !showPassword)}
					>
						{showPassword ? <ViewIcon /> : <ViewOffIcon />}
					</Button>
				</InputRightElement>
			</InputGroup>
			<FormErrorMessage>{meta.error} </FormErrorMessage>
		</FormControl>
	)
}
export default PasswordField
