import React from 'react';
import { useGlobalState } from 'state-pool';
import './Routes.scss';


function Routes(props) {
    const [models,] = useGlobalState("models");
    const [request, updateRequest] = useGlobalState(props.action);
    const [DEFAULT_QUERIES, ] = useGlobalState("DEFAULT_QUERIES");
    const [DEFAULT_PAYLOADS, ] = useGlobalState("DEFAULT_PAYLOADS");

    const isMutationRequest = new Set(['POST', 'PUT', 'PATCH']).has(props.action);

    let updateModel = (e) => {
        updateRequest((request) => {
            request.model = e.target.value;
            request.query = DEFAULT_QUERIES[e.target.value];

            if(isMutationRequest){
                request.payload = DEFAULT_PAYLOADS[e.target.value]
            }
        })
    }

    let updatePk = (e) => {
        updateRequest((request) => {
            request.pk = e.target.value;
        })
    }

    return (
        <div class="col-12 p-0 m-0 px-5">
            <form>
                <div class="row justify-content-left pl-md-2">
                    <div class="col-12 col-md-4 p-0 m-0 mr-md-3  my-3 my-md-2">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Model</label>
                            </div>
                            <select value={request.model} class="custom-select" onChange={updateModel}>
                                <option value="" selected disabled>Choose...</option>
                                {models.map((model) => {
                                    return <option value={model[0]}>{model[1]}</option>
                                })}
                            </select>
                        </div>
                    </div>
                    {props.action === "POST" ? null :
                        <div class="col-12 col-md-4 p-0 m-0 mx-md-3 my-3 my-md-2">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Data</label>
                                </div>
                                <select value={request.pk} class="custom-select" onChange={updatePk}>
                                    {props.action === "PUT" || props.action === "PATCH" ?
                                        <option value="" disabled selected>Choose...</option>
                                        : <option value="" selected>All</option>
                                    }
                                    {[1, 2, 3, 4, 5].map((pk) => {
                                        return <option value={pk}>{pk}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    }
                </div>
            </form>
        </div>
    );
}

export { Routes }