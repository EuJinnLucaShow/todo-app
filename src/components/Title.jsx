import React from 'react';
import logo from '../images/todo-list.svg';

const Title = () => {
  return (
    <div className="wrapperTitle">
      <img src={logo} alt="todo-list images" width="30px" />
      <h1 className="todo-title">TODO List</h1>
    </div>
  );
};

export default Title;
