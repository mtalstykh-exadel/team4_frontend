import React, {Component} from "react";
import './test.scss';
import Layout from "../../components/layout/Layout";
import Speaking from "./speaking/speaking";
import * as ReactDOM from "react-dom";
import Essay from "./essay/essay";
import Grammar from "./grammar/grammar";
import Listening from "./listening/listening";
import Button from '@material-ui/core/Button';

export default class Test extends Component {
  state = {
    onGrammar: true,
    onListening: false,
    onEssay: false,
    onSpeaking: false
  };

  onGrammar = () => {
    this.setState({
      onGrammar: true,
      onListening: false,
      onEssay: false,
      onSpeaking: false
    });
    ReactDOM.render(
      <Grammar/>,
      document.getElementsByClassName('wrapper2')[0]
    );
  };

  onListening = () => {
    this.setState({
      onGrammar: false,
      onListening: true,
      onEssay: false,
      onSpeaking: false
    });
    ReactDOM.render(
      <Listening/>,
      document.getElementsByClassName('wrapper2')[0]
    );
  };

  onEssay = () => {
    this.setState({
      onGrammar: false,
      onListening: false,
      onEssay: true,
      onSpeaking: false
    });
    ReactDOM.render(
      <Essay/>,
      document.getElementsByClassName('wrapper2')[0]
    );
  };

  onSpeaking = () => {
    this.setState({
      onGrammar: false,
      onListening: false,
      onEssay: false,
      onSpeaking: true
    });
    ReactDOM.render(
      <Speaking/>,
      document.getElementsByClassName('wrapper2')[0]
    );
  };


  render() {
    const {onGrammar, onListening, onEssay, onSpeaking} = this.state;
    let grammar = 'bl';
    let listening = 'bl';
    let essay = 'bl';
    let speaking = 'bl';
    if (onGrammar) {
      grammar += ' active';
    }
    if (onListening) {
      listening += ' active';
    }
    if (onEssay) {
      essay += ' active';
    }
    if (onSpeaking) {
      speaking += ' active';
    }
    return (
      <Layout>
        <div className='wrapper1'>
          <div className={grammar} onClick={this.onGrammar}>Grammar</div>
          <div className={listening} onClick={this.onListening}>Listening</div>
          <div className={essay} onClick={this.onEssay}>Essay</div>
          <div className={speaking} onClick={this.onSpeaking}>Speaking</div>
          <div className='bl time'>Time</div>
        </div>
        <div className='wrapper2'><Grammar/></div>
        <div className='wrapper3'>
          <div className='testButtons'>
            <Button className="prev" color='primary' variant='outlined'>Previous question</Button>
            <Button className="next" color='primary' variant='contained'>Next question</Button>
          </div>
          <div className='reportMistake'>Report a mistake</div>
        </div>
      </Layout>
    );
  }
}
