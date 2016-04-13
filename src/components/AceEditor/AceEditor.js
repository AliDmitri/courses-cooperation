/* @global ace */

import React, { PropTypes } from 'react';
import './AceEditor.scss';

export class AceEditor extends React.Component {
  componentWillMount() {
    // TODO: сделать загрузку Ace Editor
  }

  componentDidMount() {
    this.editor = ace.edit(this._editorNode);

    if (this.props.onBeforeLoad) {
      this.props.onBeforeLoad(Ace);
    }

    var editorProps = Object.keys(this.props.editorProps);
    for (var i = 0; i < editorProps.length; i++) {
      this.editor[editorProps[i]] = this.props.editorProps[editorProps[i]];
    }

    this.editor.getSession().setMode('ace/mode/' + this.props.mode);
    this.editor.setTheme('ace/theme/' + this.props.theme);
    this.editor.setFontSize(this.props.fontSize);
    this.editor.setValue(this.props.value, this.props.cursorStart);
    this.editor.renderer.setShowGutter(this.props.showGutter);
    this.editor.getSession().setUseWrapMode(this.props.wrapEnabled);
    this.editor.setOption('maxLines', this.props.maxLines);
    this.editor.setOption('readOnly', this.props.readOnly);
    this.editor.setOption('highlightActiveLine', this.props.highlightActiveLine);
    this.editor.setOption('tabSize', this.props.tabSize);
    this.editor.setShowPrintMargin(this.props.showPrintMargin);

    // Handlers
    this.editor.on('focus', this.onFocus.bind(this));
    this.editor.on('blur', this.onBlur.bind(this));
    this.editor.on('copy', this.onCopy.bind(this));
    this.editor.on('paste', this.onPaste.bind(this));
    this.editor.on('change', this.onChange.bind(this));

    if (this.props.keyboardHandler) {
      this.editor.setKeyboardHandler('ace/keyboard/' + this.props.keyboardHandler);
    }

    if (this.props.onLoad) {
      this.props.onLoad(this.editor);
    }
  }

  componentWillUnmount() {
    this.editor = null;
  }

  /**
   * Update props
   *
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps: ', nextProps);

    let editor = this.editor;
    let props = this.props;

    if (nextProps.mode !== props.mode) {
      editor.getSession().setMode('ace/mode/' + nextProps.mode);
    }
    if (nextProps.theme !== props.theme) {
      editor.setTheme('ace/theme/' + nextProps.theme);
    }
    if (nextProps.fontSize !== props.fontSize) {
      editor.setFontSize(nextProps.fontSize);
    }
    if (nextProps.maxLines !== props.maxLines) {
      editor.setOption('maxLines', nextProps.maxLines);
    }
    if (nextProps.readOnly !== props.readOnly) {
      editor.setOption('readOnly', nextProps.readOnly);
    }
    if (nextProps.highlightActiveLine !== props.highlightActiveLine) {
      editor.setOption('highlightActiveLine', nextProps.highlightActiveLine);
    }
    if (nextProps.tabSize !== props.tabSize) {
      editor.setOption('tabSize', nextProps.tabSize);
    }
    if (nextProps.showPrintMargin !== props.showPrintMargin) {
      editor.setShowPrintMargin(nextProps.showPrintMargin);
    }
    if (nextProps.showGutter !== props.showGutter) {
      editor.renderer.setShowGutter(nextProps.showGutter);
    }

    if (editor.getValue() !== nextProps.value) {
      // editor.setValue is a synchronous function call, change event is emitted before setValue return.
      this.silent = true;
      editor.setValue(nextProps.value, nextProps.cursorStart);
      this.silent = false;
    }
  }

  onChange() {
    if (this.props.onChange && !this.silent) {
      var value = this.editor.getValue();
      this.props.onChange(value);
    }
  }

  onFocus() {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onBlur() {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  /**
   *
   * @param {String} text
   */
  onCopy(text) {
    if (this.props.onCopy) {
      this.props.onCopy(text);
    }
  }

  /**
   *
   * @param {String} text
   */
  onPaste(text) {
    if (this.props.onPaste) {
      this.props.onPaste(text);
    }
  }

  render() {
    let divStyle = {
      width: this.props.width,
      height: this.props.height
    };

    return (
      <div
        ref={(node) => this._editorNode = node}
        className={this.props.className}
        style={divStyle}
      ></div>
    )
  }


  static get propTypes() {
    return {
      value: PropTypes.string,
      className: PropTypes.string,
      mode: PropTypes.string,
      theme: PropTypes.string,
      height: PropTypes.string,
      width: PropTypes.string,
      fontSize: PropTypes.number,
      showGutter: PropTypes.bool,
      maxLines: PropTypes.number,
      readOnly: PropTypes.bool,
      highlightActiveLine: PropTypes.bool,
      tabSize: PropTypes.number,
      showPrintMargin: PropTypes.bool,
      cursorStart: PropTypes.number,
      editorProps: PropTypes.object,
      keyboardHandler: PropTypes.string,
      wrapEnabled: PropTypes.bool,

      // Handlers
      onChange: PropTypes.func,
      onCopy: PropTypes.func,
      onPaste: PropTypes.func,
      onFocus: PropTypes.func,
      onBlur: PropTypes.func,
      onLoad: PropTypes.func,
      onBeforeLoad: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      className: 'ace-editor',
      mode: '',
      theme: 'chrome',
      height: '350px',
      width: '570px',
      value: 'https://github.com/ajaxorg/ace',
      fontSize: 14,
      showGutter: true,
      maxLines: null,
      readOnly: false,
      highlightActiveLine: false,
      showPrintMargin: false,
      tabSize: 4,
      cursorStart: 1,
      editorProps: {},
      wrapEnabled: true,

      // Handlers
      onChange: null,
      onPaste: null,
      onLoad: null
    };
  }
}

export default AceEditor

