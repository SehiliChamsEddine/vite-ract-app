import React from 'react';

const Search = ({ search: { searchTerm, setSearchTerm } }) => {
	return (
		<div className="search ">
			<img
				src="/Search.svg"
				alt="search"
				className="w-[20px] h-[20px] absolute left-2 "
			/>
			<input
				type="text"
				placeholder="find your best movie"
				value={searchTerm}
				className=" outline-none border-none w-full font-normal text-xl leading-5 tracking-normal text-search"
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
			/>
		</div>
	);
};
export default Search;
