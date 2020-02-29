import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/Tags/TagsStore';
import { RootState } from '../../../store/configureStore';
import './tags.sass';

const Tags = () => {
	const [activeLink, setActiveLink] = useState<string>('');
	const tags: string[] = useSelector((state: RootState) => state.tagsStore);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.getTagsAsyncAction());
	}, [dispatch]);

	if (!tags.length) {
		return null;
	}

	return (
		<div className='tags'>
			<h1 className='tags__title'>Popular Tags</h1>
			{tags.map((tag: string) => (
				<Link
					to={`/bytag/${tag}`}
					className={`tags__link  ${activeLink === tag ? 'tags__link--active' : ''}`}
					key={tag}
					onClick={() => setActiveLink(tag)}
				>
					{tag}
				</Link>
			))}
		</div>
	);
};

export default Tags;
