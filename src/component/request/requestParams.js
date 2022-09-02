import { useRef, useState, useMemo, useEffect } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const RequestParams = ({ urlParams = [], callbackUrl = function(){}}) => {
    const dataRef = useRef([{ key: ``, val: `` }])
    // const [callbackTrigger, setCallbackTrigger] = useState(false)
    const [callbackUrlTrigger, setCallbackUrlTrigger] = useState(false)
    const [data, setData] = useState([])

    const refChange = (index, key, val) => {
        dataRef.current[index][key] = val
        setCallbackUrlTrigger(true)
    }

    const refAdd = () => {
        dataRef.current.push({ key: ``, val: `` })
        setData([...dataRef.current])
    }

    const refDel = (i) => {
        dataRef.current.splice(Number(i), 1)
        setCallbackUrlTrigger(true)
    }

    useMemo(() => {
        if (urlParams && urlParams.length > 0) {
            let array = []
            urlParams.forEach((e) => {
                array.push({ key: e.key, val: e.val })
            })
            dataRef.current = array
        }
        setData([...dataRef.current])
    }, [urlParams])

    useEffect(() => {
        if (callbackUrlTrigger === true) {
            let array = [...dataRef.current]
            setData(array)

            let paramArray = []
            if (array.length > 0) {
                dataRef.current.forEach((e) => {
                    paramArray.push(e.key + `=` + e.val)
                })

                
            }
            callbackUrl(paramArray.join(`&`))
            setCallbackUrlTrigger(false)
        }
    }, [callbackUrlTrigger])

    return (
        <div className="mt-4">
            <Row>
                <Col xs={5}><b>Key</b></Col>
                <Col xs={5}><b>Value</b></Col>
                <Col xs={2}>
                    <Button variant="success" size="sm" onClick={() => refAdd()}>Add</Button>
                </Col>
            </Row>
            {data.map((e, i) => {
                return (<Row key={"params-" + i} className="mt-3">
                    <Col xs={5}>
                        <Form.Control value={e.key} onChange={(e1) => refChange(i, `key`, e1.target.value)} autoComplete="off" />
                    </Col>
                    <Col xs={5}>
                        <Form.Control value={e.val} onChange={(e1) => refChange(i, `val`, e1.target.value)} autoComplete="off" />
                    </Col>
                    <Col xs={2}>
                        <Button variant="danger" className={i === 0 ? `d-none` : ``} onClick={() => refDel(i)}>Del</Button>
                    </Col>
                </Row>)
            })}
        </div>
    )
}

export default RequestParams