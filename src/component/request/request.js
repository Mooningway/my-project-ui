import { useState, useEffect } from "react"
import RequestParams from "./requestParams"
import RequestParamKeyVal from  "./requestParamKeyVal"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Request = () => {
    const [url, setUrl] = useState(``)
    const [method, setMethod] = useState(`GET`)
    const [headers, setHeaders] = useState([])
    const [urlParams, setUrlParams] = useState([])
    
    // `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `COPY`, `HEAD`, `OPTIONS`, `LINK`, `UNLINK`, `PURGE`, `LOCK`, `UNLOCK`, `PROPFIND`, `VIEW`
    const methods = [`GET`, `POST`, `PUT`, `DELETE`]
    const [bodyTabsActive, setBodyTabsActive] = useState(`Params`)
    const bodyRadioArray = [`none`, `from-data`, `raw`]
    const [bodyRadio, setBodyRadio] = useState(`none`)
    const [raw, setRaw] = useState(``)

    const [response, setResponse] = useState(``)

    const send = () => {
    }
    
    const callbackSetUrl = (pararmString) => {
        if (url && url.length > 0 && pararmString && pararmString.length > 0) {
            setUrl(url.split(`?`)[0] + `?` + pararmString)
        }        
    }

    const callbackSetHeaders = (headers) => {
        setHeaders(headers)
    }

    useEffect(() => {
        let urlParams = []
        let queryString = url.split(`?`)[1]
        if (queryString) {
            queryString = queryString.split(`#`)[0]
            let arr = queryString.split(`&`)
            arr.forEach((e) => {
                let a = e.split(`=`)
                let paramName = a[0]
                let paramValue = typeof (a[1]) === `undefined` ? `` : a[1]
                urlParams.push({ key: paramName, val: paramValue })
            })
        }
        if (urlParams.length > 0) {
            setUrlParams(urlParams)
        }
    }, [url])

    return (
        <div className="me-box">
            <h4 className="mt-3 mb-5">
                <ol className="breadcrumb bold">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Request</li>
                </ol>
            </h4>

            <Row>
                <Col xs={2} className="text-center">
                    <Form.Select value={method} onChange={(e) => setMethod(e.target.value)} autoComplete="off">
                        {methods.map((e, i) => {
                            return <option key={e} value={e}>{e}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={9}>
                    <Form.Control type="text" value={url} onChange={(e) => setUrl(e.target.value)} autoComplete="off" />
                </Col>
                <Col xs={1}>
                    <Button variant="primary" onClick={() => send()}>Send</Button>
                </Col>
            </Row>

            <Tabs className="mt-4" activeKey={bodyTabsActive} onSelect={(k) => setBodyTabsActive(k)}>
                {/* `Params`, `Authorization`, `Headers`, `Body`, `Pre-request Script`, `Tests`, `Settings` */}
                <Tab eventKey="Params" title="Params">
                    <RequestParams urlParams={urlParams} callbackUrl={callbackSetUrl} abc="123" />
                </Tab>
                <Tab eventKey="Headers" title="Headers">
                    <RequestParamKeyVal callback={callbackSetHeaders}/>
                </Tab>
                <Tab eventKey="Body" title="Body">
                    <Row className="mt-4">
                        <Col xs={12}>
                            {bodyRadioArray.map((r, ri) => {
                                return <Form.Check key={"body-radio-" + ri} type="radio" name="body-radio" label={r} onChange={() => { setBodyRadio(r) }} inline defaultChecked={ri === 0} />
                            })}
                        </Col>
                    </Row>
                    <div className={bodyRadio === "from-data" ? "" : "d-none"}><RequestParamKeyVal /></div>
                    <Form.Control className={bodyRadio === "raw" ? "mt-4" : "d-none"} as="textarea" rows={10} value={raw} onChange={(e) => setRaw(e.target.value)} autoComplete="off" />
                </Tab>
            </Tabs>

            <h4 className="mt-5">Response</h4>
            <Form.Control className="mt-3" as="textarea" rows={10} value={response} onChange={(e) => setResponse(e.target.value)} autoComplete="off" readOnly />
        </div>
    )
}

export default Request