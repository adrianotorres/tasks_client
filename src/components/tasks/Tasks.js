import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import List from './list/List';
import CreateTask from './create_tasks/CreateTasks';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.loadTasks = this.loadTasks.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  async loadTasks() {
    let response = await fetch(`http://localhost:3001/tasks`);
    const tasks = await response.json();
    this.setState({ tasks: tasks });
  }

  async removeAll() {
    if (window.confirm('Are you sure you want to delete all done tasks ?')) {
      const promises = this.state.tasks.filter(task => task.done).map(async task =>
        await fetch(`http://localhost:3001/tasks/${task.id}`, {method: 'DELETE'})
      );
      await Promise.all(promises)
      this.loadTasks();
    }
  }

  componentDidMount() {
    this.loadTasks();
  }

  render() {
    return (
      <Row>
        <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
          <p className="title">To-do</p>
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter(task => !task.done)}/>
          <CreateTask loadTasks={this.loadTasks}/>
        </Col>
        <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
          <p className="title">Done</p>
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter(task => task.done)}/>
          <Button variant="red" className="float-right remove_tasks_btn" onClick={() => this.removeAll()}>
            <FontAwesomeIcon icon="trash-alt"/> Remove all done tasks
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Tasks;