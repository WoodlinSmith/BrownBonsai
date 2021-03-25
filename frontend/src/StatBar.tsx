import React from 'react';

interface IProps{
    bgcolor: string;
    completion: number;
}




class StatBar extends React.Component<IProps>{
    constructor(props:any){
        super(props)
    }

    
    render(){
      let  containerStyles = {
            height: 20,
            width: '100%',
            backgroundColor: "#e0e0de",
            borderRadius: 50,
            margin: 50
          }
        
      let  fillerStyles = {
            height: '100%',
            width: `${this.props.completion}%`,
            backgroundColor: this.props.bgcolor,
            borderRadius: 'inherit',
            textAlign: 'right' as 'right',
            transition: 'width 1s ease-in-out',
          }
        
      let  labelStyles = {
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