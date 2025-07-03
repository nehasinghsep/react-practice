import React, { Component } from 'react';
//import TableRow from './TableRow';

class UserList extends Component {
  constructor(props) {
      super(props);
    }
      
      tabRow(){
        if(this.props.data instanceof Array){
          return this.props.data.map(function(object, i){
              //\return <TableRow obj={object} key={i} />;
              return (<tr>
              <td>
                {object.id}
              </td>
              <td>
                {object.name}
              </td>
            </tr>)
          })
        }
      }
      render() {
        return (
            <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Name</td>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
              </tbody>
            </table>
        </div>
        );
      }
}
export default UserList;