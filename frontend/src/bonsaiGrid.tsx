import React, { useState} from 'react';
interface IProps {

}

interface IState{
    health: number
    dead: boolean
    water: number
    timer: NodeJS.Timeout|null
}

class Bonsai extends React.Component< IProps, IState> {
 
    constructor(props:any){
        super(props)
        //simple stats for now
        this.state={health:100, dead:false, water:100, timer:null}
    }

    componentDidMount() : void {
        this.setState({timer:setInterval(
            () => this.newDay(),
            10000
        )}
        );
    }



    newDay() : void {
        //Necromancy does not exist in the bonsai world, if we're dead, we're dead!
        if(!this.state.dead){
            this.setState({health:this.state.health-this.waterDamage()})
            this.setState({water:this.state.water-10})
            if(this.state.health==0){
                this.setState({dead:true})
            }
            
        }

    }

    waterDamage() : number {
        if(this.state.water<50){
            return this.state.water/10;
        }
        return 0;
    }

    grow() : void {

    }
}