import React, { Component, createContext } from "react";
import sampleItems from './sampleItems';

// Helper functions

function move(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
}

function moveElement(array, index, offset) {
  const newIndex = index + offset;

  return move(array, index, newIndex);
}

// Context

const dragItems = sampleItems.concat();

const GridContext = createContext({ items: [], saveItems: [] });

export class GridProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: dragItems,
      saveItems: sampleItems,
      moveItem: this.moveItem,
      setItems: this.setItems,
      remove: this.remove,
      saveMoveItem: this.saveMoveItem
    };
  }

  render() {
    return (
      <GridContext.Provider value={this.state}>
        {this.props.children}
      </GridContext.Provider>
    );
  }

  setItems = items => this.setState({ items });

  moveItem = (sourceId, destinationId) => {
    const sourceIndex = this.state.items.findIndex(
      item => item.id === sourceId
    );
    const destinationIndex = this.state.items.findIndex(
      item => item.id === destinationId
    );

    // If source/destination is unknown, do nothing.
    if (sourceId === -1 || destinationId === -1) {
      return;
    }

    const offset = destinationIndex - sourceIndex;

    this.setState(state => ({
      ...this.state,
      items: moveElement(state.items, sourceIndex, offset)
    }));
  };

  remove = (index) => {
    this.state.items.splice(index, 1);
    this.setState(state => ({
      ...this.state,
      items: state.items
    }));
  }

  saveMoveItem = () => {
    this.setState(state => ({
      saveItems: state.items.concat()
    }));
  }
}

export default GridContext;
