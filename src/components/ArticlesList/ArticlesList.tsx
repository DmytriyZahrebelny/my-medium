import React from 'react';
import ArticlesLink from './ArticlesLink/ArticlesLink';
import Tags from './Tags/Tags';
import { useArticlesListHooks } from './useArticlesListHooks';
import './articlesList.sass';

const ArticlesList = () => {
	const { articles, lastArticlesLinkRef } = useArticlesListHooks();

	if (!articles.length) {
		return null;
	}

	return (
		<div className='articles'>
			<ArticlesLink articles={articles} lastArticlesLinkRef={lastArticlesLinkRef} />
			<Tags />
		</div>
	);
};

export default ArticlesList;
