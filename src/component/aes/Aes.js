import { useState, useEffect } from "react"
import { aesEncrypt, aesDecrypt } from "../../api/aes/ApiAes";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const modes = [`GCM`]
const modeData = {
    "GCM": { paddings: [`nopadding`], defaultValue: `nopadding` }
}
const outputEncodings = [`Hex`, `Base64`]

function Aes() {
    const [key, setKey] = useState(``)
    const [nonce, setNonce] = useState(``)
    const [mode, setMode] = useState(`GCM`)
    const [padding, setPadding] = useState(``)
    const [outputEncoding, setOutputEncoding] = useState(`Hex`)

    // Encrypt text
    const [originalText, setOriginalText] = useState(``)
    const [cipherText, setCipherText] = useState(``)

    // Decrypt text

    const [originalText1, setOriginalText1] = useState(``)
    const [cipherText1, setCipherText1] = useState(``)

    const [paddings, setPaddings] = useState([])
    const [submitTips, setSubmitTips] = useState([])

    const [tabsActive, setTabsActive] = useState(`encrypt`)

    const aseOperationt = (event) => {
        let msgArray = [...submitTips]
        if (!key && key.length === 0) {
            msgArray.push({ msg: `key is a required field`, bg: `danger` })
            setSubmitTips(msgArray)
            return
        }

        if (key.length !== 16 && key.length !== 16 && key.length !== 16) {
            msgArray.push({ msg: `key length must be 16/24/32`, bg: `danger` })
            setSubmitTips(msgArray)
            return
        }

        if (!nonce && nonce.length === 0) {
            msgArray.push({ msg: `nonce is a required field`, bg: `danger` })
            setSubmitTips(msgArray)
            return
        }

        if (event === `encrypt`) {
            if (!originalText && originalText.length === 0) {
                msgArray.push({ msg: `originalText is a required field`, bg: `danger` })
                setSubmitTips(msgArray)
                return
            }

            let data = { key: key, text: originalText, mode: mode, nonce: nonce, padding: padding, outputEncoding: outputEncoding }
            aesEncrypt(data, response => {
                if (response.code === `200`) {
                    setCipherText(response.data)
                    msgArray.push({ msg: response.msg, bg: `success` })
                } else {
                    msgArray.push({ msg: response.msg, bg: `danger` })
                }
                setSubmitTips(msgArray)
            })

        } else if (event === `decrypt`) {
            if (!cipherText1 && cipherText1.length === 0) {
                msgArray.push({ msg: `cipherText is a required field`, bg: `danger` })
                setSubmitTips(msgArray)
                return
            }

            let data = { key: key, text: cipherText1, mode: mode, nonce: nonce, padding: padding, outputEncoding: outputEncoding }
            aesDecrypt(data, response => {
                if (response.code === `200`) {
                    setOriginalText1(response.data)
                    msgArray.push({ msg: response.msg, bg: `success` })
                } else {
                    msgArray.push({ msg: response.msg, bg: `danger` })
                }
                setSubmitTips(msgArray)
            })
        }
    }
    
    useEffect(() => {
        setPaddings(modeData[mode].paddings)
        setPadding(modeData[mode].defaultValue)
    }, [mode])

    useEffect(() => {
        const timer = setInterval(() => {
            let msgArray = [...submitTips]
            if (msgArray && msgArray.length > 0) {
                msgArray.splice(0, 1)
                setSubmitTips(msgArray)
            }
        }, 2000)

        return () => {
            clearInterval(timer)
        }
    }, [submitTips])

    return (
        <Form className="me-box">
            <h4 className="mt-3 mb-5">
                <ol className="breadcrumb bold">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Aes</li>
                </ol>
            </h4>

            <Row className="mt-3">
                <Col xs={4}><b>Key</b></Col>
                <Col xs={2}><b>Mode</b></Col>
                <Col xs={3}><b>Padding</b></Col>
                <Col xs={3}><b>Output</b></Col>
            </Row>
            <Row className="mt-2">
                <Col xs={4}>
                    <Form.Control value={key} onChange={(e) => setKey(e.target.value)} autoComplete="off" />
                </Col>
                <Col xs={2}>
                    <Form.Select value={mode} onChange={(e) => setMode(e.target.value)} autoComplete="off">
                        {modes.map((e, i) => {
                            return <option key={"mode-" + e} value={e}>{e}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select value={padding} onChange={(e) => setPadding(e.target.value)} autoComplete="off">
                        {paddings.map((e, i) => {
                            return <option key={"padding-" + e} value={e}>{e}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select value={outputEncoding} onChange={(e) => setOutputEncoding(e.target.value)} autoComplete="off">
                        {outputEncodings.map((e, i) => {
                            return <option key={"outputEncoding-" + e} value={e}>{e}</option>
                        })}
                    </Form.Select>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs={12}><b>Nonce / IV</b></Col>
            </Row>
            <Row className="mt-2">
                <Col xs={12}>
                    <Form.Control as="textarea" rows={2} value={nonce} onChange={(e) => setNonce(e.target.value)}></Form.Control>
                </Col>
            </Row>

            <Tabs className="mt-4" activeKey={tabsActive} onSelect={(k) => setTabsActive(k)}>
                <Tab eventKey="encrypt" title="Encrypt">
                    <Row className="mt-3">
                        <Col xs={6}><b>OriginalText</b></Col>
                        <Col xs={6}><b>Ciphertext</b></Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={6}>
                            <Form.Control as="textarea" rows={12} value={originalText} onChange={(e) => setOriginalText(e.target.value)}></Form.Control>
                        </Col>
                        <Col xs={6}>
                            <Form.Control as="textarea" rows={12} value={cipherText} onChange={(e) => setCipherText(e.target.value)}></Form.Control>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col xs={12} className="text-end">
                            <Button onClick={() => aseOperationt(`encrypt`)}>Encrypt</Button>
                        </Col>
                    </Row>
                </Tab>

                <Tab eventKey="decrypt" title="Decrypt">
                <Row className="mt-3">
                        <Col xs={6}><b>OriginalText</b></Col>
                        <Col xs={6}><b>Ciphertext</b></Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={6}>
                            <Form.Control as="textarea" rows={12} value={originalText1} onChange={(e) => setOriginalText1(e.target.value)}></Form.Control>
                        </Col>
                        <Col xs={6}>
                            <Form.Control as="textarea" rows={12} value={cipherText1} onChange={(e) => setCipherText1(e.target.value)}></Form.Control>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col xs={12} className="text-end">
                            <Button className="ms-4" onClick={() => aseOperationt(`decrypt`)}>Decrypt</Button>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>

            <div className="mt-5 me-3 position-absolute top-0 end-0">
                {submitTips.map((e, i) => {
                    return (
                        <Toast key={e.msg + "-" + i} className="mb-1 text-white" bg={e.bg}>
                            <Toast.Body>{e.msg}</Toast.Body>
                        </Toast>
                    )
                })}
            </div>
        </Form>
    )
}

export default Aes