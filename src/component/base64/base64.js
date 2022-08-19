import { useState, useEffect, useRef, useCallback } from "react"
import { base64Encryption, base64Decryption, base64EncryptionImage } from "../../api/base64/ApiBase64"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Base64() {
    const [source, setSource] = useState(``)
    const [result, setResult] = useState(``)
    const [fileName, setFileName] = useState(``)

    const fileRef = useRef()

    const encryptionClick = () => {
        base64Encryption({ source: source }, response => {
            setResult(response.data)
        })
    }

    const decryptionClick = () => {
        base64Decryption({ source: result }, response => {
            setSource(response.data)
        })
    }

    const uploadFileClick = () => {
        fileRef.current.click()
    }

    const uploadFileChange = (e) => {
        let file = fileRef.current.files[0]
        setFileName(` (File name: ` + file.name + `)`)

        let formData = new FormData()
        formData.append(`file`, file)        

        base64EncryptionImage(formData, response => {
            setResult(response.data)
        })
    }

    const resetClick = () => {
        setResult(``)
        setSource(``)
        fileRef.current.value = ``
        setFileName(``)
    }

    return (
        <div className="me-box">
            <h4 className="mt-3 mb-5">
                <ol className="breadcrumb bold">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Base64</li>
                </ol>
            </h4>

            <Row>
                <Col xs={5}><b>Source</b></Col>
                <Col xs={2}></Col>
                <Col xs={5}><b>Result {fileName}</b></Col>
            </Row>

            <Row className="mt-3">
                <Col xs={5}>
                    <Form.Control type="text" as="textarea" rows={20} value={source} onChange={(e) => setSource(e.target.value)} autoComplete="off"></Form.Control>
                </Col>
                <Col xs={2} className="text-center">
                    <div className="mt-5"><Button variant="primary" onClick={() => encryptionClick()}>&gt;&gt;</Button></div>
                    <div className="mt-5"><Button variant="primary" onClick={() => decryptionClick()}>&lt;&lt;</Button></div>
                    <div className="mt-5">
                        <Button variant="primary" onClick={() => uploadFileClick()}>UploadFile</Button>
                        <Form.Control className="d-none" ref={fileRef} type="file" accept="image/png, image/jpeg, image/jpg, image/gif, image/svg" onChange={(e) => uploadFileChange(e)} autoComplete="off"></Form.Control>
                    </div>
                    <div className="mt-5"><Button variant="primary" onClick={() => resetClick()}>Reset</Button></div>
                </Col>
                <Col xs={5}>
                    <Form.Control type="text" as="textarea" rows={20} value={result} onChange={(e) => setResult(e.target.value)} autoComplete="off"></Form.Control>
                </Col>
            </Row>
        </div>
    )
}

export default Base64