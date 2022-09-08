import { useState, useEffect } from "react"
import { rsaGenerateKey, rsaEncrypt, rsaDecrypt } from "../../api/rsa/ApiRsa";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from 'react-bootstrap/Toast';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const modes = { data: [`OAEP`, `PKCS1v15`], defaultValue: `OAEP` }
const keySizes = { data: [`512`, `1024`, `2048`, `4096`, `8192`], defaultValue: `2048` }
const keyFormats = { data: [`PKCS1`, `PKCS8`], defaultValue: `PKCS1` }
const textOutputs = { data: [`Hex`, `Base64`], defaultValue: `Hex` }
const hashes = { data: [`SHA1`, `SHA256`, `SHA512`, `MD5`], defaultValue: `SHA256` }

function Rsa() {
    // Rsa OAEP and Rsa PKCS1v15
    const [mode, setMode] = useState(modes.defaultValue)

    // Key
    const [bits, setBits] = useState(keySizes.defaultValue)
    const [keyFormat, setKeyFormat] = useState(keyFormats.defaultValue)
    const [privateKey, setPrivateKey] = useState(``)
    const [publicKey, setPublicKey] = useState(``)

    const [textOutput, setTextOutput] = useState(textOutputs.defaultValue)

    const [hash, setHash] = useState(hashes.defaultValue)
    const [label, setLabel] = useState(``)
    const [oaepFlag, setOaepFlag] = useState(true)

    // Encrypt text
    const [publicKey1, setPublicKey1] = useState(``)
    const [originalText1, setOriginalText1] = useState(``)
    const [cipherText1, setCipherText1] = useState(``)

    // Decrypt text
    const [privateKey2, setPrivateKey2] = useState(``)
    const [originalText2, setOriginalText2] = useState(``)
    const [cipherText2, setCipherText2] = useState(``)

    const [submitTips, setSubmitTips] = useState([])
    const [tabsActive, setTabsActive] = useState(`generateKey`)

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
        let data = {}
        if (mode === modes.defaultValue) {
            // OAEP
            data = { text: originalText1, publickey: publicKey1, textOutput: textOutput, mode: mode, hash: hash, label: label }
        } else {
            // PKCS1v15
            data = { text: originalText1, publickey: publicKey1, textOutput: textOutput, mode: mode }
        }
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
        let data = {}
        if (mode === modes.defaultValue) {
            // OAEP
            data = { text: cipherText2, privateKey: privateKey2, textOutput: textOutput, mode: mode, pkcs: keyFormat, hash: hash, label: label }
        } else {
            // PKCS1v15
            data = { text: cipherText2, privateKey: privateKey2, textOutput: textOutput, mode: mode, pkcs: keyFormat }
        }
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
        let data = { bits: Number(bits), keyFormat: keyFormat }
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
        if (mode === modes.defaultValue) {
            // OAEP
            setOaepFlag(true)
        } else {
            // PKCS1v15
            setOaepFlag(false)
        }
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
                <Col xs={3}><b>Mode</b></Col>
                <Col xs={3}><b>Key size</b></Col>
                <Col xs={3}><b>Key format</b></Col>
                <Col xs={3}><b>Text output</b></Col>
            </Row>
            <Row className="mt-2">
                <Col xs={3}>
                    <Form.Select value={mode} onChange={(e) => setMode(e.target.value)} autoComplete="off">
                        {modes.data.map((e) => {
                            return <option key={"mode-" + e} value={e}>{e}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select value={bits} onChange={(e) => setBits(e.target.value)}>
                        {keySizes.data.map((e) => {
                            return <option key={"keySizes-" + e} value={e}>{e}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select value={keyFormat} onChange={(e) => setKeyFormat(e.target.value)} autoComplete="off">
                        {keyFormats.data.map((e) => {
                            return <option key={"keyFormats-" + e} value={e}>{e}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={3}>
                    <Form.Select value={textOutput} onChange={(e) => setTextOutput(e.target.value)} autoComplete="off">
                        {textOutputs.data.map((e, i) => {
                            return <option key={"textOutputs-" + e} value={e}>{e}</option>
                        })}
                    </Form.Select>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs={3}><b>Hash</b></Col>
                <Col xs={9}><b>Label</b></Col>
            </Row>
            <Row className="mt-2">
                <Col xs={3}>
                    <Form.Select value={hash} onChange={(e) => setHash(e.target.value)} disabled={!oaepFlag}>
                        {hashes.data.map((e) => {
                            return <option key={"hashes-" + e} value={e}>{e}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={9}>
                    <Form.Control value={label} as="textarea" rows={3} onChange={(e) => setLabel(e.target.value)} disabled={!oaepFlag}></Form.Control>
                </Col>
            </Row>

            <Tabs className="mt-4" activeKey={tabsActive} onSelect={(k) => setTabsActive(k)}>
                <Tab eventKey="generateKey" title="Generate Key">
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
                            <Form.Control value={publicKey1} as="textarea" rows={3} onChange={(e) => setPublicKey1(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={6}><b>OriginalText</b></Col>
                        <Col xs={6}><b>CipherText</b></Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={6}>
                            <Form.Control value={originalText1} as="textarea" rows={8} onChange={(e) => setOriginalText1(e.target.value)}></Form.Control>
                        </Col>
                        <Col xs={6}>
                            <Form.Control value={cipherText1} as="textarea" rows={8} onChange={(e) => setCipherText1(e.target.value)}></Form.Control>
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
                            <Form.Control value={privateKey2} as="textarea" rows={3} onChange={(e) => setPrivateKey2(e.target.value)}></Form.Control>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col xs={6}><b>CipherText</b></Col>
                        <Col xs={6}><b>OriginalText</b></Col>
                    </Row>
                    <Row className="mt-2">
                        <Col xs={6}>
                            <Form.Control value={cipherText2} as="textarea" rows={8} onChange={(e) => setCipherText2(e.target.value)}></Form.Control>
                        </Col>
                        <Col xs={6}>
                            <Form.Control value={originalText2} as="textarea" rows={8} onChange={(e) => setOriginalText2(e.target.value)}></Form.Control>
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