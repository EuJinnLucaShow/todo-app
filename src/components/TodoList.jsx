import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TodoItem from './TodoItem';
import { selectTodo } from 'redux/selectors';
import { fetchTodos } from 'redux/operations';
import Pagination from '../utils/Pagination';
import { toast } from 'react-toastify';

const PAGE_SIZE = 5;

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodo);
  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const reversed = [...todos].reverse();
    const paginatedTodos = reversed.slice(
      currentPage * PAGE_SIZE,
      (currentPage + 1) * PAGE_SIZE,
    );
    setItems(paginatedTodos);
  }, [currentPage, todos]);

  useEffect(() => {
    toast.promise(dispatch(fetchTodos()), {
      pending: 'TODO List is pending',
      success: 'TODO List resolved 👌',
      error: 'TODO List rejected 🤯',
    });
  }, [dispatch]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const onDragEnd = result => {
    if (!result.destination) return;

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);

    setItems(items);

    // const updatedTodoIds = items.map(item => item._id);

    // const updatedTodos = [...todos].sort(
    //   (a, b) => updatedTodoIds.indexOf(a._id) - updatedTodoIds.indexOf(b._id),
    // );

    // const reversed = [...updatedTodos].reverse();
    // dispatch(sendTodos(reversed));
  };

  return (
    <>
      <ul className="tasks">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div
                className="tasks-div"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.map((todo, index) => (
                  <Draggable
                    key={todo._id}
                    draggableId={todo._id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <TodoItem
                        key={todo._id}
                        todo={todo}
                        provided={provided}
                        snapshot={snapshot}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ul>
      {todos.length > PAGE_SIZE && (
        <Pagination
          pageCount={Math.ceil(todos.length / PAGE_SIZE)}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          todosLength={todos.length}
          PAGE_SIZE={PAGE_SIZE}
        />
      )}
    </>
  );
};

export default TodoList;
