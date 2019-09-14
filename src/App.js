import React, { Component } from 'react';
import Title from './components/Title';
import Control from './components/Control';
import Form from './components/Form';
import Lists from './components/Lists';
import {filter, includes, orderBy as funcOrderBy, remove, reject } from 'lodash';

// import Tasks from './mocks/tasks';

const uuidv4 = require('uuid/v4');

class App extends Component {
	constructor(props){
		super(props);

		this.state = {
			items		: [],
			isShowForm	: false,
			strSearch	: '',
			orderBy		: 'name',
			orderDir	: 'asc',
			itemSelected: null
		};

		this.handleToogleForm 	= this.handleToogleForm.bind(this);
		this.handleCloseForm 	= this.handleCloseForm.bind(this);
		this.handleSearchGo		= this.handleSearchGo.bind(this);
		this.handleSort			= this.handleSort.bind(this);
		this.handleDeleteItem	= this.handleDeleteItem.bind(this);
		this.handleSubmit		= this.handleSubmit.bind(this);
		this.handleEditItem		= this.handleEditItem.bind(this);
	}

	componentWillMount(){
		let items = JSON.parse(localStorage.getItem("task"));
		if(items === null) items = [];

		this.setState({
			items		: items
		})
	}

	handleToogleForm(){
		this.setState({
			isShowForm : !this.state.isShowForm,
			itemSelected: null
		})
	}
	
	handleCloseForm(){
		this.setState({
			isShowForm: false
		})
	}

	handleSearchGo(value){
		this.setState({
			strSearch: value
		});
	}

	handleSort(orderBy, orderDir){
		this.setState({
			orderBy		: orderBy,
			orderDir	: orderDir
		});
	}

	handleDeleteItem(id){
		let items = this.state.items;

		remove(items, (item) => {
			return item.id === id;
		});

		this.setState({
			items: items
		});

		localStorage.setItem("task", JSON.stringify(items));
	}

	handleSubmit(item){
		let {items} = this.state;
		let id = null;
		
		if(item.id !== ''){ //edit
			items = reject(items, { id: item.id });
			id = item.id;
		} else { //add new
			id = uuidv4();
		}

		items.push({
			id		: id,
			name	: item.name,
			level	: +item.level
		});
		
		this.setState({
			items: items,
			isShowForm: false
		});

		localStorage.setItem("task", JSON.stringify(items));
	}

	handleEditItem(item){
		this.setState({
			itemSelected: item,
			isShowForm: true
		})
	}

	render(){
		let itemsOrigin 			= [...this.state.items];
		let isShowForm 				= this.state.isShowForm;
		let eleForm					= null;
		let items					= [];
		const search 				= this.state.strSearch;
		let {orderBy, orderDir, itemSelected } 	= this.state;

		items = filter(itemsOrigin, (item) => {
			return includes(item.name.toLowerCase(), search.toLowerCase());
		});

		//Sort
		items = funcOrderBy(items, [orderBy], [orderDir]);

		if(isShowForm) eleForm = <Form itemSelected={itemSelected} onClickSubmit={this.handleSubmit} onClickCloseForm={this.handleCloseForm}/>;
		else eleForm = null;
		
		return (
			<div>
				{/* TITLE : START */}
				<Title />
				{/* TITLE : END */}
	
				{/* CONTROL (SEARCH + SORT + ADD) : START */}
				<Control 
					orderBy				= {orderBy}
					orderDir			= {orderDir}	
					onClickSort			= {this.handleSort}	
					onClickAddSearchGo 	= {this.handleSearchGo}
					onClickAddTask		={this.handleToogleForm} 
					isShowForm			={this.state.isShowForm}
				/>
				{/* CONTROL (SEARCH + SORT + ADD) : END */}
	
				{/* FORM : START */}
				{ eleForm }
				{/* FORM : END */}
	
				{/* LIST : START */}
				<Lists 
					onClickEditItem = {this.handleEditItem}
					onClickDeleteItem={this.handleDeleteItem}
					items={items} 
				/>
				{/* LIST : START */}
				
			</div>
		);
	}
}

export default App;
