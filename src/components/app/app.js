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
			this.createTodoItem('one'),
			this.createTodoItem('two'),
			this.createTodoItem('three'),
		],
		term: '',
		filter: 'all',
	};

	createTodoItem(label) {
		return { label, important: false, done: false, id: this.maxId++ };
	}

	deleteItem = id => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex(el => el.id === id);

			return {
				todoData: todoData.toSpliced(idx, 1),
			};
		});
	};

	addItem = text => {
		const newItem = this.createTodoItem(text);

		this.setState(({ todoData }) => {
			return {
				todoData: [...todoData, newItem],
			};
		});
	};

	toggleProperty(arr, id, proName) {
		const idx = arr.findIndex(el => el.id === id);

		const oldItem = arr[idx];
		const newItem = { ...oldItem, [proName]: !oldItem[proName] };

		return arr.toSpliced(idx, 1, newItem);
	}

	onToggleImportant = id => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'important'),
			};
		});
	};

	onToggleDone = id => {
		this.setState(({ todoData }) => {
			return {
				todoData: this.toggleProperty(todoData, id, 'done'),
			};
		});
	};

	search(items, term) {
		if (term.length === 0) {
			return items;
		}
		return items.filter(item => {
			return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
		});
	}

	onSearchChange = term => {
		this.setState({ term });
	};

	filter(items, filter) {
		switch (filter) {
			case 'all':
				return items;
			case 'active':
				return items.filter(item => !item.done);
			case 'done':
				return items.filter(item => item.done);
			default:
				return items;
		}
	}

	onFilterChange = filter => {
		this.setState({ filter });
	};

	render() {
		const { todoData, term, filter } = this.state;

		const visibleItems = this.filter(this.search(todoData, term), filter);

		const doneCount = todoData.filter(el => el.done).length;

		const todoCount = todoData.length - doneCount;

		return (
			<div className='todo-app'>
				<Header toDo={todoCount} done={doneCount} />
				<div className='top-panel d-flex'>
					<Search onSearchChange={this.onSearchChange} />
					<ItemStatusFilter
						filter={filter}
						onFilterChange={this.onFilterChange}
					/>
				</div>
				<TodoList
					todos={visibleItems}
					onDeleted={this.deleteItem}
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}
				/>
				<ItemAddForm onItemAdded={this.addItem} />
			</div>
		);
	}
}
