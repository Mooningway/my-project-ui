import { useRef, useState, useMemo } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const RequestParamKeyVal = ({ keyVals = [], callback = function(){}}) => {
    const dataRef = useRef([{ key: ``, val: `` }])
    const [data, setData] = useState([])

    const refChange = (index, key, val) => {
        dataRef.current[index][key] = val
        let array = [...dataRef.current]
        setData(array)
        callback(array)
    }

    const refAdd = () => {
        dataRef.current.push({ key: ``, val: `` })
        let array = [...dataRef.current]
        setData(array)
        callback(array)
    }

    const refDel = (i) => {
        dataRef.current.splice(Number(i), 1)
        let array = [...dataRef.current]
        setData(array)
        callback(array)
    }

    useMemo(() => {
        let array = [...dataRef.current]
        setData(array)
    }, [])

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

export default RequestParamKeyVal