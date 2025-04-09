import React from 'react';
import ReactDOM from 'react-dom/client';

import Header from './components/header/header';
import TodoList from './components/todo-list/todo-list';
import Search from './components/search/search';
import ItemStatusFilter from './components/item-status-filter/item-status-filter';

const App = () => {
	const todoData = [
		{ label: 'one', important: false, id: 1 },
		{ label: 'two', important: true, id: 2 },
		{ label: 'three', important: false, id: 3 },
	];

	return (
		<div className='todo-app'>
			<Header toDo={1} done={3} />
			<div className='top-panel d-flex'>
				<Search />
				<ItemStatusFilter />
			</div>

			<TodoList todos={todoData} />
		</div>
	);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
