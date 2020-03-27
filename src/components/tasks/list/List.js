import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class List extends Component {
  async deleteTask(task) {
    if (window.confirm(`Are you sure you want to delete: "${task.title}"`)) {
      await fetch(`http://localhost:3001/tasks/${task.id}`, {method: 'DELETE'});
      this.props.loadTasks();
    }
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Body>
            <Table responsive>
              <tbody>
                {this.props.tasks.map((task, _) => {
                  return <tr key={task.id}>
                    <td className="col-md-10">{task.title}</td>
                    <td>
                      {
                        task.done === false
                        ? <button className="check">
                            <FontAwesomeIcon icon="check-circle"/>
                          </button>
                        : null
                      }
                    </td>
                    <td>
                      <button className="delete" onClick={() => this.deleteTask(task)}>
                        <FontAwesomeIcon icon="trash-alt"/>
                      </button>
                    </td>
                  </tr>;
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default List;