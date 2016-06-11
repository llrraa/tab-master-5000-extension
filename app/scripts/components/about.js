import React from 'react';

import {utilityStore} from './stores/main';

import {Btn, Col, Row} from './bootstrap';

import changelog from 'html!markdown!../../../changelog.md';

var Donate = React.createClass({
  render:function(){
    return (
      <div style={{marginTop: '49px'}}>
        <h4>Why donate?</h4>
        <p>Tab Master 5000 is free of cost and doesn't generate any revenue directly. If you are a happier Chrome user because of this extension, and would like to see more frequent updates, a donation will help me ration more time to this project. As a developer, I have to choose my time wisely, and while I love working on it, it is not always easy to sit down and improve the extension while I have other obligations.</p>
        <p>If you are a developer and would like to contribute time to this project, you can submit pull requests to this project's master branch on Github.</p>
        <p>Submitting bug reports and suggesting new features on Github or the Chrome Web Store is also helpful.</p>
        <p>All donors will be listed on this page after each extension update unless they opt out.</p>
        <p>Thanks for using Tab Master!</p>
        <p>Jason Hicks</p>
        <form  action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="8VL34HHRFN3LS" />
          <Btn className="ntg-top-btn" name="submit" fa="paypal">PayPal</Btn>
        </form>
      </div>
    );
  }
});

var Attribution = React.createClass({
  getInitialState(){
    return {
      dependencies: null
    };
  },
  componentDidMount(){
    var deps = require('json!../../../package.json');
    var state = [];
    for (var key in deps.devDependencies) {
      state.push(`${key} ${deps.devDependencies[key].split('^')[1]}`);
    }
    this.setState({dependencies: state});
  },
  render:function(){
    var s = this.state;
    console.log(this.state);
    if (s.dependencies) {
      var slice2 = Math.ceil(s.dependencies.length / 2);
      var list1 = s.dependencies.slice(0, slice2);
      var list2 = s.dependencies.slice(slice2, s.dependencies.length);
      console.log(list1, list2);
    }
    return (
      <div style={{marginTop: '49px'}}>
        <h3>TM5K was made possible because of the efforts of the following projects.</h3>
        <Col size="6">
          <ul>
            {s.dependencies ? list1.map((dep, i)=>{
              var pkg = dep.split(' ');
              return (
                <li key={i}><a target="_blank" href={`https://www.npmjs.com/package/${pkg[0]}`}>{pkg[0]}</a>  {pkg[1]}</li>
              );
            }) : null}
          </ul>
        </Col>
        <Col size="6">
          <ul>
            {s.dependencies ? list2.map((dep, i)=>{
              var pkg = dep.split(' ');
              return (
                <li key={i}><a target="_blank" href={`https://www.npmjs.com/package/${pkg[0]}`}>{pkg[0]}</a>  {pkg[1]}</li>
              );
            }) : null}
          </ul>
        </Col>
      </div>
    );
  }
});

var ReleaseNotes = React.createClass({
  render:function(){
    function createMarkup() { return {__html: changelog};}
    var p = this.props;
    return (
      <div>
        <img src="../../images/icon-128.png" className="ntg-about"/>
        <div className="ntg-about">
          <h3 className="ntg-about">Tab Master 5000</h3>
        </div>
        <Col size="2" />
        <Col size="8" className="ntg-release">
          <div dangerouslySetInnerHTML={createMarkup()} />
        </Col>
        <Col size="2" className="ntg-cc"/>
      </div>
    );
  }
});

var About = React.createClass({
  getInitialState(){
    return {
      tab: 'release'
    };
  },
  render: function() {
    var p = this.props;
    var s = this.state;
    return (
      <div>
        <Row className="ntg-tabs">
          <div role="tabpanel"> 
            <ul className="nav nav-tabs" style={{borderBottom: 'initial', position: 'absolute', zIndex: '9999'}} >
              <li style={{padding: '0px'}} className={`${s.tab === 'release' ? 'active' : ''}`}>
                  <a style={{padding: '5px 7.5px'}} href="#" onClick={()=>this.setState({tab: 'release'})}><i className="settings-fa fa fa-sticky-note-o"/>  Release Notes</a>
              </li>
              <li style={{padding: '0px'}} className={`${s.tab === 'attribution' ? 'active' : ''}`}>
                  <a style={{padding: '5px 7.5px'}} href="#" onClick={()=>this.setState({tab: 'attribution'})}><i className="settings-fa fa fa-star-o"/>  Attribution</a>
              </li>
              <li style={{padding: '0px'}} className={`${s.tab === 'donate' ? 'active' : ''}`}>
                  <a style={{padding: '5px 7.5px'}} href="#" onClick={()=>this.setState({tab: 'donate'})}><i className="settings-fa fa fa-thumbs-o-up"/>  Donate</a>
              </li>
            </ul>
          </div>
        </Row>
        <Btn onClick={()=>utilityStore.createTab('https://github.com/jaszhix/tab-master-5000-chrome-extension')} style={p.settingsMax ? {top: '95%'} : null} className="ntg-setting-btn" fa="github-square">Github</Btn>
        <Btn onClick={()=>utilityStore.createTab('https://chrome.google.com/webstore/detail/tab-master-5000-tab-swiss/mippmhcfjhliihkkdobllhpdnmmciaim')} style={p.settingsMax ? {top: '95%', marginLeft: '87px'} : {marginLeft: '87px'}} className="ntg-setting-btn" fa="chrome">Chrome Web Store</Btn>
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style={p.settingsMax ? {top: '95%', borderWidth:0} : {borderWidth:0}} src="https://i.creativecommons.org/l/by/4.0/88x31.png" className="ntg-cc" /></a>
        <Col size="12" className="about">
          {s.tab === 'release' ? <ReleaseNotes settingsMax={p.settingsMax}/> : null}
          {s.tab === 'attribution' ? <Attribution /> : null}
          {s.tab === 'donate' ? <Donate /> : null}
        </Col>
      </div>
    );
  }
});

export default About;