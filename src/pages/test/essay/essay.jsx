import React, {Component} from "react";
import './essay.scss';

export default class Essay extends Component {
  state = {
    value: '',
    length: 0
  };

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  getValueLength = () => {
    this.setState({length: this.state.value.length});
  }

  render() {
    return (
      <>
        <div className='stepDescription'>Write an essay on a given topic</div>
        <div className='essayTopic'>Essay Topic</div>
        <textarea onPaste={(event) => {event.preventDefault(); return false;}}
                  onCopy={(event) => {event.preventDefault(); return false;}}
                  onCut={(event) => {event.preventDefault(); return false;}}
                  className='essayInput' maxLength='512' value={this.state.value}
                  onChange={this.handleChange} onKeyUp={this.getValueLength} onKeyDown={this.getValueLength}/>
        <div className='essayCount'>{this.state.length} out of 512 characters</div>
      </>
    );
  }
}
