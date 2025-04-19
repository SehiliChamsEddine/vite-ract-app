import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/movie/:id" element={<MovieDetails />} />
		</Routes>
	);
};

export default App;
