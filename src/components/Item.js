import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleDelete   = this.handleDelete.bind(this);
        this.handleEdit     = this.handleEdit.bind(this);
    }

    showLevelElement(level){
        let eleLevel = null;
        switch (level) {
            case 0:
                eleLevel = <span className="label label-default">Small</span>;
                break;
            case 1:
                eleLevel = <span className="label label-info">Medium</span>;
                break;
            case 2:
                eleLevel = <span className="label label-danger">High</span>;
                break;
            default:
        }
        return eleLevel;
    }

    handleDelete(itemID){
        this.props.onClickDeleteItem(itemID)
    }

    handleEdit(item){
        this.props.onClickEditItem(item);
    }

    render() {
        let {item} = this.props;
        let {index} = this.props;

        return (
            <tr>
                <td className="text-center">{index + 1}</td>
                <td>{ item.name }</td>
                <td className="text-center">{ this.showLevelElement(item.level) }</td>
                <td>
                    <button type="button" className="btn btn-warning" onClick={() => this.handleEdit(item)}>Edit</button>
                    <button type="button" className="btn btn-danger" onClick={ () => this.handleDelete(item.id)}>Delete</button>
                </td>
            </tr>
        );
    }
}

export default Item;