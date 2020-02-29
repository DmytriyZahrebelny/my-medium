import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as actions from '../../../store/Tags/TagsStore';
import { RootState } from '../../../store/configureStore';
import './tags.sass';

const Tags = () => {
	const [activeLink, setActiveLink] = useState<string>('');
	const tags: string[] = useSelector((state: RootState) => state.tagsStore);
	const dispatch = useDispatch();
	const { tag = '' } = useParams();

	useEffect(() => {
		dispatch(actions.getTagsAsyncAction());
	}, [dispatch]);

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
