import React from 'react';
import { observer } from 'mobx-react';
import ArticlesLink from './ArticlesLink/ArticlesLink';
// import Tags from './Tags/Tags';
import { useArticlesListHooks } from './useArticlesListHooks';
import './articlesList.sass';

const ArticlesList = () => {
	const { articles, lastArticlesLinkRef, numberPage } = useArticlesListHooks();

	if (!articles.length) {
		return null;
	}

	return (
		<div className='articles'>
			<ArticlesLink
				articles={articles}
				lastArticlesLinkRef={lastArticlesLinkRef}
				numberPage={numberPage}
			/>
			{/* <Tags /> */}
		</div>
	);
};

export default observer(ArticlesList);
