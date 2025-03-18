import React, { useState } from 'react';
import { Box, Image, Text, Badge, Flex, Skeleton, IconButton } from '@chakra-ui/react';
import { BiExpand } from 'react-icons/bi';
import { addToFavorites, removeFromFavorites } from '../redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { Link as ReactLink } from 'react-router-dom';

const ProductCard = ({ product, loading }) => {
	const dispatch = useDispatch();
	const { favorites } = useSelector((state) => state.product);
	const [isShown, setIsShown] = useState(false);

	return (
		<Skeleton isLoaded={!loading}>
			<Box
				_hover={{ transform: 'scale(1.1)', transitionDuration: '0.5s' }}
				borderWidth='1px'
				overflow='hidden'
				p='4'
				shadow='md'>
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
							onClick={() => dispatch(removeFromFavorites(product._id))}>
							<MdOutlineFavorite />
						</IconButton>
					) : (
						<IconButton size='sm' bg='cyan.600' color='black' onClick={() => dispatch(addToFavorites(product._id))}>
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
				</Flex>
			</Box>
		</Skeleton>
	);
};

export default ProductCard;
