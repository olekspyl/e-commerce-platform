import { StarIcon } from '@chakra-ui/icons';

export const Star = ({ rating = 0, star = 0 }) => (
	<StarIcon color={rating >= star || rating === 0 ? 'cyan.500' : 'grey.200'} />
);

export default Star;


