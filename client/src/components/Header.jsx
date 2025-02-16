import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorites } from '../redux/actions/productActions';

const Header = () => {
	const dispatch = useDispatch();
	const { favoritesToggled } = useSelector((state) => state.product);

	return (
		<>
			{favoritesToggled ? (
				<IconButton variant='ghost' onClick={() => dispatch(toggleFavorites(false))}>
					<MdOutlineFavorite size='20px' />
				</IconButton>
			) : (
				<IconButton variant='ghost' onClick={() => dispatch(toggleFavorites(true))}>
					<MdOutlineFavoriteBorder size='20px' />
				</IconButton>
			)}
		</>
	);
};

export default Header;
