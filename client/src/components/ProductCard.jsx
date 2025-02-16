import { Box, Image, Text, Badge, Flex, IconButton } from '@chakra-ui/react';
import { BiExpand } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { addToFavorites, removeFromFavorites } from '../redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';

const MotionBox = motion.create(Box);

const ProductCard = ({ product, loading }) => {
	const dispatch = useDispatch();
	const { favorites } = useSelector((state) => state.product);

	return (
		<MotionBox
			isLoaded={!loading}
			initial={{ opacity: 0 }}
			animate={{ opacity: loading ? 0.5 : 1 }}
			transition={{ duration: 0.3 }}
			_hover={{ transform: 'scale(1.1)', transitionDuration: '0.5s' }}
			borderWidth='1px'
			overflow='hidden'
			p='4'
			shadow='md'>
			<Image src={product.images[0]} fallbackSrc='https://via/placeholder.com/150' alt={product.name} height='200px' />
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
					<IconButton size='sm' bg='cyan.600' color='black' onClick={() => dispatch(removeFromFavorites(product._id))}>
						<MdOutlineFavorite />
					</IconButton>
				) : (
					<IconButton size='sm' bg='cyan.600' color='black' onClick={() => dispatch(addToFavorites(product._id))}>
						<MdOutlineFavoriteBorder />
					</IconButton>
				)}
				<IconButton bg='cyan.600' size='sm' color='black' aria-label='expand'>
					<BiExpand size='20' />
				</IconButton>
			</Flex>
		</MotionBox>
	);
};

export default ProductCard;
