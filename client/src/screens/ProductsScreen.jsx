import {
	Alert,
	AlertTitle,
	AlertIcon,
	AlertDescription,
	Box,
	Button,
	Center,
	Wrap,
	Flex,
	IconButton,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../redux/actions/productActions';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const ProductsScreen = () => {
	const dispatch = useDispatch();
	const { loading, error, products, pagination, favoritesToggled } = useSelector((state) => state.product);
	console.log(error);
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
					<Wrap spacing='30px' justify='center' minHeight='80vh' mx={{ base: '12', md: '20', lg: '32' }}>
						{error ? (
							<Alert status='error'>
								<AlertIcon />
								<AlertTitle>We are sorry!</AlertTitle>
								<AlertDescription>{error}</AlertDescription>
							</Alert>
						) : (
							products.map((product) => (
								<Box key={product._id}>
									<Center w='250px' h='450px'>
										<ProductCard product={product} loading={loading} />
									</Center>
								</Box>
							))
						)}
					</Wrap>
					{!favoritesToggled && (
						<Flex spacing='10px' justify='center' p='5'>
							<Button bg='cyan.600' onClick={() => paginationButtonClick(1)}>
								<IconButton size='sm' bg='cyan.600'>
									<FiArrowLeft />
								</IconButton>
							</Button>
							{Array.from(Array(pagination.totalPages), (e, i) => {
								return (
									<Button
										bg={pagination.currentPage === i + 1 ? 'cyan.600' : 'grey'}
										key={i}
										onClick={() => paginationButtonClick(i + 1)}>
										{i + 1}
									</Button>
								);
							})}
							<Button bg='cyan.600' onClick={() => paginationButtonClick(pagination.totalPages)}>
								<IconButton size='sm' bg='cyan.600'>
									<FiArrowRight />
								</IconButton>
							</Button>
						</Flex>
					)}
				</Box>
			)}
		</>
	);
};

export default ProductsScreen;
