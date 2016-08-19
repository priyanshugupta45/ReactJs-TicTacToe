import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {

  constructor(props){
    super(props);
    
  }
 // playerx=true
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

/*
In JavaScript classes, you need to always call super when defining the constructor of a subclass.
 All React component classes that have a constructor should start it with a super(props) call.
*/

/*
By calling this.setState from an onClick handler in the Square’s render method, we tell React to re-render that Square whenever its <button> is clicked. After the update, the Square’s this.state.value will be 'X', so we’ll see the X on the game board. 
If you click on any Square, an X should show up.
When you call setState in a component, React automatically updates the child components inside of it too.
*/


class Board extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      squares:Array(9).fill(null),
      xIsNext:true,
    }
  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={()=>this.handleClick(i)}/>;
  }

  handleClick(i){
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext?'X':'0';
    this.setState({squares:squares,
      xIsNext:!this.state.xIsNext
  })}
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

