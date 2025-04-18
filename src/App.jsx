import { use, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';

import Search from './components/Search';

function App() {
	const [movieList, setMovieList] = useState([]);
	const [errMessage, setErrMessage] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

	const options = useMemo(() => {
		return {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}`,
			},
		};
	}, []);
	const fetchData = async (url, options) => {
		setIsLoading(true);
		fetch(url, options)
			.then((res) => res.json())
			.then((json) => {
				setMovieList(json.results ? json.results : []);
				setIsLoading(false);
				setErrMessage('');
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
		const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
			debouncedSearchTerm
		)}`;

		fetchData(url, options);
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
						<Search search={{ setSearchTerm, searchTerm }} />
					</header>
					<div className="flex flex-wrap mt-20 w-full justify-center gap-5 ">
						{isLoading ? (
							<p className=" text-3xl font-bold"> "Loading ..."</p>
						) : errMessage ? (
							errMessage
						) : (
							movieList.map((movie) => {
								return (
									<div
										key={movie.id}
										className=" w-[300px] rounded-2xl  px-[18px] py-5 shadow-card  flex flex-col content-between overflow-hidden bg-card "
									>
										<img
											className="object-cover   rounded-2xl"
											src={
												movie.poster_path
													? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
													: 'No-Poster.png'
											}
											alt="Img Poster"
										/>
									</div>
								);
							})
						)}
					</div>
				</div>
			</main>
		</>
	);
}

export default App;
