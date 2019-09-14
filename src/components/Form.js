import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
		super(props);
		
		this.state = {
            task_id: '',
            task_name: '',
            task_level: 0
        };

		this.handleCancle = this.handleCancle.bind(this);
		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
	}
    
    componentWillMount(){
        let item = this.props.itemSelected;
        if (item !== null) {
            this.setState({
                task_id: item.id,
                task_name: item.name,
                task_level: item.level
            });
        }
    }

    componentWillReceiveProps(nextProps){
        let item = nextProps.itemSelected;
        if (item !== null) {
            this.setState({
                task_id: item.id,
                task_name: item.name,
                task_level: item.level
            });
        }
    }

	handleCancle(){
		this.props.onClickCloseForm();
	}

	handleChange(event) {
        const target = event.target;    // input selectbox
        const value  = target.type === 'checkbox' ? target.checked : target.value;
        const name   = target.name;

        this.setState({
            [name]: value
        });

    }

    handleSubmit(event) {
        let item = {
            id: this.state.task_id,
            name: this.state.task_name,
            level: this.state.task_level,
        };

        this.props.onClickSubmit(item);
        event.preventDefault();
    }

    render() {
        return (
            <div className="row">
				<div className="col-md-offset-7 col-md-5">
					<form onSubmit={this.handleSubmit} className="form-inline">
						<div className="form-group">
							<label className="sr-only" >label</label>
							<input value={this.state.task_name} onChange={this.handleChange} name="task_name" type="text" className="form-control" placeholder="Task Name" />
						</div>
						<div className="form-group">
							<label className="sr-only" >label</label>
							<select value={this.state.task_level} onChange={this.handleChange} name="task_level" className="form-control" required="required" >
								<option value={0}>Small</option>
                                <option value={1}>Medium</option>
                                <option value={2}>High</option>
							</select>
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
						<button onClick={() => this.handleCancle()} type="button" className="btn btn-default">Cancel</button>
					</form>
				</div>
			</div>
        );
    }
}

export default Form;