import {Component} from 'react'
import TodoItem from '../TodoItem'
import Save from '../Save'
import './index.css'

const initialTodosList = [
  {id: 1, title: 'Book the ticket for today evening'},
  {id: 2, title: 'Rent the movie for tomorrow movie night'},
  {id: 3, title: 'Confirm the slot for the yoga session tomorrow morning'},
  {id: 4, title: 'Drop the parcel at Bloomingdale'},
  {id: 5, title: 'Order fruits on Big Basket'},
  {id: 6, title: 'Fix the production issue'},
  {id: 7, title: 'Confirm my slot for Saturday Night'},
  {id: 8, title: 'Get essentials for Sunday car wash'},
  {id: 9, title: 'I am fire , fire i am'},
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList.map(todo => ({
      ...todo,
      isCompleted: false,
      isEditing: false,
    })),
    inputText: '',
  }

  componentDidMount() {
    const savedTodos = localStorage.getItem('todosList')
    if (savedTodos) {
      this.setState({todosList: JSON.parse(savedTodos)})
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.todosList !== this.state.todosList) {
      localStorage.setItem('todosList', JSON.stringify(this.state.todosList))
    }
  }

  onDeleteTodo = id => {
    const updatedTodosList = this.state.todosList.filter(todo => todo.id !== id)
    this.setState({todosList: updatedTodosList})
  }

  onToggleEdit = id => {
    const updatedTodosList = this.state.todosList.map(todo =>
      todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo,
    )
    this.setState({todosList: updatedTodosList})
  }

  onUpdateTodoTitle = (id, newTitle) => {
    const updatedTodosList = this.state.todosList.map(todo =>
      todo.id === id ? {...todo, title: newTitle} : todo,
    )
    this.setState({todosList: updatedTodosList})
  }

  onToggleCompleted = id => {
    const updatedTodosList = this.state.todosList.map(todo =>
      todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
    )
    this.setState({todosList: updatedTodosList})
  }

  onInput = event => {
    this.setState({inputText: event.target.value})
  }

 onAddTodo = () => {
  const {inputText, todosList} = this.state
  const trimmedInput = inputText.trim()

  if (trimmedInput === '') return

  const words = trimmedInput.split(' ')
  const lastWord = words[words.length - 1]
  const count = parseInt(lastWord, 10)

  let title = trimmedInput
  let repeatCount = 1

  if (!isNaN(count) && /^[0-9]+$/.test(lastWord) && words.length > 1) {
    repeatCount = count -1
    title = words.slice(0, -1).join(' ')
  }

  const startingId = todosList.length > 0 ? todosList[todosList.length - 1].id + 1 : 1

  const newTodos = Array.from({length: repeatCount}).map((_, index) => ({
    id: startingId + index,
    title,
    isCompleted: false,
    isEditing: false,
  }))

  this.setState({
    todosList: [...todosList, ...newTodos],
    inputText: '',
  })
}


  render() {
    const {todosList, inputText} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Simple Todos</h1>
        <div>
          <input
            className="todos-input"
            type="text"
            placeholder="Add your Todo"
            value={inputText}
            onChange={this.onInput}
          />
        </div>
        <button className="btn" onClick={this.onAddTodo}>
          Add
        </button>
        <ul className="todos-list">
          {todosList.map(todo => (
            <TodoItem
              key={todo.id}
              todoDetails={todo}
              onDeleteTodo={this.onDeleteTodo}
              onToggleEdit={this.onToggleEdit}
              onUpdateTodoTitle={this.onUpdateTodoTitle}
              onToggleCompleted={this.onToggleCompleted}
            />
          ))}
        </ul>
        <Save />
      </div>
    )
  }
}

export default SimpleTodos
