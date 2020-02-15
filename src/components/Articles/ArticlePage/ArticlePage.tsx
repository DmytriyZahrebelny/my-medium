import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../store/configureStore';

const ArticlePage = () => {
	const allArticles = useSelector((state: RootState) => state.articlesStore.allArticles.articles);
	const { location } = useHistory();

	const id = location.pathname.slice(7);
	const articlleData = allArticles.find((el: any) => el.slug === id);
	console.log(articlleData);
	return <div>xc</div>;
};

export default ArticlePage;
