import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';

import TodoItem from './TodoItem';
import { selectTodo } from '../redux/selectors';
import { fetchTodos, updateTodoOrder } from '../redux/operations';

const PAGE_SIZE = 5;

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodo);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const observerRef = useRef(null);

  const loadingTriggerRef = useCallback(
    node => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && visibleCount < todos.length) {
          setVisibleCount(prev => prev + PAGE_SIZE);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [visibleCount, todos.length],
  );

  useEffect(() => {
    toast.promise(dispatch(fetchTodos()), {
      pending: 'TODO List is pending',
      success: 'TODO List resolved 👌',
      error: 'TODO List rejected 🤯',
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
                {visibleTodos.map((todo, index) => (
                  <Draggable
                    key={todo._id}
                    draggableId={todo._id}
                    index={index}
                  >
                    {provided => <TodoItem todo={todo} provided={provided} />}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ul>

      {visibleCount < todos.length && (
        <div ref={loadingTriggerRef} style={{ height: '20px' }} />
      )}
    </>
  );
};

export default TodoList;
