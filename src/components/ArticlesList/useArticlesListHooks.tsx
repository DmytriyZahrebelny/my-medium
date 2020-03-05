import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { IObserverData } from './interfaces';
import { useArticlesStore } from '../../store/ArticlesStore/ArticlesStore';

export const useArticlesListHooks = () => {
	const { articles, getArticlesAction, getArticlesByTagAction } = useArticlesStore();
	const [numberPage, setNumberPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const { pathname } = useLocation();
	const { tag = '' } = useParams();

	useEffect(() => {
		if (pathname === '/' || pathname === '/posts') {
			getArticlesAction();
			setNumberPage(1);
		} else if (pathname === `/bytag/${tag}`) {
			getArticlesByTagAction(tag);
			setNumberPage(1);
		}
	}, [pathname, tag]);

	useEffect(() => {
		if ((pathname === '/' || pathname === '/posts') && loading) {
			getArticlesAction(numberPage);
			setLoading(false);
		} else if (tag && loading) {
			getArticlesByTagAction(tag, numberPage);
			setLoading(false);
		}
	}, [numberPage, loading, tag, pathname]);

	const observer: IObserverData = useRef<HTMLDivElement>();
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

	return {
		articles,
		lastArticlesLinkRef,
		numberPage,
	};
};
