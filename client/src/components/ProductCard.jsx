import { Box, Image, Text, Badge, Flex, IconButton } from '@chakra-ui/react';
import { BiExpand } from 'react-icons/bi';
import { motion } from 'framer-motion';
const MotionBox = motion.create(Box);

const ProductCard = ({ product, loading }) => {
	return (
		<MotionBox
			initial={{ opacity: 0 }}
			animate={{ opacity: loading ? 0.5 : 1 }}
			transition={{ duration: 0.3 }}
			_hover={{ transform: 'scale(1.1)', transitionDuration: '0.5s' }}
			borderWidth='1px'
			overflow='hidden'
			p='4'
			shadow='md'>
			<Image />
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
			<IconButton bg='cyan.600' size='sm' color='black' aria-label='expand'>
				<BiExpand size='20' />
			</IconButton>
		</MotionBox>
	);
};

export default ProductCard;
