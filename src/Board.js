import React from 'react';
import Dragula from 'dragula';
import 'dragula/dist/dragula.css';
import Swimlane from './Swimlane';
import './Board.css';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: this.getClients()
    };
    this.swimlanes = {
      backlog: React.createRef(),
      inProgress: React.createRef(),
      complete: React.createRef()
    };
  }

  componentDidMount() {
    this.initializeDragula();
  }

  getClients() {
    return [
      ['1','Stark, White and Abbott','Cloned Optimal Architecture', 'in-progress'],
      ['2','Wiza LLC','Exclusive Bandwidth-Monitored Implementation', 'complete'],
      ['3','Nolan LLC','Vision-Oriented 4Thgeneration Graphicaluserinterface', 'backlog'],
      ['4','Thompson PLC','Streamlined Regional Knowledgeuser', 'in-progress'],
      ['5','Walker-Williamson','Team-Oriented 6Thgeneration Matrix', 'in-progress'],
      ['6','Boehm and Sons','Automated Systematic Paradigm', 'backlog'],
      ['7','Runolfsson, Hegmann and Block','Integrated Transitional Strategy', 'backlog'],
      ['8','Schumm-Labadie','Operative Heuristic Challenge', 'backlog'],
      ['9','Kohler Group','Re-Contextualized Multi-Tasking Attitude', 'backlog'],
      ['10','Romaguera Inc','Managed Foreground Toolset', 'backlog'],
      ['11','Reilly-King','Future-Proofed Interactive Toolset', 'complete'],
      ['12','Emard, Champlin and Runolfsdottir','Devolved Needs-Based Capability', 'backlog'],
      ['13','Fritsch, Cronin and Wolff','Open-Source 3Rdgeneration Website', 'complete'],
      ['14','Borer LLC','Profit-Focused Incremental Orchestration', 'backlog'],
      ['15','Emmerich-Ankunding','User-Centric Stable Extranet', 'in-progress'],
      ['16','Willms-Abbott','Progressive Bandwidth-Monitored Access', 'in-progress'],
      ['17','Brekke PLC','Intuitive User-Facing Customerloyalty', 'complete'],
      ['18','Bins, Toy and Klocko','Integrated Assymetric Software', 'backlog'],
      ['19','Hodkiewicz-Hayes','Programmable Systematic Securedline', 'backlog'],
      ['20','Murphy, Lang and Ferry','Organized Explicit Access', 'backlog'],
    ].map(companyDetails => ({
      id: companyDetails[0],
      name: companyDetails[1],
      description: companyDetails[2],
      status: companyDetails[3],
    }));
  }

  initializeDragula() {
// eslint-disable-next-line no-unused-vars
const drake = Dragula([
    this.swimlanes.backlog.current,
    this.swimlanes.inProgress.current,
    this.swimlanes.complete.current
  ], {
      moves: (el, source, handle, sibling) => {
        return true; // Allow dragging of all elements
      },
      accepts: (el, target, source, sibling) => {
        return true; // Allow dropping in all swimlanes
      },
      drop: (el, target, source, sibling) => {
        this.handleCardDrop(el, target);
      }
    });
  }

  handleCardDrop(card, targetSwimlane) {
    const { clients } = this.state;
    const cardId = card.dataset.id;
    const cardStatus = targetSwimlane.className.includes('Swimlane-backlog')
      ? 'backlog'
      : targetSwimlane.className.includes('Swimlane-inProgress')
        ? 'in-progress'
        : 'complete';

    const updatedClients = clients.map(client => {
      if (client.id === cardId) {
        return { ...client, status: cardStatus };
      }
      return client;
    });

    this.setState({ clients: updatedClients });
  }

  renderSwimlane(name, clients, ref) {
    return (
      <Swimlane name={name} clients={clients} dragulaRef={ref} />
    );
  }

  render() {
    const { clients } = this.state;
    return (
      <div className="Board">
        <div className="container-fluid">
          <div className="row">
          <div className="col-md-4">
  {this.renderSwimlane('Backlog', this.state.clients, this.swimlanes.backlog)}
</div>
            <div className="col-md-4">
              {this.renderSwimlane('In Progress', clients.filter(client => client.status && client.status === 'in-progress'), this.swimlanes.inProgress)}
            </div>
            <div className="col-md-4">
              {this.renderSwimlane('Complete', clients.filter(client => client.status && client.status === 'complete'), this.swimlanes.complete)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
