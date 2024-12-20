import React from 'react';
import Card from './Card';
import './Swimlane.css';

export default class Swimlane extends React.Component {
  render() {
    return (
        <div className="Swimlane-column Swimlane-{this.props.name.toLowerCase()}">
        <div className="Swimlane-title">{this.props.name}</div>
        <div className="Swimlane-dragColumn" ref={this.props.dragulaRef}>
          {this.props.clients.map(client => (
            <Card
              key={client.id}
              id={client.id}
              name={client.name}
              description={client.description}
              status={client.status}
            />
          ))}
        </div>
      </div>
    );
  }
}
