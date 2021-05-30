import React from 'react';
import { Link } from 'react-router-dom';
import './Actions.scss';


function Actions(props){

    let actions = [
        ["get", "GET"],
        ["post", "POST"],
        ["put", "PUT"],
        ["patch", "PATCH"]
    ].map(action => {
        if(props.action === action[1]){
            action.push("btn-secondary");
        }
        else{
            action.push("btn-primary");
        }
        return action
    })

    return (
        <div class="col-12 row justify-content-left p-0 m-0 px-4 my-3 my-md-2">
            {actions.map(
                action => <Link to={action[0]} class={`action btn ${action[2]} col mx-3`}>{action[1]}</Link>
            )}
        </div>
    );
}

export {Actions}