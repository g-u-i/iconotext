import React from 'react';
import PropTypes from 'baobab-react/prop-types';

export default React.createClass({
  displayName: 'iconotexte/Tooltip',

  /**
   * LIFECYCLE:
   * **********
   */
  contextTypes: {
    tree: PropTypes.baobab,
  },
  getEmptyMessage() {
    return {
      top: null,
      left: null,
      target: null,
      message: null,
    };
  },
  getInitialState() {
    return this.getEmptyMessage();
  },
  componentDidMount() {
    document.body.addEventListener('click', this.checkMessage);
    document.body.addEventListener('mousemove', this.checkMessage);
    document.body.addEventListener('mouseleave', this.clearMessage);
  },
  componentWillUnmount() {
    document.body.removeEventListener('click', this.checkMessage);
    document.body.removeEventListener('mousemove', this.checkMessage);
    document.body.removeEventListener('mouseleave', this.clearMessage);
  },

  /**
   * HANDLERS:
   * *********
   */
  clearMessage() {
    this.setState(this.getEmptyMessage());
  },
  checkMessage(e) {
    if (e.target === this.state.target) return;

    const newState = { target: e.target };
    const dom = this.refs.tooltip;
    let steps = 0;

    // Find a parent with a valid message:
    let node = e.target;
    while (
      node
      && node !== document
      && (steps++) < 2
    ) {
      // If hovering a valid target, update full state:
      if (node.getAttribute('data-tooltip')) {
        const nodeBox = node.getBoundingClientRect();
        const contBox = dom.parentNode.getBoundingClientRect();

        newState.top = nodeBox.top + nodeBox.height / 2 - contBox.top;
        newState.left = nodeBox.left + nodeBox.width - contBox.left;
        newState.message = node.getAttribute('data-tooltip');
      }

      if (Object.keys(newState).length > 2) {
        this.setState(newState);
        return;
      }

      node = node.parentNode;
    }

    this.clearMessage();
  },

  /**
   * RENDER:
   * *******
   */
  render() {
    const { message, top, left } = this.state;

    return (
      <div
        ref="tooltip"
        data-component="tooltip"
        style={
          message ?
            {
              top,
              left,
            } :
            {
              opacity: 0,
            }
        }
      >
        <span className="tooltip-message">{
          message || ''
        }</span>
      </div>
    );
  },
});
