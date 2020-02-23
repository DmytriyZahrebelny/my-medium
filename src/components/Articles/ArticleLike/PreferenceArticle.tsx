import React from 'react';
import Icon from '../../components/Icon';
import { IPreferenceArticleProps } from '../interfaces';
import './preferenceArticle.sass';

const PreferenceArticle: React.FC<IPreferenceArticleProps> = ({ favoritesCount, favorited }) => {
	return (
		<div className={favorited ? 'preference  my-preference' : 'preference'}>
			<Icon name='like' size={12} fill={favorited ? '#ffffff' : '#5cb85c'} />
			<span
				className={favorited ? 'preference__number  my-preference__number' : 'preference__number'}
			>
				{favoritesCount}
			</span>
		</div>
	);
};

export default PreferenceArticle;
