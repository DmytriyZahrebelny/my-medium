import React from 'react';
import { observer } from 'mobx-react';
import Icon from '../../components/Icon';
import { IPreferenceArticleProps } from '../interfaces';
import { useStore } from '../../../store/createStore';
import './preferenceArticle.sass';

const PreferenceArticle: React.FC<IPreferenceArticleProps> = ({
	favoritesCount,
	favorited,
	slug,
}) => {
	const { authStore, articlesStore } = useStore();
	const { token } = authStore;
	const { checkPreferenceArticleAction } = articlesStore;
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

export default observer(PreferenceArticle);
