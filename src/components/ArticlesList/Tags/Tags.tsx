import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArticlesListHooks } from '../useArticlesListHooks';
import './tags.sass';

const Tags = () => {
	const [activeLink, setActiveLink] = useState<string>('');
	const { tag, tags } = useArticlesListHooks();

	if (!tags.length) {
		return null;
	}

	return (
		<div className='tags'>
			<h1 className='tags__title'>Popular Tags</h1>
			{tags.map((tagName: string) => (
				<Link
					to={`/bytag/${tagName}`}
					className={`tags__link  ${activeLink === tagName && tag ? 'tags__link--active' : ''}`}
					key={tagName}
					onClick={() => setActiveLink(tagName)}
				>
					{tagName}
				</Link>
			))}
		</div>
	);
};

export default Tags;
