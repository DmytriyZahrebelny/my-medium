import React from 'react';
import { Link } from 'react-router-dom';
import PreferenceArticle from '../PreferenceArticle/PreferenceArticle';
import { IArticlesData, IArticlesProps } from '../interfaces';
import './articlesLink.sass';

const ArticlesLink: React.FC<IArticlesProps> = ({ articles, lastArticlesLinkRef, numberPage }) => (
	<div className='articles__container'>
		{articles.map(
			({ title, slug, author, createdAt, body, favoritesCount, favorited }: IArticlesData) => (
				<div ref={lastArticlesLinkRef} className='article-link' key={slug}>
					<div className='article-link__author'>
						<img className='article-link__author-img' src={author.image} alt='img' />
						<div>
							<p className='article-link__author-name'>{author.username}</p>
							<p className='article-link__author-data'>{new Date(createdAt).toDateString()}</p>
						</div>
						<PreferenceArticle favorited={favorited} favoritesCount={favoritesCount} slug={slug} />
					</div>
					<Link to={`/posts/${numberPage}/${slug}`}>
						<h2 className='article-link__name'>{title}</h2>
						<p className='article-link__text'>{body}</p>
					</Link>
				</div>
			)
		)}
	</div>
);

export default ArticlesLink;
