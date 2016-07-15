/**
 * The following utils are shamelessly "inspired" from:
 * https://github.com/andrewcoelho/react-text-editor
 */
export default {
  getSelectionRange() {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    return selection.getRangeAt(0);
  },

  getSelectedBlockElement(range) {
    let node = range.startContainer;
    do {
      const nodeIsDataBlock =
        node.getAttribute ?
          node.getAttribute('data-block') :
          null;
      if (nodeIsDataBlock) return node;
      node = node.parentNode;
    } while (node !== null);
    return null;
  },

  getSelectionCoords(selectionRange, editor) {
    const editorBounds = editor.getBoundingClientRect();
    const rangeBounds = selectionRange.getBoundingClientRect();
    const rangeWidth = rangeBounds.right - rangeBounds.left;

    const offsetLeft = rangeBounds.left - editorBounds.left + rangeWidth;
    const offsetTop = rangeBounds.top - editorBounds.top - 18;

    return { offsetLeft, offsetTop };
  },
};
