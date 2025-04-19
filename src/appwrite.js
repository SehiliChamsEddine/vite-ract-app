import { Client, Databases, ID, Query } from 'appwrite';

const VITE_PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const VITE_COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;
const VITE_DATABASE_ID = import.meta.env.VITE_DATABASE_ID;

const client = new Client();
client
	.setEndpoint('https://fra.cloud.appwrite.io/v1')
	.setProject(VITE_PROJECT_ID);

const databases = new Databases(client);
export const updateMoviesSearchCount = async (movie) => {
	try {
		const result = await databases.listDocuments(
			VITE_DATABASE_ID,
			VITE_COLLECTION_ID,
			[Query.equal('title', movie.title)]
		);
		if (result.documents.length > 0) {
			console.log(result);
			await databases.updateDocument(
				VITE_DATABASE_ID,
				VITE_COLLECTION_ID,
				result.documents[0].$id,
				{
					count: result.documents[0].count + 1,
				}
			);
		} else {
			await databases.createDocument(
				VITE_DATABASE_ID,
				VITE_COLLECTION_ID,
				ID.unique(),
				{
					title: movie.title,
					poster_url: movie.poster_path ? movie.poster_path : '',
					movie_id: movie.id,
				}
			);
		}
	} catch (error) {
		console.log(error.name, error.message);
	}
};

export const getTrendingMovies = async () => {
	try {
		const result = await databases.listDocuments(
			VITE_DATABASE_ID,
			VITE_COLLECTION_ID,
			[Query.limit(5), Query.orderDesc('count')]
		);
		// console.log(result.documents);
		return result.documents;
	} catch (error) {
		console.log(error.name, error.message);
	}
};
