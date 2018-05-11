import React, { Component } from 'react';

const buttonFlex={
  display:'flex',
  justifyContent:'center',
  flexWrap:'wrap'
}

const timeFlex = {
  flex:'10',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  fontSize:'5em'
}

const overallFlex={
  display:'flex',
  textAlign:'center',
  flexDirection:'column',
  justifyContent:'center',
  height:'100vh'
}
class App extends Component {

  constructor(props){
    super(props)
    this.state={
      previousTime:0,
      elapsedTime:0,
      running:false
    }
  }

  componentDidMount(){
    this.interval = setInterval(this.onTick,100)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  onTick = ()=>{
    if(this.state.running){
      const now = Date.now()
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime)
      })
    }
  }

  onStart = ()=>{
    this.setState({
      running:true,
      previousTime: Date.now()
    })
  }

  onStop = ()=>{
    this.setState({
      running:false
    })
  }

  onReset = ()=>{
    this.setState({
      elapsedTime:0,
      previousTime:Date.now()
    })
  }

  render() {
    let hours=('0'+Math.floor(this.state.elapsedTime/3600000)).slice(-2)
    let minutes=('0'+Math.floor(this.state.elapsedTime/60000)%60).slice(-2)
    let seconds = ('0'+Math.floor(this.state.elapsedTime/1000)%60).slice(-2)
    return (
      <div style={{...overallFlex}}>
        <div style={{...timeFlex}}><div>{hours}:{minutes}:{seconds}</div></div>
        <div style={{...buttonFlex,flex:'1'}}>
          {
            this.state.running? 
            <button className="waves-effect waves-light blue btn" style={{flex:'1',margin:'10px'}} onClick={this.onStop}>Stop</button>
            : 
            <button className="waves-effect waves-light blue btn" style={{flex:'1',margin:'10px'}} onClick={this.onStart}>Start</button>
          }
          <button className="waves-effect waves-light blue btn" style={{flex:'1',margin:'10px'}} onClick={this.onReset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default App;
