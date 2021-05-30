import React, { useEffect, useState } from 'react';
import './DataQueryingPlayGround.scss';

import { Spinner } from 'react-bootstrap';
import { useGlobalState } from 'state-pool';
import Editor from "react-simple-code-editor";
import Prism from 'prismjs';

import { BASE_API_URL } from '../';


function DataQueryingPlayGround(props) {
    const [request, updateRequest] = useGlobalState(props.action);

    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [, setError] = useState(null);

    let updateQuery = (query) => {
        updateRequest((request) => {
            request.query = query
        })
    }

    let getPk = () => {
        if(request.pk){
            return `${request.pk}/`
        }
        return ""
    }

    useEffect(() => {
        if (request.query) {
            fetchData();
        }
    }, [request])

    async function fetchData(e) {
        const headers = { "Content-Type": "application/json", }

        try {
            setLoading(true);
            const data = await fetch(
                `${BASE_API_URL}/${request.model}/${getPk()}?query=${request.query}`,
                {method: props.action, headers: headers }
            ).then(res => res.json())

            setResponse(JSON.stringify(data, null, 4));
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    const style = {
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 13,
    }

    return (
        <div class="col-12 px-5 data-querying">
            <div class="row justify-content-center">
                <div class="col-12 col-md-6 p-0 m-0 my-2 query_editor_container">
                    <div class="col-12 p-0 m-0">
                        <Editor
                            placeholder="# Write your query here, be sure to select a model first.."
                            value={request.query}
                            onValueChange={updateQuery}
                            highlight={code => Prism.highlight(code, Prism.languages.javascript)}
                            padding={10}
                            className="query_editor"
                            style={style}
                        />
                    </div>
                </div>

                <div class="send_btn btn btn-primary" onClick={fetchData}>
                    {loading ?
                        <Spinner className="loader" animation="border" size="sm" />
                        : <span class="icon icon-play-btn"></span>
                    }
                </div>

                <div class="col-12 col-md-6 p-0 m-0 my-2 response_container">
                    <div class="col-12 p-0 m-0">
                        <Editor
                            placeholder="# Your response will appear here.."
                            value={response}
                            highlight={code => Prism.highlight(code, Prism.languages.javascript)}
                            padding={10}
                            className="response"
                            style={style}
                            disabled
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { DataQueryingPlayGround }