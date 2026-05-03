import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

import TodoItem from './TodoItem';
import { selectTodo } from '../redux/selectors';
import { fetchTodos, updateTodoOrder } from '../redux/operations';

const PAGE_SIZE = 10;

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodo);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const observerRef = useRef(null);

  const loadingTriggerRef = useCallback(
    node => {
      if (observerRef.current) observerRef.current.disconnect();

      if (!node) return;

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev =>
            prev < todos.length ? prev + PAGE_SIZE : prev,
          );
        }
      });

      observerRef.current.observe(node);
    },
    [todos.length],
  );

  useEffect(() => {
    toast.promise(dispatch(fetchTodos()), {
      pending: 'TODO List is pending',
      error: 'TODO List rejected',
    });
  }, [dispatch]);

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    dispatch(
      updateTodoOrder({
        sourceIndex: source.index,
        destinationIndex: destination.index,
        taskId: draggableId,
      }),
    );
  };

  const visibleTodos = todos.slice(0, visibleCount);

  return (
    <ul className="tasks">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div
              className="tasks-div"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {visibleTodos.map((todo, index) => (
                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                  {provided => <TodoItem todo={todo} provided={provided} />}
                </Draggable>
              ))}
              {provided.placeholder}

              {visibleCount < todos.length && (
                <div
                  ref={loadingTriggerRef}
                  style={{
                    height: '20px',
                    width: '100%',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ul>
  );
};

export default TodoList;
