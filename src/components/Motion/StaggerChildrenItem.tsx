import { m as motion } from 'framer-motion';
import React from 'react';

const PostRow: React.FC<any> = props => {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				show: { opacity: 1, y: 0 }
			}}
			{...props}
		>
			{props.children}
		</motion.div>
	);
};

export default PostRow;

export const PostListItemMotion: React.FC<any> = props => {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 20 },
				show: { opacity: 1, y: 0 }
			}}
			{...props}
		>
			{props.children}
		</motion.div>
	);
};
