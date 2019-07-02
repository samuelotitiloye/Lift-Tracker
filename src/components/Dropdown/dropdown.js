import React, {Component} from 'react'

class dropdown extends Component{
    render(){
        return<div>
            <></>
            <div style ={{margin:'16px', position:'relative'}}>
                <dropdown
                workouts={[
                    {value: 'Chest',  id: 1 }, 
                    {value: 'Glutes',  id: 2 },
                    {value: 'Shoulders',  id: 3 }, 
                    {value: 'Legs',  id: 4 }, 
                    {value: 'Back',  id: 5 },  
                ]}
                />
                </div>
            </div>
    }
}

export default dropdown;