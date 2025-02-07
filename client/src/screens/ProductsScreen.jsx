import { Box, Flex, Center } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from '../redux/actions/productActions';

const ProductsScreen = () => {
	const dispatch = useDispatch();
	const { loading, error, products, pagination } = useSelector((state) => state.product);
	useEffect(() => {
		dispatch(getProducts());
	}, [dispatch]);

	return (
		<>
			{products.length > 1 && (
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
