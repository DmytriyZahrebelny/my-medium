import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../../store/createStore';
import './tags.sass';

const Tags = () => {
	const [activeLink, setActiveLink] = useState<string>('');
	const { tagsStore } = useStore();
	const { tags, getTagsAction } = tagsStore;
	const { tag = '' } = useParams();

	useEffect(() => {
		getTagsAction();
	}, [getTagsAction]);

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

export default observer(Tags);
