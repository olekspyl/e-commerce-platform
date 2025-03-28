import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
	Box,
	Flex,
	HStack,
	Icon,
	IconButton,
	Stack,
	Text,
	useColorModeValue as mode,
	useDisclosure,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { BiUserCheck } from 'react-icons/bi'
import { BsPhoneFlip } from 'react-icons/bs'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import { TbShoppingCart } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { Link as ReactLink } from 'react-router-dom'
import { toggleFavorites } from '../redux/actions/productActions'
import ColorModeToggle from './ColorModeToggle.jsx'
import NavLink from './NavLink'

const Links = [
	{ name: 'Products', route: '/products' },
	{ name: 'Hot Deals', route: '/hot-deals' },
	{ name: 'Contact', route: '/contact' },
	{ name: 'Services', route: '/services' },
]

const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const dispatch = useDispatch()
	const { favoritesToggled } = useSelector(state => state.product)
	const { cartItems } = useSelector(state => state.cart)

	useEffect(() => {}, [favoritesToggled, dispatch])
	return (
		<Box bg={mode('cyan.300', 'gray.900')} px='4'>
			<Flex h='16' alignItems='center' justifyContent='space-between'>
				<Flex display={{ base: 'flex', md: 'none' }} alignItems='center'>
					<IconButton
						bg='parent'
						size='md'
						icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
						onClick={isOpen ? onClose : onOpen}
					/>
					<IconButton
						ml='12'
						position='absolute'
						icon={<TbShoppingCart size='20px' />}
						as={ReactLink}
						to='/cart'
						variant='ghost'
					/>
					{cartItems.length > 0 && (
						<Text
							fontWeight='bold'
							fontStyle='italic'
							position='absolute'
							ml='74px'
							mt='-6'
							fontSize='sm'
						>
							{cartItems.length}
						</Text>
					)}
				</Flex>
				<HStack spacing='8' alignItems='center'>
					<Box alignItems='center' display='flex' as={ReactLink} to='/'>
						<Icon
							as={BsPhoneFlip}
							h='6'
							w='6'
							color={mode('black', 'yellow.200')}
						/>
						<Text as='b'>Tech Lines</Text>
					</Box>
					<HStack as='nav' spacing='4' display={{ base: 'none', md: 'flex' }}>
						{Links.map(link => (
							<NavLink key={link.name} route={link.route}>
								<Text fontWeight='medium'>{link.name}</Text>
							</NavLink>
						))}
						<Box>
							<IconButton
								icon={<TbShoppingCart size='20px' />}
								as={ReactLink}
								to='/cart'
								variant='ghost'
							/>
							{cartItems.length > 0 && (
								<Text
									fontWeight='bold'
									fontStyle='italic'
									ml='26px'
									mt='-6'
									fontSize='sm'
								>
									{cartItems.length}
								</Text>
							)}
						</Box>
						<ColorModeToggle />
						{favoritesToggled ? (
							<IconButton
								variant='ghost'
								onClick={() => dispatch(toggleFavorites(false))}
							>
								<MdOutlineFavorite size='20px' />
							</IconButton>
						) : (
							<IconButton
								variant='ghost'
								onClick={() => dispatch(toggleFavorites(true))}
							>
								<MdOutlineFavoriteBorder size='20px' />
							</IconButton>
						)}
					</HStack>
				</HStack>
				<Flex alignItems='center'>
					<BiUserCheck />
				</Flex>
			</Flex>
			<Box display='flex'>
				{isOpen && (
					<Box pb='4' display={{ md: 'none' }}>
						<Stack as='nav' spacing='4'>
							{Links.map(link => (
								<NavLink key={link.name} route={link.route}>
									<Text fontWeight='medium'>{link.name}</Text>
								</NavLink>
							))}
						</Stack>
						<ColorModeToggle />
						{favoritesToggled ? (
							<IconButton
								variant='ghost'
								onClick={() => dispatch(toggleFavorites(false))}
							>
								<MdOutlineFavorite size='20px' />
							</IconButton>
						) : (
							<IconButton
								variant='ghost'
								onClick={() => dispatch(toggleFavorites(true))}
							>
								<MdOutlineFavoriteBorder size='20px' />
							</IconButton>
						)}
					</Box>
				)}
			</Box>
		</Box>
	)
}

export default Header
