import React from 'react';
import Reflux from 'reflux';
import {themeStore} from './stores/main';

export var Btn = React.createClass({
  mixins: [Reflux.ListenerMixin],
  getInitialState(){
    return {
      theme: null
    };
  },
  componentDidMount(){
    this.listenTo(themeStore, this.themeChange);
    var selectedTheme = themeStore.getSelectedTheme();
    this.setState({theme: selectedTheme});
    this.themeChange(selectedTheme);
  },
  themeChange(e){
    if (typeof e.darkBtnBg !== 'undefined') {
      var p = this.props;
      if (p.className === 'ntg-btn' || p.className === 'ntg-top-btn') {
        this.refs.btn.style.backgroundColor = e.darkBtnBg;
        this.refs.btn.style.color = e.darkBtnText;
        this.refs.btn.style.textShadow = `1px 1px ${e.darkBtnTextShadow}`;
      } else {
        this.refs.btn.style.backgroundColor = e.lightBtnBg;
        this.refs.btn.style.color = e.lightBtnText;
        this.refs.btn.style.textShadow = `2px 2px ${e.lightBtnTextShadow}`;
      }
      this.refs.btn.style.boxShadow = `${e.tileShadow} 1px 1px 5px -1px`;
      this.setState({theme: e});
    }
  },
  hoverIn(e){
    var p = this.props;
    var s = this.state;
    if (p.className === 'ntg-btn' || p.className === 'ntg-top-btn') {
      this.refs.btn.style.backgroundColor = s.theme.darkBtnBgHover;
    } else {
      this.refs.btn.style.backgroundColor = s.theme.lightBtnBgHover;
    }
  },
  hoverOut(e){
    var p = this.props;
    var s = this.state;
    if (p.className === 'ntg-btn' || p.className === 'ntg-top-btn') {
      this.refs.btn.style.backgroundColor = s.theme.darkBtnBg;
    } else {
      this.refs.btn.style.backgroundColor = s.theme.lightBtnBg;
    }
  },
  render: function() {
    var p = this.props;
    return (
      <button ref="btn" onMouseEnter={this.hoverIn} onMouseLeave={this.hoverOut} onClick={p.onClick} style={p.style} id={p.id} className={p.className}>
        <div className="btn-label">{p.fa ? <i className={'fa fa-'+p.fa}></i> : null}{p.fa ? ' ' : null}{p.children}</div>
      </button>
    );
  }
});

export var Col = React.createClass({
  propTypes: {
    size: React.PropTypes.string.isRequired
  },
  render: function() {
    var p = this.props;
    return (
      <div onContextMenu={p.onContextMenu} onDragEnter={p.onDragEnter} onMouseEnter={p.onMouseEnter} onMouseLeave={p.onMouseLeave} onClick={p.onClick} style={p.style} id={p.id} className={p.className ? 'col-xs-'+p.size+' '+p.className : 'col-xs-'+p.size}>{p.children}</div>
    );
  }
});

export var Row = React.createClass({
  getDefaultProps(){
    return {
      fluid: false,
    };
  },
  propTypes: {
    fluid: React.PropTypes.bool,
  },
  render: function() {
    var p = this.props;
    return (
      <div onContextMenu={p.onContextMenu} onDragEnter={p.onDragEnter} onMouseEnter={p.onMouseEnter} onMouseLeave={p.onMouseLeave} onClick={p.onClick} style={p.style} id={p.id} className={p.fluid ? p.className ? 'row-fluid '+p.className : 'row-fluid' : p.className ? 'row '+p.className : 'row'}>{p.children}</div>
    );
  }
});

export var Container = React.createClass({
  getDefaultProps(){
    return {
      fluid: false
    };
  },
  propTypes: {
    fluid: React.PropTypes.bool
  },
  render: function() {
    var p = this.props;
    return (
      <div onContextMenu={p.onContextMenu} onDragEnter={p.onDragEnter} onMouseEnter={p.onMouseEnter} onMouseLeave={p.onMouseLeave} onClick={p.onClick} style={p.style} id={p.id} className={p.fluid ? p.className ? 'container-fluid '+p.className : 'container-fluid' : p.className ? 'container '+p.className : 'container'}>{p.children}</div>
    );
  }
});