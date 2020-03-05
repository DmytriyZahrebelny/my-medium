import React from 'react';
import Icon from '../../components/Icon';
import { IPreferenceArticleProps } from '../interfaces';
import { useAuthStore } from '../../../store/AuthStore/AuthStore';
import { useArticlesStore } from '../../../store/ArticlesStore/ArticlesStore';
import './preferenceArticle.sass';

const PreferenceArticle: React.FC<IPreferenceArticleProps> = ({
	favoritesCount,
	favorited,
	slug,
}) => {
	const { token } = useAuthStore();
	const { checkPreferenceArticleAction } = useArticlesStore();
	const onButtonCklick = () => {
		if (token) {
			checkPreferenceArticleAction(favorited, slug);
		}
	};

	return (
		<button
			className={favorited ? 'preference  my-preference' : 'preference'}
			onClick={onButtonCklick}
		>
			<Icon name='like' size={12} fill={favorited ? '#ffffff' : '#5cb85c'} />
			<span
				className={favorited ? 'preference__number  my-preference__number' : 'preference__number'}
			>
				{favoritesCount}
			</span>
		</button>
	);
};

export default PreferenceArticle;
