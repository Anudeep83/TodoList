// Write your code here
import React, {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  onDelete = () => {
    const {todoDetails, onDeleteTodo} = this.props
    onDeleteTodo(todoDetails.id)
  }

  render() {
    const {todoDetails} = this.props
    const {title} = todoDetails

    return (
      <li className="todo-item">
        <p className="todo-title">{title}</p>
        <button type="button" className="delete-button" onClick={this.onDelete}>
          Delete
        </button>
      </li>
    )
  }
}

export default TodoItem
