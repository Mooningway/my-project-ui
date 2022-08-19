import { useState } from "react"
import { md5Encryption } from "../../api/md5/ApiMd5"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function MD5() {
    const [source, setSource] = useState(``)
    const [result, setResult] = useState(``)

    const encryptionClick = () => {
        md5Encryption({ source, source }, response => {
            setResult(response.data)
        })
    }

    return (
        <div className="me-box">
            <h4 className="mt-3 mb-5">
                <ol className="breadcrumb bold">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">MD5</li>
                </ol>
            </h4>

            <Row>
                <Col xs={5}><b>Source</b></Col>
                <Col xs={2}></Col>
                <Col xs={5}><b>Result</b></Col>
            </Row>

            <Row className="mt-3">
                <Col xs={5}>
                    <Form.Control type="text" as="textarea" rows={12} value={source} onChange={(e) => setSource(e.target.value)} autoComplete="off"></Form.Control>
                </Col>
                <Col xs={2} className="text-center">
                    <Button variant="primary" onClick={() => encryptionClick()}>Encrypte</Button>
                </Col>
                <Col xs={5}>
                    <Form.Control type="text" as="textarea" rows={12} value={result} onChange={(e) => setResult(e.target.value)} autoComplete="off"></Form.Control>
                </Col>
            </Row>
        </div>
    )
}

export default MD5