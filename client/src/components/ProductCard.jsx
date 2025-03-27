import {
	Badge,
	Box,
	Flex,
	IconButton,
	Image,
	Skeleton,
	Text,
	Tooltip,
	useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiExpand } from 'react-icons/bi'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { Link as ReactLink } from 'react-router-dom'
import { addCartItem } from '../redux/actions/cartActions'
import {
	addToFavorites,
	removeFromFavorites,
} from '../redux/actions/productActions'

const ProductCard = ({ product, loading }) => {
	const dispatch = useDispatch()
	const { favorites } = useSelector(state => state.product)
	const [isShown, setIsShown] = useState(false)
	const { cartItems } = useSelector(state => state.cart)
	const toast = useToast()
	const [cartPlusDisabled, setCartPlusDisabled] = useState(false)

	useEffect(() => {
		const item = cartItems.find(cartItem => cartItem.id === product._id)
		if (item && item.qty === product.stock) {
			setCartPlusDisabled(true)
		}
	}, [product, cartItems])

	const addItem = id => {
		if (cartItems.some(cartItem => cartItem.id === id)) {
			const item = cartItems.find(cartItem => cartItem.id === id)
			dispatch(addCartItem(id, item.qty + 1))
		} else {
			dispatch(addCartItem(id, 1))
		}

		toast({
			description: 'Item added to cart',
			status: 'success',
			isClosable: true,
		})
	}

	return (
		<Skeleton isLoaded={!loading}>
			<Box
				_hover={{ transform: 'scale(1.1)', transitionDuration: '0.5s' }}
				borderWidth='1px'
				overflow='hidden'
				p='4'
				shadow='md'
			>
				<Image
					onMouseEnter={() => setIsShown(true)}
					onMouseLeave={() => setIsShown(false)}
					src={product.images[isShown && product.images.length === 2 ? 1 : 0]}
					fallbackSrc='https://via/placeholder.com/150'
					alt={product.name}
					height='200px'
				/>
				{product.stock < 5 ? (
					<Badge color='yellow.500'> only {product.stock} left</Badge>
				) : product.stock < 1 ? (
					<Badge color='red.500'> Sold out</Badge>
				) : (
					<Badge color='green.500'>{'In stock'}</Badge>
				)}
				{product.productIsNew && (
					<Badge ml='2' color='purple.500'>
						New
					</Badge>
				)}
				<Text noOfLines={1} fontSize='xl' fontWeight='semibold' mt='2'>
					{product.brand} {` `} {product.name}
				</Text>
				<Text noOfLines={1} fontSize='md' color='gray.600'>
					{product.subtitle}
				</Text>
				<Flex justify='space-between' alignItems='center' mt='2'>
					<Badge color='cyan.600'>{product.category}</Badge>
					<Text fontSize='xl' fontWeight='semibold' color='cyan.600'>
						${product.price}
					</Text>
				</Flex>
				<Flex justify='space-between' mt='2'>
					{favorites.includes(product._id) ? (
						<IconButton
							size='sm'
							bg='cyan.600'
							color='black'
							onClick={() => dispatch(removeFromFavorites(product._id))}
						>
							<MdOutlineFavorite />
						</IconButton>
					) : (
						<IconButton
							size='sm'
							bg='cyan.600'
							color='black'
							onClick={() => dispatch(addToFavorites(product._id))}
						>
							<MdOutlineFavoriteBorder />
						</IconButton>
					)}
					{/* <IconButton bg='cyan.600' size='sm' color='black' aria-label='expand'>
						<BiExpand size='20' />
					</IconButton> */}
					<IconButton
						icon={<BiExpand size='20' />}
						as={ReactLink}
						to={`/product/${product._id}`}
						colorScheme='cyan'
						size='sm'
					/>
					<Tooltip
						isDisabled={!cartPlusDisabled}
						hasArrow
						label={
							!cartPlusDisabled
								? 'You reached the maximum quantity of the product'
								: product.stock <= 0
								? 'Product is out of stock'
								: ''
						}
					>
						<IconButton
							isDisabled={product.stock <= 0 || cartPlusDisabled}
							onClick={() => addItem(product._id)}
							icon={<TbShoppingCartPlus size='20' />}
							colorScheme='cyan'
							size='sm'
						/>
					</Tooltip>
				</Flex>
			</Box>
		</Skeleton>
	)
}

export default ProductCard
