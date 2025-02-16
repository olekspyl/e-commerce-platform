import { Box, Button, Center, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../redux/actions/productActions';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const ProductsScreen = () => {
	const dispatch = useDispatch();
	const { loading, error, products, pagination, favoritesToggled } = useSelector((state) => state.product);
	useEffect(() => {
		dispatch(getProducts(1));
	}, [dispatch]);

	const paginationButtonClick = (page) => {
		dispatch(getProducts(page));
	};

	return (
		<>
			{products.length >= 1 && (
				<Box>
					<Flex wrap='wrap' spacing='30px' justify='center' minHeight='80vh' mx={{ base: '12', md: '20', lg: '32' }}>
						{products.map((product) => (
							<Box key={product._id}>
								<Center w='250px' h='450px'>
									<ProductCard product={product} loading={loading} />
								</Center>
							</Box>
						))}
					</Flex>
				</Box>
			)}
		</>
	);
};

export default ProductsScreen;
