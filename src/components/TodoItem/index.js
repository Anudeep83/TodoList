import React, {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    editText: this.props.todoDetails.title,
  }

  handleEditChange = event => {
    this.setState({editText: event.target.value})
  }

  handleSave = () => {
    const {todoDetails, onUpdateTodoTitle, onToggleEdit} = this.props
    onUpdateTodoTitle(todoDetails.id, this.state.editText)
    onToggleEdit(todoDetails.id)
  }

  handleToggleEdit = () => {
    const {todoDetails, onToggleEdit} = this.props
    this.setState({editText: todoDetails.title})
    onToggleEdit(todoDetails.id)
  }

  render() {
    const {todoDetails, onDeleteTodo, onToggleCompleted} = this.props
    const {id, title, isCompleted, isEditing} = todoDetails
    const {editText} = this.state

    return (
      <li className="todo-item">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggleCompleted(id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={this.handleEditChange}
            className="edit-input"
          />
        ) : (
          <p className={`todo-title ${isCompleted ? 'completed' : ''}`}>
            {title}
          </p>
        )}
        <button
          type="button"
          className="edit-button"
          onClick={isEditing ? this.handleSave : this.handleToggleEdit}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          type="button"
          className="delete-button"
          onClick={() => onDeleteTodo(id)}
        >
          Delete
        </button>
      </li>
    )
  }
}

export default TodoItem
