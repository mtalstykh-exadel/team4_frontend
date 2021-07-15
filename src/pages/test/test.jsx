import React, {Component} from "react";
import './test.scss';
import Layout from "../../components/layout/Layout";
import Speaking from "./speaking/speaking";
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
  };

  onListening = () => {
    this.setState({
      onGrammar: false,
      onListening: true,
      onEssay: false,
      onSpeaking: false
    });
  };

  onEssay = () => {
    this.setState({
      onGrammar: false,
      onListening: false,
      onEssay: true,
      onSpeaking: false
    });
  };

  onSpeaking = () => {
    this.setState({
      onGrammar: false,
      onListening: false,
      onEssay: false,
      onSpeaking: true
    });
  };


  render() {
    const {onGrammar, onListening, onEssay, onSpeaking} = this.state;
    let grammar = 'bl';
    let listening = 'bl';
    let essay = 'bl';
    let speaking = 'bl';
    let step = <Grammar />;
    let prev = 'prev';
    let next = 'Next question';
    if (onGrammar) {
      grammar += ' active';
      step = <Grammar />;
      prev += ' invisible';
    }
    if (onListening) {
      listening += ' active';
      step = <Listening />;
    }
    if (onEssay) {
      essay += ' active';
      step = <Essay />;

    }
    if (onSpeaking) {
      speaking += ' active';
      step = <Speaking />;
      next = 'Submit';
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
        <div className='wrapper2'>{ step }</div>
        <div className='wrapper3'>
          <div className='testButtons'>
            <Button className={prev} color='primary' variant='outlined'>Previous question</Button>
            <Button className='next' color='primary' variant='contained'>{next}</Button>
          </div>
          <div className='reportMistake'>Report a mistake</div>
        </div>
      </Layout>
    );
  }
}
