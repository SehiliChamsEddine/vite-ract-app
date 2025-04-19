import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ movie }) => {
	const navigate = useNavigate();
	return (
		<div
			onClick={() => navigate(`/movie/${movie.id}`, { state: { movie } })}
			className="cursor-pointer hover:brightness-75 duration-300 ease-in-out relative group hover:scale-[1.05] w-[300px] rounded-2xl  px-[18px] py-5 shadow-card  flex flex-col content-between overflow-hidden bg-card backdrop-blur-lg"
		>
			<img
				className="   rounded-2xl "
				src={
					movie.poster_path
						? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
						: 'No-Poster.png'
				}
				alt={movie.title}
			/>
			<div className="flex flex-col justify-between h-[60px] mt-5  text-[16px] leading-6 ">
				<h3 className="font-bold ">{movie.title}</h3>
				<div className="flex gap-2 items-center font-medium text-[#9CA4AB]">
					{movie.vote_average ? (
						<p className="flex gap-0.5 text-white font-bold">
							<img src="star.svg" alt="Rating" />
							{movie.vote_average.toFixed(1)}
						</p>
					) : (
						'N/A'
					)}

					<span>•</span>
					{movie.original_language ? (
						<p className="flex gap-0.5  font-bold capitalize">
							{movie.original_language ? movie.original_language : 'N/A'}
						</p>
					) : null}
					<span>•</span>
					{movie.release_date ? (
						<p className="flex gap-0.5  font-bold">
							{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
						</p>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Card;
