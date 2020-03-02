import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { NewTodo } from './components/NewTodo/NewTodo';
import { todosFromServer } from './components/api/todosFromServer';

class App extends React.Component {
  state = {
    todos: [...todosFromServer],
    filterProp: 'all',
  }

  addTask = (newTask) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, newTask],
    }));
  }

  toggleCompleted = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (todo.id === id ? {
        ...todo, completed: !todo.completed,
      } : todo)),
    }));
  }

  deletetask = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  filter = (todos, filterProp) => {
    switch (filterProp) {
      case 'all':
        return todos;

      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }

  setFilterProp = (filterProp) => {
    this.setState({
      filterProp,
    });
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  toggleAllCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo, completed: !todo.completed,
      })),
    }));
  }

  render() {
    const { todos, filterProp } = this.state;
    const visibleTodos = this.filter(todos, filterProp);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <NewTodo addTask={this.addTask} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.toggleAllCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={visibleTodos}
            deletetask={this.deletetask}
            toggleCompleted={this.toggleCompleted}
          />
        </section>

        <Footer
          todos={this.state.todos}
          setFilterProp={this.setFilterProp}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
