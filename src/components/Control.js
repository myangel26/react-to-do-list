import React, { Component } from 'react';
import Search from "./Search";
import Sort from "./Sort";

class Control extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleAdd = this.handleAdd.bind(this);
        this.handleShowBtn = this.handleShowBtn.bind(this);
    }

    handleAdd(){
        this.props.onClickAddTask();
    }

    handleShowBtn(){
        let btnTask = <button onClick={this.handleAdd} type="button" className="btn btn-info btn-block">Add Task</button>;
        if(this.props.isShowForm) btnTask = <button onClick={this.handleAdd} type="button" className="btn btn-success btn-block">Close Form</button>;
        return btnTask;
    }

    render() {
        let {orderBy, orderDir} 	= this.props;

        return (
            <div className="row">
                {/* SEARCH : START */}
                <Search onClickGo={this.props.onClickAddSearchGo}/>
                {/* SEARCH : END */}

                {/* SORT : START */}
                <Sort 
                    orderBy		= {orderBy}
                    orderDir    = {orderDir}	
                    onClickSort = {this.props.onClickSort}
                />
                {/* SORT : END */}

                {/* ADD : START */}
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                    {this.handleShowBtn()}
                </div>
                {/* ADD : END */}
            </div>
        );
    }
}

export default Control;