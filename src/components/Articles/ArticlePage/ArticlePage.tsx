import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../../store/configureStore';
import './articlePage.sass';

interface IArticleData {
	title: string;
	slug: string;
	author: {
		image: string;
		username: string;
	};
	createdAt: string;
	body: string;
}

const ArticlePage: React.FC = () => {
	const allArticles: any[] = useSelector((state: RootState) => state.articlesStore.allArticles.articles);
	const { location } = useHistory();

	if (!allArticles.length) {
		return null;
	}

	const id: string = location.pathname.slice(7);
	const articlleData = allArticles.find((el: IArticleData) => el.slug === id);
	const { title, body, createdAt, author }: IArticleData = articlleData;
	return (
		<>
			<div className='article'>
				<div className='article__container'>
					<h1 className='article__title'>{title}</h1>
					<div className='artcle__author'>
						<img className='artcle__img' src={author.image} alt='img' />
						<div>
							<p className='article__author-name'>{author.username}</p>
							<p className='article__author-data'>{new Date(createdAt).toDateString()}</p>
						</div>
					</div>
				</div>
			</div>
			<p className='article__text'>{body}</p>
		</>
	);
};

export default ArticlePage;
