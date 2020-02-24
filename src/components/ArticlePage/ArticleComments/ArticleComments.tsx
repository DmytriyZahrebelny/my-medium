import React, { useEffect, useState } from 'react';
import { articleCommentsApi } from './articleCommentsApi';

interface IArticleCommentsProps {
	slug: string;
}

const ArticleComments: React.FC<IArticleCommentsProps> = ({ slug }) => {
	const [comments, setComments] = useState<any[]>([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await articleCommentsApi.allArticles(slug);
			console.log(response);
			return response;
		};

		fetchData();
	}, []);

	if (comments.length === 0) {
		return null;
	}
	return <div>test</div>;
};

export default ArticleComments;
