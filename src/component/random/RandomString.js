import { useMemo, useState } from "react";
import { randomString } from "../../api/random/ApiRandom";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RandomString() {
    const [numberCheck, setNumberCheck] = useState(true)
    const [lowerCheck, setLowerCheck] = useState(true)
    const [upperCheck, setUpperCheck] = useState(false)
    const [characterCheck, setCharacterCheck] = useState(false)
    const [len, setLen] = useState(`6`)
    const [lenList, setLenList] = useState([])
    const [text, setText] = useState(``)

    const generateClick = () => {
        let data = {
            number: numberCheck === true ? 1 : 0,
            lower: lowerCheck === true ? 1 : 0,
            upper: upperCheck === true ? 1 : 0,
            character: characterCheck === true ? 1 : 0,
            len: Number(len)
        }
        randomString(data, response => {
            setText(response.data)
        })
    }

    useMemo(() => {
        let data = []
        for (let i = 6; i <= 100; i++) {
            data.push(i + ``)
        }
        setLenList(data)
    }, [])

    return (
        <Form className="me-box">
            <h4 className="mt-3 mb-5">
                <ol className="breadcrumb bold">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Random String</li>
                </ol>
            </h4>

            <Row>
                <Col xs={2}>
                    <Form.Check className="" type="checkbox" label="Number" checked={numberCheck} onChange={(e) => setNumberCheck(e.target.checked)} autoComplete="off" />
                    <Form.Check className="mt-3" type="checkbox" label="Lower" checked={lowerCheck} onChange={(e) => setLowerCheck(e.target.checked)} autoComplete="off" />
                    <Form.Check className="mt-3" type="checkbox" label="Upper" checked={upperCheck} onChange={(e) => setUpperCheck(e.target.checked)} autoComplete="off" />
                    <Form.Check className="mt-3" type="checkbox" label="Character" checked={characterCheck} onChange={(e) => setCharacterCheck(e.target.checked)} autoComplete="off" />
                    <Form.Select className="mt-3" value={len} size="sm" onChange={(e) => setLen(e.target.value)} autoComplete="off">
                        {lenList.map((e, i) => {
                            return <option key={e + "-" + i} value={e}>{e}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={10}>
                    <Form.Control as="textarea" rows={5} value={text} onChange={(e) => setText(e.target.value)} autoComplete="off" />
                </Col>
            </Row>

            <Row className="mt-4 text-end">
                <Col xs={12}>
                    <Button onClick={() => generateClick()}>Generate</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default RandomString