import { useState, useEffect, useReducer } from "react"
import { verifyInt } from '../../js/common/Verify'
import { bookmarmTagById, bookmarkTagSave, bookmarkTagDelete } from '../../api/bookmark/ApiBookmarkTag'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';

const useBookmarkTagEdit = (options = { "operate": ``, "editFlag": false, id0: `` }, callback) => {
    const [id, setId] = useState(``)
    const [name, setName] = useState(``)
    const [tag, setTag] = useState(``)
    const [description, setDescription] = useState(``)
    const [sort, sortDispatch] = useReducer((state, action) => {
        state.val = verifyInt(action.val, 0, 999, 0)
        return { ...state }
    }, { val: `0` })

    const [submitFlag, setSubmitFlag] = useState(true)
    const [submitResult, submitResultDispatch] = useReducer((state, action) => {
        return { ...state, ...action }
    }, { "code": 0, "msg": ``, style: `` })

    useEffect(() => {
        if (options.editFlag === true) {
            if (options.id0 && Number(options.id0) > 0) {
                // To update or delete
                bookmarmTagById(options.id0, reponse => {
                    let data = reponse.data
                    setId(data.rowid)
                    setName(data.name)
                    setTag(data.tag)
                    setDescription(data.description)
                    sortDispatch({ val: data.sort })
                })
            } else {
                // To insert

                setId(``)
                setName(``)
                setTag(``)
                setDescription(``)
                sortDispatch({ val: `0` })

                setSubmitResult()
            }
        }
    }, [options.id0, options.editFlag])

    const setSubmitResult = (code = 0, msg = ``, style = ``) => {
        let data = { "code": code, "msg": msg, style: style }
        submitResultDispatch(data)
    }

    const submit = () => {
        if (submitFlag === true) {
            setSubmitFlag(false)
        }

        if (options.operate === `Insert` || options.operate === `Update`) {
            let data = { name: name, tag: tag, description: description, sort: sort.val }
            data.rowid = options.operate === `Insert` ? `` : id
            bookmarkTagSave(data, reponse => {
                submitAfter(reponse.code, reponse.msg, true)
            })
        } else if (options.operate === `Delete`) {
            bookmarkTagDelete(id, reponse => {
                submitAfter(reponse.code, reponse.msg, true)
            })
        }
    }

    const submitAfter = (code, msg, refreshAll) => {
        if (200 !== Number(code)) {
            setSubmitResult(code, msg, `danger`)
            setTimeout(() => {
                setSubmitFlag(true)
            }, 2000)
        } else {
            setSubmitResult(code, msg, `success`)
            setTimeout(() => {
                setSubmitResult()
                if (200 === Number(code)) {
                    callback(true, refreshAll)
                }
                setSubmitFlag(true)
            }, 2000)
        }
    }

    const cancel = () => {
        callback(false, false)
    }

    let operateStyle = `success`
    if (options.operate === `Update`) {
        operateStyle = `primary`
    } else if (options.operate === `Delete`) {
        operateStyle = `danger`
    }

    if (options.editFlag === true) {
        const html = (
            <Form>
                <Alert variant={submitResult.style}>{submitResult.msg}</Alert>
                <Row className="mt-4">
                    <Col xs={1} className="text-end">ID</Col>
                    <Col xs={4}>
                        <Form.Control type="text" value={id} onChange={e => setId(e.target.value)} disabled autoComplete="off" />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={1} className="text-end">Name</Col>
                    <Col xs={4}>
                        <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} disabled={options.operate === `Delete`} autoComplete="off" />
                    </Col>
                    <Col xs={1} className="text-end">Sort</Col>
                    <Col xs={2}>
                        <Form.Control type="text" value={sort.val} className="text-center" onChange={e => sortDispatch({ val: e.target.value })} disabled={options.operate === `Delete`} autoComplete="off" />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col xs={1}>Description</Col>
                    <Col xs={9}>
                        <Form.Control type="text" as="textarea" value={description} rows={5} onChange={e => setDescription(e.target.value)} disabled={options.operate === `Delete`} autoComplete='off'></Form.Control>
                    </Col>
                </Row>
                <Row className={submitFlag === true ? `mt-5` : `mt-5 d-none`}>
                    <Col xs={{ span: 4, offset: 4 }}>
                        <Button variant={operateStyle} className="me-5" onClick={() => submit()}>{options.operate}</Button>
                        <Button variant="secondary" className="ms-5" onClick={() => cancel()}>Cancel</Button>
                    </Col>
                </Row>
            </Form>
        )

        return [html]
    }

    return [``]
}

export default useBookmarkTagEdit