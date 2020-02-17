import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArticlesList from './ArticlesList/ArticlesList';
import { RootState } from '../../store/configureStore';
import * as articlesAction from '../../store/Articles/ArticlesStore';
import './articles.sass';

const Articles = () => {
	const [numberPage, setNumberPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const articles = useSelector((state: RootState) => state.articlesStore.allArticles.articles);

	useEffect(() => {
		if (loading) {
			dispatch(articlesAction.allArticlesAsyncAction(numberPage));
			setLoading(false);
		}
	}, [numberPage, dispatch, loading]);

	const observer: any = useRef();
	const lastArticlesLinkRef = useCallback((node: HTMLElement) => {
		if (observer.current) {
			observer.current.disconnect();
		}

		observer.current = new IntersectionObserver(entries => {
			if (entries[0].isIntersecting) {
				setLoading(true);
				setNumberPage((prevNumberPage: number) => prevNumberPage + 1);
			}
		});

		if (node) {
			observer.current.observe(node);
		}
	}, []);

	if (!articles.length) {
		return null;
	}

	return (
		<div className='articles'>
			<ArticlesList articles={articles} lastArticlesLinkRef={lastArticlesLinkRef} />
		</div>
	);
};

export default Articles;
