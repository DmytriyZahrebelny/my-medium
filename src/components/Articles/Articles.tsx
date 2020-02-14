import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/configureStore';
import './articles.sass';

const Articles = () => {
	const allArticles = useSelector((state: RootState) => state.articlesStore.allArticles);

	if (!allArticles?.articles) {
		return null;
	}

	return (
		<div className='articles'>
			{allArticles.articles.map(({ title, slug, author, createdAt, body }: any) => (
				<Link className='articles__link' to={`/posts/:${slug}`} key={slug}>
					<div className='articles__author'>
						<img className='articles__author-img' src={author.image} alt='img' />
						<div>
							<p className='articles__author-name'>{author.username}</p>
							<p className='articles__author-data'>{new Date(createdAt).toDateString()}</p>
						</div>
					</div>
					<h2 className='articles__name'>{title}</h2>
					<p className='articles__text'>{body}</p>
				</Link>
			))}
		</div>
	);
};

export default Articles;
