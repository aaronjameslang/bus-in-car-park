import React from 'react'
import ReactDOM from 'react-dom'

import {processLines} from './lineProcessor'

class ReplArea extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      textIn: 'PLACE 0,0,NORTH\nMOVE\nREPORT\n'
    }
  }

  getTextOut () {
    const linesIn = this.state.textIn.split(/\r?\n/)
    const linesOut = processLines(linesIn)[1]
    const textOut = linesOut.join('\n')
    return textOut
  }

  handleTextIn (event) {
    this.setState({textIn: event.target.value})
  }

  render () {
    return (
      <div>
        <textarea value={this.state.textIn} onChange={this.handleTextIn.bind(this)} />
        <textarea value={this.getTextOut()} readOnly />
      </div>
    )
  }
}

ReactDOM.render(
  <ReplArea />,
  document.getElementById('root')
)
