import React, { useState, useEffect } from 'react';
import { parse } from 'query-string';
import { useLocation } from 'react-router';
import './DataMutationPlayGround.scss';

import { Spinner } from 'react-bootstrap';
import { useGlobalState } from 'state-pool';
import Editor from "react-simple-code-editor";
import Prism from 'prismjs';

import { BASE_API_URL, CODE_FORMAT_OPTIONS } from '../';
import js from 'js-beautify'
import { highlightCode } from './DataQueryingPlayGround';


function DataMutationPlayGround(props) {
    const location = useLocation()
    const [request, updateRequest] = useGlobalState(props.action);

    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [, setError] = useState(null);
    const [size, updateSize] = useGlobalState(`${props.action}_View`, {default: {
        selected: "0",
        options: {
            "0": ['query-default', 'payload-default'],
            "1": ['query-min', 'payload-max'],
            "2": ['query-max', 'payload-min']
        }}
    })

    let updateQuery = (query) => {
        updateRequest((request) => {
            request.query = query
        })
    }

    let updatePayload = (payload) => {
        updateRequest((request) => {
            request.payload = payload
        })
    }


    let getPk = () => {
        if(request.pk){
            return `${request.pk}/`
        }
        return ""
    }

    async function fetchData(e) {
        const headers = { "Content-Type": "application/json" }

        try {
            setLoading(true);
            const data = await fetch(
                `${BASE_API_URL}/${request.model}/${getPk()}?query=${request.query}`,
                { method: props.action, body: request.payload, headers: headers }
            ).then(res => res.json())

            setResponse(JSON.stringify(data, null, 4));
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const parsed = parse(location.search);
        updateRequest((req) => {
            req.model = parsed.model||req.model;
            req.pk = parsed.pk||req.pk;
            req.query = js.js_beautify(parsed.query, CODE_FORMAT_OPTIONS)||req.query;
            req.payload = js.js_beautify(parsed.payload, CODE_FORMAT_OPTIONS)||req.payload;
        })
    }, [location])

    const formatQueryCode = (e) => {
        updateRequest((req) => {
            req.query = js.js_beautify(request.query, CODE_FORMAT_OPTIONS);
        })
    }

    const showQueryFormat = () => {
        if(request.query !== js.js_beautify(request.query, CODE_FORMAT_OPTIONS)){
            return "d-block"
        }
        return "d-none"
    }

    const formatPayloadCode = (e) => {
        updateRequest((req) => {
            req.payload = js.js_beautify(request.payload, CODE_FORMAT_OPTIONS);
        })
    }

    const showPayloadFormat = () => {
        if(request.payload !== js.js_beautify(request.payload, CODE_FORMAT_OPTIONS)){
            return "d-block"
        }
        return "d-none"
    }

    const toggleSize = () => {
        updateSize((size) => {
            let i = (Number(size.selected) + 1) % 3;
            size.selected = `${i}`
        })
    }

    const style = {
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 13,
    }

    return (
        <div class="col-12 px-5 data-mutation">
            <div class="row justify-content-center">
                <div class="col-12 col-md-6 p-0 m-0 my-2 editors_container">
                    <div class="col-12 p-0 m-0 query_editor_container">
                        <div class="field-label">Query</div>
                        <div class="size-toggler-btn btn-primary text-center" onClick={toggleSize}>
                        🞣/—
                        </div>
                        <div class={`editor ${size.options[size.selected][0]}`}>
                        <Editor
                            placeholder={`# Write your query here, be sure to select a model${
                                props.action === 'POST'? '': ' and data'
                            } first..`}
                            value={request.query}
                            onValueChange={updateQuery}
                            highlight={highlightCode}
                            padding={10}
                            className="query_editor"
                            style={style}
                        />
                        </div>
                        <div class={`format-code btn btn-primary ${showQueryFormat()}`} onClick={formatQueryCode}>Format</div>
                    </div>

                    <div class="col-12 p-0 payload_editor_container">
                    <div class="field-label">Payload</div>
                        <div class={`editor ${size.options[size.selected][1]}`}>
                        <Editor
                            placeholder={`# Write your payload here, be sure to select a model${
                                props.action === 'POST'? '': ' and data'
                            } first..`}
                            value={request.payload}
                            onValueChange={updatePayload}
                            highlight={highlightCode}
                            padding={10}
                            className="payload_editor"
                            style={style}
                        />
                        </div>
                        <div class={`format-code btn btn-primary ${showPayloadFormat()}`} onClick={formatPayloadCode}>Format</div>
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
                    <div class="field-label">Response</div>
                        <div class="editor">
                        <Editor
                            placeholder="# Your response will appear here.."
                            value={response}
                            highlight={highlightCode}
                            padding={10}
                            className="response"
                            style={style}
                            disabled
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { DataMutationPlayGround }