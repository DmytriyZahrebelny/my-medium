import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../../components/Icon';
import { IPreferenceArticleProps } from '../interfaces';
import * as actions from '../../../store/Articles/ArticlesStore';
import { RootState } from '../../../store/configureStore';
import './preferenceArticle.sass';

const PreferenceArticle: React.FC<IPreferenceArticleProps> = ({
	favoritesCount,
	favorited,
	slug,
}) => {
	const dispatch = useDispatch();
	const { token } = useSelector((state: RootState) => state.authStore);
	const onButtonCklick = () => {
		if (token) {
			dispatch(actions.checkPreferenceArticleAsyncAction(favorited, slug));
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
