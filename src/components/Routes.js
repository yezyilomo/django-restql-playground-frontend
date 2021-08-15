import React, { useState, useRef } from 'react';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import { useGlobalState } from 'state-pool';
import './Routes.scss';


function Routes(props) {
    const [models,] = useGlobalState("models");
    const [request, updateRequest] = useGlobalState(props.action);
    const [DEFAULT_QUERIES, ] = useGlobalState("DEFAULT_QUERIES");
    const [DEFAULT_PAYLOADS, ] = useGlobalState("DEFAULT_PAYLOADS");
    const [clipboardClass, setClipboardClass] = useState(["secondary", "icon-clipboard"]);

    const [show, setShow] = useState(false);
    const target = useRef(null);

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

    let getLink = () => {
        const BASE_URL = `https://django-restql-playground.yezyilomo.me/#/${props.action.toLowerCase()}/`;

        return `
        ${BASE_URL}?
        model=${request.model}&
        ${new Set(['GET', 'PUT', 'PATCH']).has(props.action) ? `pk=${request.pk}&`: ""}
        query=${request.query}
        ${new Set(['POST', 'PUT', 'PATCH']).has(props.action) ? `&payload=${request.payload}`: ""}
        `.replace(/\s+/g,"");
    }

    let copyLink = (event) => {
        setShow(true);
        var copyText = document.getElementById("generated-link");
        
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        
        /* Copy the text inside the text field */
        document.execCommand("copy");
        copyText.blur();

        setClipboardClass(["success", "icon-tick"]);
        setTimeout(()=>{
            setClipboardClass(["secondary", "icon-clipboard"]);
            event.target.blur();
            setShow(false);
        }, 2000)
    }

    let selectAll = (event) => {
        event.target.select();
        event.target.setSelectionRange(0, 99999);
    }

    return (
        <div class="col-12 p-0 m-0 px-4">
            <form>
                <div class="row justify-content-left px-0 mx-3">
                    <div class="col-12 col-md-4 p-0 m-0  my-3 my-md-1">
                        <div class="input-group px-0 pr-md-3">
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
                        <div class="col-12 col-md-4 p-0 m-0 my-3 my-md-1">
                            <div class="input-group px-0 pr-md-4">
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
                    <div class="col-12 col-md-4 p-0 m-0 my-3 my-md-1">
                        <div class="input-group mb-3 px-0 pr-md-3">
                            <input type="text" class="form-control" value={getLink()} id="generated-link"
                                   placeholder="https://django-restql-playground.yezyilomo.me/#/get"
                                   onFocus={selectAll} readonly="readonly" />
                            <div class="input-group-append">
                                <Button ref={target} class={`btn btn-outline-${clipboardClass[0]}`} type="button" onClick={copyLink}>
                                    <span class={`icon ${clipboardClass[1]}`} />
                                </Button>
                                <Overlay target={target.current} show={show} placement="top">
                                    {(props) => (
                                        <Tooltip id="clipboard-tooltip" {...props}>
                                            Copied
                                        </Tooltip>
                                    )}
                                </Overlay>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export { Routes }