import React from 'react';


const ListItem = (props) => {
    return (
        <li className="list-group-item">
            <button 
                onClick={props.editTodo} 
                className="btn btn-info mr-4">U</button>
                {props.item.name}
            <button  
                onClick={props.deleteTodo} 
                className="btn btn-danger ml-4">X</button>
        </li>
    )
}

export default ListItem;