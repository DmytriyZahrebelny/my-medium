import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { RootState } from '../../store/configureStore';
import * as authAction from '../../store/Auth/AuthStore';
import * as articlesAction from '../../store/Articles/ArticlesStore';

export const useArticlesListHooks = () => {
	const { articles } = useSelector((state: RootState) => state.articlesStore);
	const [numberPage, setNumberPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const { tag = '' } = useParams();

	useEffect(() => {
		if (pathname === '/' || pathname === '/posts') {
			Promise.resolve(dispatch(authAction.loginAsyncAction())).then(() => {
				dispatch(articlesAction.getArticlesAsyncAction());
			});
		} else if (pathname === `/bytag/${tag}`) {
			dispatch(articlesAction.getArticleByTagAsyncAction(tag));
		}
		setNumberPage(1);
	}, [dispatch, pathname, tag]);

	useEffect(() => {
		if ((pathname === '/' || pathname === '/posts') && loading) {
			dispatch(articlesAction.getArticlesAsyncAction(numberPage));
			setLoading(false);
		} else if (tag && loading) {
			dispatch(articlesAction.getArticleByTagAsyncAction(tag, numberPage));
			setLoading(false);
		}
	}, [numberPage, dispatch, loading, tag, pathname]);

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

	return {
		articles,
		lastArticlesLinkRef,
	};
};
