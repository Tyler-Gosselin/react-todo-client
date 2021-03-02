import React, { Component } from "react";
import axios from "axios";
import TodoItem from "./components/TodoItem";
import { API_URL } from "./api/api";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      todos: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${API_URL}/add-todo`,
      data: {
        title: this.state.title,
        done: false,
      },
    })
      .then((res) => {
        this.setState({
          todos: [res.data, ...this.state.todos],
          title: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: `${API_URL}/delete-todo/${id}`,
    })
      .then((res) => {
        this.setState({
          todos: this.state.todos.filter((todo) => {
            return todo.id !== id;
          }),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderTodos = () => {
    return this.state.todos.map((todo) => {
      return (
        <TodoItem key={todo.id} todo={todo} handleDelete={this.handleDelete} />
      );
    });
  };

  componentDidMount() {
    console.log(API_URL);
    axios({
      method: "GET",
      url: `${API_URL}/get-all-todos`,
    })
      .then((res) => {
        this.setState({
          todos: res.data,
          title: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="app">
        <h1>Todo List</h1>
        <form className="add-todo" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Add Todo"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}
