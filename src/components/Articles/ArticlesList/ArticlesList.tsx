import React from 'react';
import { Link } from 'react-router-dom';
import { IArticlesData, IArticlesProps } from '../interfaces';
import './articlesList.sass';

const ArticlesList: React.FC<IArticlesProps> = ({ articles, lastArticlesLinkRef }) => (
	<>
		{articles.map(({ title, slug, author, createdAt, body }: IArticlesData) => (
			<Link ref={lastArticlesLinkRef} className='article-link' to={`/posts/${slug}`} key={slug}>
				<div className='article-link__author'>
					<img className='article-link__author-img' src={author.image} alt='img' />
					<div>
						<p className='article-link__author-name'>{author.username}</p>
						<p className='article-link__author-data'>{new Date(createdAt).toDateString()}</p>
					</div>
				</div>
				<h2 className='article-link__name'>{title}</h2>
				<p className='article-link__text'>{body}</p>
			</Link>
		))}
	</>
);

export default ArticlesList;
