import { useEffect, useMemo, useRef, useState } from 'react';

import { RiseLoader } from 'react-spinners';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateMoviesSearchCount } from '../appwrite';
import Card from '../components/Card';
import Search from '../components/Search';

function Home() {
	const [movieList, setMovieList] = useState([]);
	const [errMessage, setErrMessage] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
	const [trendingMovies, setTrendingMovies] = useState([]);
	const [isLoadingTrendingMovies, setIsLoadingTrendingMovies] = useState(true);

	const searchRef = useRef(null);

	const options = useMemo(() => {
		return {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}`,
			},
		};
	}, []);

	const LoadMovies = async () => {
		setIsLoadingTrendingMovies(true);
		const result = await getTrendingMovies();
		setTrendingMovies(result);
		setIsLoadingTrendingMovies(false);
	};

	const fetchData = (url, options, on) => {
		setIsLoading(true);
		fetch(url, options)
			.then((res) => res.json())
			.then((json) => {
				setMovieList(json.results || []);

				setIsLoading(false);
				setErrMessage('');
				if (json.results && on === 'search') {
					updateMoviesSearchCount(json.results[0]);
				}
			})
			.catch((error) => {
				setErrMessage('failed to load movies');
				setMovieList([]);
				setIsLoading(false);
				console.log(error.data, error.message);
			});
	};

	useDebounce(
		() => {
			setDebouncedSearchTerm(searchTerm);
		},
		600,
		[searchTerm]
	);
	useEffect(() => {
		let url, on;
		if (!debouncedSearchTerm.trim()) {
			url =
				'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';
			on = 'load';
		} else {
			url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
				debouncedSearchTerm
			)}`;
			on = 'search';
		}
		fetchData(url, options, on);
	}, [debouncedSearchTerm, options]);
	useEffect(() => {
		const url =
			'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';

		try {
			fetchData(url, options);
		} catch (error) {
			console.log(error.name, error.message);
		}
	}, [options]);
	useEffect(() => {
		LoadMovies();
	}, []);

	return (
		<>
			<main>
				<div className="pattern -z-10" />
				<div className="wrapper">
					<header>
						<div className=" w-[90px] h-[66px] mx-auto  py-5  ">
							<img src="logo.svg" alt="" />
						</div>
						<img src="hero.png" alt="hero image" />
						<p className=" text-center  max-w-5xl text-[40px] lg:text-[56px] mx-auto font-bold leading-16 tracking-[-1%]">
							Find <span className="gradient-text">Movies</span> You’ll Love
							Without the Hassle
						</p>
						<Search ref={searchRef} search={{ setSearchTerm, searchTerm }} />
					</header>
					<div className="trending">
						<h2 className=" font-bold leading-8 text-3xl w-full my-6">
							Trending
						</h2>
						<div className="movies">
							{isLoadingTrendingMovies ? (
								<RiseLoader
									color="#ab8bff"
									className=" mx-auto my-10 sm:my-30"
								/>
							) : (
								trendingMovies.map((movie, index) => (
									<div key={movie.$id} className="movie">
										<span>{index + 1}</span>
										<img
											src={
												movie.poster_url
													? `https://image.tmdb.org/t/p/w500${movie.poster_url}`
													: 'No-Poster.png'
											}
											alt={movie.title}
										/>
									</div>
								))
							)}
						</div>
					</div>
					<div className="flex flex-wrap  w-full justify-center 2xl:justify-between gap-10 lg:gap-5 ">
						<h2 className=" font-bold leading-8 text-3xl w-full my-6">
							Popular
						</h2>
						{isLoading ? (
							<RiseLoader color="#ab8bff" className=" mx-auto my-10 sm:my-30" />
						) : errMessage ? (
							errMessage
						) : (
							movieList.map((movie) => {
								return <Card key={movie.id} movie={movie} />;
							})
						)}
					</div>
				</div>
			</main>
		</>
	);
}

export default Home;
