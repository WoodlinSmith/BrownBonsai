import React, { useState} from 'react';
import "./tailwind.css"
import live from "./asset/alive.png"
import dying from "./asset/dying.png"
import dead from "./asset/dead.png"
import StatBar from "./StatBar"
interface IProps {

}

interface IState{
    health: number
    dead: boolean
    water: number
    timer: NodeJS.Timeout|null
}

class Bonsai extends React.Component<IProps, IState> {
 
    constructor(props:any){
        super(props)
        //simple stats for now
        this.state={health:100, dead:false, water:100, timer:null}

  }

    componentDidMount() : void {
        this.setState({timer:setInterval(
            () => this.newDay(),
            1000
        )}
        );
    }

    getHealth(){
        return this.state.health;
    }
    getWater(){
        return this.state.water;
    }



    newDay() : void {
        //Necromancy does not exist in the bonsai world, if we're dead, we're dead!
        this.forceUpdate();
        if(!this.state.dead){
            if(this.state.health>0){
                this.setState({health:this.state.health-this.waterDamage()});
            }
            if(this.state.health<100){
                this.setState({health:this.state.health+this.grow()});
            }

            if(this.state.water>0){
                this.setState({water:this.state.water-10});
            }
            if(this.state.health==0){
                this.setState({dead:true});
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

    grow() : number {
        if(this.state.water>=50){
            return 1;
        }
        return 0;

    }
    water() : void {
        if(this.state.water<=90){
            this.setState({water:this.state.water+10});
        }

        //Just top it off if we're over 90%
        //May add overwatering later.
        else {
            this.setState({water:100});
        }
        console.log(this.state.water);
        this.forceUpdate();
    }

    render() {
        return (
            <div className="mx-auto w-100 h-100">
                <div className="bg-white flex mx-auto flex-shrink-6 w-40 h-40">
                    {this.state.health>50 && 
                        <img src={live}></img>
                    }
                    {this.state.health<=50 && this.state.health>0 &&
                        <img src={dying}></img>
                    }
                    {this.state.dead &&
                        <img src={dead}></img>
                    }
                    
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={this.water.bind(this)}>Water your tree!</button>
                <StatBar bgcolor="red" completion={this.state.health} getCompletion={this.getHealth}></StatBar>
                <StatBar bgcolor="blue" completion={this.state.water} getCompletion={this.getWater}></StatBar>
            </div>
        )
    }
}

export default Bonsai;