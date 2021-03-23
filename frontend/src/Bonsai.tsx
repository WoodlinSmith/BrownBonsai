import React, { useState} from 'react';
import "./tailwind.css"
import live from "./asset/alive.png"
import dying from "./asset/dying.png"
import dead from "./asset/dead.png"
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
            100
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
            //Placeholder val
            return 1;
        }
        return 0;
    }

    grow() : void {

    }

    render() {
        return (
            <div>
                {this.state.health>50 && 
                    <img src={live}></img>
                }
                {this.state.health<=50 &&
                    <img src={dying}></img>
                }
                {this.state.dead &&
                    <img src={dead}></img>
                }
            </div>
        )
    }
}

export default Bonsai;