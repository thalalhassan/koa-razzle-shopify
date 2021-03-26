/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import Styles from './dragndrop.module.scss';
import Dragicon from '../../assets/icons/dragicon';
import Closeicon from '../../assets/icons/closeicon';

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: '7px',
  margin: '0 0 8px 0',
  border: '1px solid rgba(0, 0, 0, 0.08)',
  borderRadius: '3px',
  // change background colour if dragging
  background: isDragging ? '#5063FF' : 'white',
  color: isDragging ? '#fff' : '#212B36',
  // styles we need to apply on draggables
  ...draggableStyle,
});

// const getItemcontentStyle = (isDragging, draggableStyle)
const getItemcontentStyle = (isDragging) => ({
  // some basic styles to make the items look a bit nicer
  color: isDragging ? '#fff' : '#212B36',
});

// const getListStyle = (isDraggingOver)
const getListStyle = () => ({
  padding: '25px',
  width: '100%',
});

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

function DragAndDrop({ data, handleOnRemoveItem, handleOnReorderItem }) {
  const [items, setitems] = useState(data);

  useEffect(() => {
    setitems(data);
  }, [data]);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const orderedItems = reorder(
      items,
      result.source.index,
      result.destination.index,
    );
    handleOnReorderItem(orderedItems);
    setitems(orderedItems);
  };

  const handleOnCloseIcon = (name, parentTable) => {
    const filteredItems = items.filter((item) => {
      if (item.parentTable === parentTable && item.name === name) {
        return false;
      }
      return true;
    });
    handleOnRemoveItem(filteredItems, name);
    setitems(filteredItems);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}>
              {items.map((item, index) => (
                <Draggable
                  key={`${item.name}_${item.parentTable}`}
                  draggableId={`${item.name}_${item.parentTable}`}
                  index={index}>
                  {(
                    { innerRef, dragHandleProps, draggableProps },
                    { isDragging },
                  ) => (
                    <div
                      ref={innerRef}
                      {...draggableProps}
                      {...dragHandleProps}
                      style={getItemStyle(isDragging, draggableProps.style)}>
                      <div className={Styles.dragcontent}>
                        <i className={Styles.icon}>
                          <Dragicon color={isDragging ? 'white' : 'black'} />
                        </i>
                        <span
                          className={Styles.label}
                          style={getItemcontentStyle(isDragging)}>
                          {item.label || item.name}
                        </span>
                        <span
                          className={Styles.parentname}
                          style={getItemcontentStyle(isDragging)}>
                          {item.parentTable}
                        </span>
                        <span
                          className={Styles.value}
                          style={getItemcontentStyle(isDragging)}>
                          {item.value || item.order}
                        </span>
                        <span
                          className={Styles.close}
                          onClick={() => handleOnCloseIcon(item.name, item.parentTable)}>
                          <Closeicon color="grey" />
                        </span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* {JSON.stringify(items)} */}
    </>
  );
}

export default DragAndDrop;

DragAndDrop.propTypes = {
  data: PropTypes.array,
  handleOnRemoveItem: PropTypes.func,
  handleOnReorderItem: PropTypes.func,
};

DragAndDrop.defaultProps = {
  data: [],
  handleOnRemoveItem: () => {},
  handleOnReorderItem: () => {},
};
