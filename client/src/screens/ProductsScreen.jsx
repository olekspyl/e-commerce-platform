import { Box, Flex, Center } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import { useEffect, useState } from 'react';

const ProductsScreen = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get('/api/products')
			.then((res) => {
				setData(res.data.products);
			})
			.catch((err) => {
				console.error('Error fetching data: ', err);
			});
	}, []);

	return (
		<>
			{data.length > 1 && (
				<Box>
					<Flex wrap='wrap' spacing='30px' justify='center' minHeight='80vh' mx={{ base: '12', md: '20', lg: '32' }}>
						{data.map((product) => (
							<Box key={product._id}>
								<Center w='250px' h='450px'>
									<ProductCard product={product} loading={false} />
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
