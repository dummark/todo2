import React, { Component } from 'react';

import Header from '../header';
import TodoList from '../todo-list';
import Search from '../search';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

export default class App extends Component {
	maxId = 100;

	state = {
		todoData: [
			{ label: 'one', important: false, id: 1 },
			{ label: 'two', important: true, id: 2 },
			{ label: 'three', important: false, id: 3 },
		],
	};

	deleteItem = id => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex(el => el.id === id);

			return {
				todoData: todoData.toSpliced(idx, 1),
			};
		});
	};

	addItem = text => {
		const newItem = {
			label: text,
			important: false,
			id: this.maxId++,
		};

		this.setState(({ todoData }) => {
			return {
				todoData: [...todoData, newItem],
			};
		});
	};

	render() {
		return (
			<div className='todo-app'>
				<Header toDo={1} done={3} />
				<div className='top-panel d-flex'>
					<Search />
					<ItemStatusFilter />
				</div>

				<TodoList todos={this.state.todoData} onDeleted={this.deleteItem} />
				<ItemAddForm onItemAdded={this.addItem} />
			</div>
		);
	}
}
