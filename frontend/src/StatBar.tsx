import React from 'react';

interface IProps{
    bgcolor: string;
    completion: number;
    getCompletion: Function;
}
interface IState{
    timer: NodeJS.Timeout|null
    count: number
    width: number
}



class StatBar extends React.Component<IProps, IState>{
    constructor(props:any){
        super(props)
        this.state={timer:null, count:0, width:this.props.completion}
       
    }
    componentDidMount() {
        this.setState({timer:setInterval(
            () => this.increment(),
            1000
        )}
        );
    }
    increment() {
        this.setState({count:this.state.count+1})
    }

    
    render(){
      var  containerStyles = {
            height: 20,
            width: '100%',
            backgroundColor: "#e0e0de",
            borderRadius: 50,
            margin: 50
          }
        
      var  fillerStyles = {
            height: '100%',
            width: `${this.props.completion}%`,
            backgroundColor: this.props.bgcolor,
            borderRadius: 'inherit',
            textAlign: 'right' as 'right',
            transition: 'width 1s ease-in-out',
          }
        
      var  labelStyles = {
            padding: 5,
            color: 'white',
            fontWeight: 'bold' as 'bold'
          }
        return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
              <span style={labelStyles}>{`${this.props.completion}%`}</span>
            </div>
        </div>
        )
    }
}

export default StatBar;