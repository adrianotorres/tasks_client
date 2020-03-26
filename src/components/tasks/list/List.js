import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class List extends Component {
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
                      <button className="delete">
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