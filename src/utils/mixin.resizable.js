import ReactDOM from 'react-dom';

export default {
  getInitialState() {
    return {
      width: 0,
      height: 0,
    };
  },

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  componentWillReceiveProps() {
    this.handleResize();
  },

  handleResize() {
    const dom = ReactDOM.findDOMNode(this);

    if (
      (this.state.width !== dom.offsetWidth) ||
      (this.state.height !== dom.offsetHeight)
    ) {
      this.setState({
        width: dom.offsetWidth,
        height: dom.offsetHeight,
      });
    }
  },
};
