import React from 'react';
import ReactDOM from 'react-dom';
import { 
  Button, Wrapper, WrapperBottom,
  Container, Input, ButtonStart,
  WrapperEdit, Span, WrapperSquare,
  WrapperTime, Player, Bottom,
  Winner, Back,
} from './caroStyle';
  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        column: 10,
        row: 10,
        boardSize: {
          row: 10,
          column: 10,
        },
        squares: [],
        history: [],
        isEdit: false,
        cellValue: '',
        nextTurn: true,
        minPlayerX: '',
        secPlayerX: '',
        minPlayerO: '',
        secPlayerO: '',
        winner: false,
        stopTime: true,
        maxTime: {
          minutes: '',
          seconds: '',
        },
        winnerPlayerX: false,
        winnerPlayerO: false,
      }
      this.renderVerticalColumn = this.renderVerticalColumn.bind(this);
      this.renderSquare = this.renderSquare.bind(this);
      this.onClickStart = this.onClickStart.bind(this);
      this.onChangeColumn = this.onChangeColumn.bind(this);
      this.onChangeRow = this.onChangeRow.bind(this);
      this.renderResult = this.renderResult.bind(this);
      this.onClickSquare = this.onClickSquare.bind(this);
      this.secondsToTime = this.secondsToTime.bind(this);
      this.renderTimerPlayerX = this.renderTimerPlayerX.bind(this);
      this.renderTimerPlayerO = this.renderTimerPlayerO.bind(this);
      this.checkWinner = this.checkWinner.bind(this);
      this.renderWinner = this.renderWinner.bind(this);
      this.onClickBackHistory = this.onClickBackHistory.bind(this);
    }

    callBackSquareClick(rowIndex, columnIndex) {
      const { nextTurn, stopTime, squares, maxTime, history } = this.state;
      if(squares[rowIndex][columnIndex] === 'X') return;
      if(squares[rowIndex][columnIndex] === 'O') return;
      squares[rowIndex][columnIndex] = nextTurn ? 'X' : 'O';
      console.log("squares = ", squares);
      const cloned = JSON.parse(JSON.stringify(squares));
      history.push(cloned);
      console.log("history=", history);
      if(stopTime === true) {
        this.secondsToTime(2, maxTime.seconds);
      } else {
        this.secondsToTime(1, maxTime.seconds);
      }
      this.setState({
        stopTime: !stopTime,
        nextTurn: !nextTurn,
      }, () => {
        if(this.checkWinner('X') === true) {
          this.setState({
            winner: true,
            winnerPlayerX: true,
            minPlayerX: '',
            secPlayerX: '',
            minPlayerO: '',
            secPlayerO: '',
          });
        }
        if(this.checkWinner('O') === true) {
          this.setState({
            winner: true,
            winnerPlayerO: true,
            minPlayerX: '',
            secPlayerX: '',
            minPlayerO: '',
            secPlayerO: '',
          })
        }
      });
    }

    onClickSquare(rowIndex, columnIndex) {
      const { isEdit } = this.state;
      if(isEdit === false) {
        this.onClickStart();
        setTimeout(()=> {
          this.callBackSquareClick(rowIndex, columnIndex)
        }, 500);
      } else {
        this.callBackSquareClick(rowIndex, columnIndex)
      }
      
    }

    renderSquare(i, j) {
      const { history } = this.state;
      let squaresHistory;
      if(history.length > 0) {
        squaresHistory = history[history.length - 1];
      } else {
        squaresHistory = [];
      }
      
      return (
        <React.Fragment>
          <Button
            onClick={() => this.onClickSquare(i, j)}
          >
            {squaresHistory.length > 0 && squaresHistory[i][j]}
          </Button>
        </React.Fragment>
        
      );
    }
    
    onChangeColumn(event) {
      const columnNumber = event.target.value;
      this.setState({
        column: columnNumber,
      });
    }
    onChangeRow(event) {
      const rowNumber = event.target.value;
      this.setState({
        row: rowNumber,
      });
    }
    onChangeMaxTime(event) {
      const Number = event.target.value * 60;
      this.setState({
        maxTime: {
          minutes: event.target.value,
          seconds: Number,
        },
      });
    }

    onClickStart() {
      const { isEdit, column, row } = this.state;
      let { squares } = this.state;
      squares = [];
      for(let i=0; i < row; i += 1) {
        const rowData = [];
        for(let j=0; j < column; j += 1) {
          rowData.push(' ');
        }
        squares.push(rowData);
      }
      if(column >= 5 && row >= 5) {
        this.setState({
        isEdit: !isEdit,
        cellValue: '',
        winner: false,
        boardSize: {
          column,
          row,
        },
        squares,
        history: [],
        });
      }
      
    }

    onClickBackHistory() {
      const { history, nextTurn } = this.state;
      history.pop();
      console.log("history###=", history);
      this.setState({
        squares: history[history.length - 1],
        nextTurn: !nextTurn,
      });
    }

    renderVerticalColumn(j, col) {
      let result = [];
      for(let i = 0; i < col; i++) {
        result.push(this.renderSquare(i, j));
      }
      return (
        <WrapperSquare>
          {result}
        </WrapperSquare>
      );
    }

    renderResult(col, row) {
      const result = [];
      for(let j = 0; j < row; j++) {
        result.push(this.renderVerticalColumn(j, col));
      }
      return result;
    }

    renderTimerPlayerX() {
      const { minPlayerX, secPlayerX, maxTime } = this.state;
      let min  = Math.floor(maxTime.seconds / 60);
      let sec = maxTime.seconds - min * 60;
      return(
        <React.Fragment>
          <Span>{(minPlayerX < 1 ? '0' : minPlayerX) || min}:{(secPlayerX < 10 && secPlayerX !== 0 ? '0' + secPlayerX : secPlayerX) || (sec < 10 ? '0' + sec : sec)}</Span>
        </React.Fragment>
      );
    }
    renderTimerPlayerO() {
      const { minPlayerO, secPlayerO, maxTime } = this.state;
      let min  = Math.floor(maxTime.seconds / 60);
      let sec = maxTime.seconds - min * 60;
      return(
        <React.Fragment>
          <Span>{(minPlayerO < 1 ? '0' : minPlayerO) || min}:{(secPlayerO < 10 && secPlayerO !== 0 ? '0' + secPlayerO : secPlayerO) || (sec < 10 ? '0' + sec : sec)}</Span>
        </React.Fragment>
      );
    }

    checkWinner(player) {
      const { squares, boardSize } = this.state;
      for(var i = 0; i < boardSize.column; i += 1) {
        for( var j = 0; j < boardSize.row; j += 1) {
          if(
            squares[i][j] === player && squares[i][j+1] === player && squares[i][j+2] === player && squares[i][j+3] === player && squares[i][j+4] === player
          ) return true;
          if(
            squares[i][j] === player && squares[i+1][j+1] === player && squares[i+2][j+2] === player && squares[i+3][j+3] === player && squares[i+4][j+4] === player
          ) return true;
          if(
            squares[i][j] === player && squares[i+1][j] === player && squares[i+2][j] === player && squares[i+3][j] === player && squares[i+4][j] === player
          ) return true;
          if(
            squares[i][j] === player && squares[i+1][j-1] === player && squares[i+2][j-2] === player && squares[i+3][j-3] === player && squares[i+4][j-4] === player
          ) return true;
        }
      }
      return false;
    }
    renderWinner() {
      const { winnerPlayerX, winnerPlayerO, winner, nextTurn } = this.state;
      if(winnerPlayerX === true || (winner === true && nextTurn === false)) {
        return(
        <Span size={30}>Chicked player X winner</Span>
        );
      }
      if(winnerPlayerO === true || (winner === true && nextTurn === true)) {
        return(
        <Span size={30}>Chicked player O winner</Span>
        );
      }
    }

    secondsToTime(index, secs) {
      if (this.countdown) clearInterval(this.countdown);
      this.countdown = setInterval(() => {
        const {isEdit} = this.state;
        secs--;
        let minutes  = Math.floor(secs / 60);
        let seconds = secs - minutes * 60;
        if(index === 1) {
          this.setState({
            minPlayerX: minutes,
            secPlayerX: seconds,
          });
        } else {
          this.setState({
            minPlayerO: minutes,
            secPlayerO: seconds,
          });
        }
        if(secs <= 0) {
          clearInterval(this.countdown);
          this.setState({
            minPlayerX: '',
            secPlayerX: '',
            minPlayerO: '',
            secPlayerO: '',
            winner: true,
          });
        }
        if(isEdit === false) {
          clearInterval(this.countdown);
          this.setState({
            minPlayerX: '',
            secPlayerX: '',
            minPlayerO: '',
            secPlayerO: '',
          });
        }
      }, 1000);
    }

    renderHeader() {
      const {
        column, row, isEdit,
        maxTime,
      } = this.state;
      return (
        <Wrapper>
          <WrapperEdit>
            <Span>Column : </Span>
            <Input
              id="number"
              type="number"
              value={column}
              onChange={event => this.onChangeColumn(event)}
            >
            </Input>
            <br />
            <Span>Row      : </Span>
            <Input
              id="number"
              type="number"
              value={row}
              onChange={event => this.onChangeRow(event)}
            >
            </Input>
          </WrapperEdit>
          <ButtonStart onClick={ ()=> this.onClickStart()}>{isEdit ? 'Restart' : 'Start'}</ButtonStart>
          <Container>
            <Span size={30}>Max time: </Span>
            <Input
              id="number"
              type="number"
              value={maxTime.minutes}
              onChange={event => this.onChangeMaxTime(event)}
              width={2.5}
            >
            </Input>
            <Span size={25}> minutes</Span>
          </Container>
        </Wrapper>
      );
    }

    render() {
      const {
        nextTurn, boardSize,
      } = this.state;
      return (
        <React.Fragment>
          {
            this.renderHeader()
          }
          <Bottom>
            <WrapperBottom>
              <Span>{'Next player: '}{nextTurn ? 'X' : 'O'}</Span>
              {this.renderResult(boardSize.column, boardSize.row)}
              <Back onClick={() => this.onClickBackHistory()}>Back</Back>
            </WrapperBottom>
            <Winner>{this.renderWinner()}</Winner>
            <WrapperTime>
              <Player color="red">
                <span>PLAYER X</span>
                <br/>
                {this.renderTimerPlayerX()}
              </Player>
              <Player color="blue">
                <span>PLAYER O</span>
                <br/>
                {this.renderTimerPlayerO()}
              </Player>
            </WrapperTime>
          </Bottom>
        </React.Fragment>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <React.Fragment>
          <Container>
            <Board />
          </Container>
        </React.Fragment>
      );
    }
  }
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  