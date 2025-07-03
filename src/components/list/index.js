import React, { Component } from 'react';
import StockList from './stock-list';
import UserList from './user-list';
import Hoc from './HOC';

const StocksData = [
    { id: 1, name: 'TCS' },
    { id: 2, name: 'Infosys' },
    { id: 3, name: 'Reliance' }
  ];
  const UsersData = [
    { id: 1, name: 'Krunal' },
    { id: 2, name: 'Ankit' },
    { id: 3, name: 'Rushabh' }
  ];
  
  const Stocks = Hoc(
    StockList,
    StocksData
  );
  
  const Users = Hoc(
    UserList,
    UsersData
  );
  

class List extends Component {
  
  render() {
    return (
      <div>
        <Stocks></Stocks>
        <Users></Users>
      </div>
    )
  }
}

export default List;