import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const movie = location.state?.movie;
	useEffect(() => {
		if (!movie) {
			navigate('/', { replace: true });
		}
	}, [movie, navigate]);

	if (!movie) {
		return null;
	}

	return (
		<div className="flex w-screen min-h-screen overflow-x-hidden text-white  items-center justify-center">
			<div className=" mx-5  sm:max-w-3xl lg:max-w-5xl xl:max-w-7xl w-full  shadow-outer-card bg-[#0F0D23] p-12 ">
				<div className="top flex  w-full gap-5 flex-col  sm:justify-between sm:flex-row">
					<div className="title flex flex-col justify-between">
						<h1 className="font-bold text-4xl mb-5">{movie.title}</h1>
						<p className="flex text-[#9CA4AB] font-normal text-[18px] leading-[175%] gap-2">
							{movie.release_date ? (
								<p className="flex gap-0.5  font-bold">
									{movie.release_date
										? movie.release_date.split('-')[0]
										: 'N/A'}
								</p>
							) : null}
							<span>•</span>
							{movie.original_language ? (
								<p className="flex gap-0.5  font-bold capitalize">
									{movie.original_language ? movie.original_language : 'N/A'}
								</p>
							) : null}
							<span>•</span>

							<p className="flex gap-0.5  font-bold">
								{movie.adult ? '18+' : 'PG-13'}
							</p>
						</p>
					</div>
					<div className="ranking flex gap-2.5 shrink-0">
						<span className=" bg-[#221F3D] p-3 flex items-center rounded-[6px] h-[42px] gap-2.5 ">
							<img className=" w-5 h-5" src="../star.svg" alt="Rating" />
							<h1 className=" font-semibold text-[16px]">
								{`${movie.vote_average.toFixed(1)}`}{' '}
								<span className="text-[#A8B5DB] font-medium">/10</span>{' '}
							</h1>
							<p className="text-[#A8B5DB] font-medium">{`(${movie.vote_count}k)`}</p>
						</span>
						<span className="bg-[#221F3D] p-2 flex items-center rounded-[6px] h-[42px]">
							<img src="../trending.svg" alt="Trending" />
						</span>
					</div>
				</div>
				<div className="middle"></div>
				<div className="bottom"></div>
			</div>
		</div>
	);
};

export default MovieDetails;
