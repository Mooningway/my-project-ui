import { useState, useEffect } from "react"
import { rsaGenerateKey, rsaEncrypt, rsaDecrypt } from "../../api/rsa/ApiRsa";
import { isInt } from "../../js/common/Verify";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const modes = [`X509`]
const modeData = {
    "X509": { paddings: [`Pkcs1Padding`, `Pkcs8Padding`], defaultValue: `Pkcs8Padding` },
}
const outputEncodings = [`Hex`, `Base64`]

function Rsa() {
    const [bits, setBits] = useState(2048)
    const [privateKey, setPrivateKey] = useState(``)
    const [publicKey, setPublicKey] = useState(``)
    const [mode, setMode] = useState(`X509`)
    const [padding, setPadding] = useState(``)
    const [outputEncoding, setOutputEncoding] = useState(`Hex`)

    // Encrypt text
    const [publicKey1, setPublicKey1] = useState(``)
    const [originalText1, setOriginalText1] = useState(``)
    const [cipherText1, setCipherText1] = useState(``)

    // Decrypt text
    const [privateKey2, setPrivateKey2] = useState(``)
    const [originalText2, setOriginalText2] = useState(``)
    const [cipherText2, setCipherText2] = useState(``)

    const [paddings, setPaddings] = useState([])
    const [submitTips, setSubmitTips] = useState([])

    const [tabsActive, setTabsActive] = useState(`generateKey`)

    const rsaOperationt = (event) => {
        if (event === `encrypt`) {

        } else if (event === `decrypt`) {
        }
    }

    const encryptClick = () => {
        let msgArray = [...submitTips]
        if (!publicKey1 || publicKey1.length === 1) {
            msgArray.push({ msg: `public key is a required field`, bg: `danger` })
            setSubmitTips(msgArray)
            return
        }
        if (!originalText1 || originalText1.length === 0) {
            msgArray.push({ msg: `originalText is a required field`, bg: `danger` })
            setSubmitTips(msgArray)
            return
        }
        let data = {text: originalText1, publickey: publicKey1, outputEncoding: outputEncoding}
        rsaEncrypt(data, (response) => {
            if (response.code === `200`) {
                msgArray.push({ msg: response.msg, bg: `success` })
                setCipherText1(response.data)
            } else {
                msgArray.push({ msg: response.msg, bg: `danger` })
            }
            setSubmitTips(msgArray)
        })
    }

    const decryptClick = () => {
        let msgArray = [...submitTips]
        if (!privateKey2 || privateKey2.length === 2) {
            msgArray.push({ msg: `private key is a required field`, bg: `danger` })
            setSubmitTips(msgArray)
            return
        }
        if (!cipherText2 || cipherText2.length === 0) {
            msgArray.push({ msg: `cipherText is a required field`, bg: `danger` })
            setSubmitTips(msgArray)
            return
        }
        let data = {text: cipherText2, privateKey: privateKey2, pkcs: padding, outputEncoding: outputEncoding}
        rsaDecrypt(data, (response) => {
            if (response.code === `200`) {
                msgArray.push({ msg: response.msg, bg: `success` })
                setOriginalText2(response.data)
            } else {
                msgArray.push({ msg: response.msg, bg: `danger` })
            }
            setSubmitTips(msgArray)
        })
    }

    const rsaGenerateKeyClick = () => {
        let msgArray = [...submitTips]

        if (isInt(Number(bits)) === true) {
            if (Number(bits) < 12 || Number(bits) > 8192) {
                msgArray.push({ msg: `Rsa key size must be in the range 12-8192`, bg: `danger` })
                setSubmitTips(msgArray)
                return;
            }
        } else {
            msgArray.push({ msg: `Rsa key size must be in the range 12-8192`, bg: `danger` })
            setSubmitTips(msgArray)
            return;
        }

        let data = { bits: bits, pkcs: padding }
        rsaGenerateKey(data, (response) => {
            if (response.code === `200`) {
                msgArray.push({ msg: response.msg, bg: `success` })
                setPrivateKey(response.data.privateKey)
                setPublicKey(response.data.publicKey)
            } else {
                msgArray.push({ msg: response.msg, bg: `danger` })
            }
            setSubmitTips(msgArray)
        })
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
                    <li className="breadcrumb-item active">Rsa</li>
                </ol>
            </h4>

            <Row className="mt-3">
                <Col xs={2}><b>Mode</b></Col>
                <Col xs={3}><b>Padding</b></Col>
                <Col xs={3}><b>Output</b></Col>
            </Row>
            <Row className="mt-2">
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

            <Tabs className="mt-4" activeKey={tabsActive} onSelect={(k) => setTabsActive(k)}>
                <Tab eventKey="generateKey" title="Generate Key">
                    <Row className="mt-3">
                        <Col xs={2}><b>Rsa key size</b></Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={2}>
                            <Form.Control value={bits} onChange={(e) => setBits(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={6}><b>Private Key</b></Col>
                        <Col xs={6}><b>Public Key</b></Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={6}>
                            <Form.Control value={privateKey} as="textarea" rows={12} onChange={(e) => setPrivateKey(e.target.value)}></Form.Control>
                        </Col>
                        <Col xs={6}>
                            <Form.Control value={publicKey} as="textarea" rows={12} onChange={(e) => setPublicKey(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs={12} className="text-end">
                            <Button className="ms-4" onClick={() => rsaGenerateKeyClick()}>Generate Key</Button>
                        </Col>
                    </Row>
                </Tab>

                <Tab eventKey="encrypt" title="Encrypt">
                    <Row className="mt-3">
                        <Col xs={12}><b>Public Key</b></Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={12}>
                            <Form.Control value={publicKey1} as="textarea" rows={6} onChange={(e) => setPublicKey1(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={6}><b>OriginalText</b></Col>
                        <Col xs={6}><b>CipherText</b></Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={6}>
                            <Form.Control value={originalText1} as="textarea" rows={12} onChange={(e) => setOriginalText1(e.target.value)}></Form.Control>
                        </Col>
                        <Col xs={6}>
                            <Form.Control value={cipherText1} as="textarea" rows={12} onChange={(e) => setCipherText1(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs={12} className="text-end">
                            <Button className="ms-4" onClick={() => encryptClick()}>Encrypt</Button>
                        </Col>
                    </Row>
                </Tab>

                <Tab eventKey="decrypt" title="Decrypt">
                    <Row className="mt-3">
                        <Col xs={12}><b>Private Key</b></Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={12}>
                            <Form.Control value={privateKey2} as="textarea" rows={6} onChange={(e) => setPrivateKey2(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={6}><b>OriginalText</b></Col>
                        <Col xs={6}><b>CipherText</b></Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={6}>
                            <Form.Control value={originalText2} as="textarea" rows={12} onChange={(e) => setOriginalText2(e.target.value)}></Form.Control>
                        </Col>
                        <Col xs={6}>
                            <Form.Control value={cipherText2} as="textarea" rows={12} onChange={(e) => setCipherText2(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col xs={12} className="text-end">
                            <Button className="ms-4" onClick={() => decryptClick()}>Decrypt</Button>
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

export default Rsa