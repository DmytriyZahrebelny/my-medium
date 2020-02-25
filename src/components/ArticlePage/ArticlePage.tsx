import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import CommentsForm from './CommentsForm/CommentsForm';
import ArticleComments from './ArticleComments/ArticleComments';
import { RootState } from '../../store/configureStore';
import { IAllArticlesData, IArticleData, IMatchParams } from './interfaces';
import './articlePage.sass';

const ArticlePage: React.FC = () => {
	const { token } = useSelector((state: RootState) => state.authStore);
	const { articles }: IAllArticlesData = useSelector(
		(state: RootState) => state.articlesStore.allArticles
	);

	const { params }: IMatchParams = useRouteMatch();
	if (!articles.length) {
		return null;
	}

	const articlleData = articles.find((el: IArticleData) => el.slug === params.id);
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
			{token ? <CommentsForm slug={params.id} /> : null}
			<ArticleComments slug={params.id} />
		</>
	);
};

export default ArticlePage;
