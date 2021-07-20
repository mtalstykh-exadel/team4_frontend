import React, {Component} from "react";
import './Test.scss';
import Layout from "../../components/layout/Layout";
import Speaking from "./Speaking/Speaking";
import Essay from "./Essay/Essay";
import Grammar from "./Grammar/Grammar";
import Listening from "./Listening/Listening";
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

  nextStep = () => {
    if (this.state.onGrammar === true) {
      this.setState({
        onGrammar: false,
        onListening: true,
        onEssay: false,
        onSpeaking: false
      });
    }
    if (this.state.onListening === true) {
      this.setState({
        onGrammar: false,
        onListening: false,
        onEssay: true,
        onSpeaking: false
      });
    }
    if (this.state.onEssay === true) {
      this.setState({
        onGrammar: false,
        onListening: false,
        onEssay: false,
        onSpeaking: true
      });
    }
  }

  previousStep = () => {
    if (this.state.onListening === true) {
      this.setState({
        onGrammar: true,
        onListening: false,
        onEssay: false,
        onSpeaking: false
      });
    }
    if (this.state.onEssay === true) {
      this.setState({
        onGrammar: false,
        onListening: true,
        onEssay: false,
        onSpeaking: false
      });
    }
    if (this.state.onSpeaking === true) {
      this.setState({
        onGrammar: false,
        onListening: false,
        onEssay: true,
        onSpeaking: false
      });
    }
  }

  render() {
    const {onGrammar, onListening, onEssay, onSpeaking} = this.state;
    let grammar = 'bl';
    let listening = 'bl';
    let essay = 'bl';
    let speaking = 'bl';
    let step = <Grammar />;
    let prev = 'prev';
    let next = 'Next step';
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
        <div className='wrapper2'>{step}</div>
        <div className='wrapper3'>
          <div className='testButtons'>
            <Button className={prev} color='primary' variant='outlined' onClick={this.previousStep}>Previous step</Button>
            <Button className='next' color='primary' variant='contained' onClick={this.nextStep}>{next}</Button>
          </div>
          <div className='reportMistake'>Report a mistake</div>
        </div>
      </Layout>
    );
  }
}
