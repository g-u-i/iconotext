import React from 'react';

const INLINE_STYLES = [
  { style: 'BOLD' },
  { style: 'ITALIC' },
];

export default React.createClass({
  displayName: 'iconotexte/Editor.InlineToolbar',

  toggleInlineStyle(e) {
    e.preventDefault();
    this.props.onToggle(e.currentTarget.getAttribute('data-style'));
  },

  render() {
    const { editorState, position } = this.props;
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    return (
      <div
        data-component="inline-toolbar"
        style={ position }
      >
        <ul className="toolbar-icons">{
          INLINE_STYLES.map(({ style }) => (
            <li
              key={ style }
              data-style={ style }
              data-active={ currentInlineStyle.has(style) || undefined }
              onMouseDown={ this.toggleInlineStyle }
            />
          ))
        }</ul>
      </div>
    );
  },
});
