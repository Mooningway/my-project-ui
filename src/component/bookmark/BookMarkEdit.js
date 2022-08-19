import { useState, useEffect, useReducer } from "react"
import { verifyInt } from '../../js/common/Verify'
import { bookmarmById, bookmarkSave, bookmarkDelete } from '../../api/bookmark/ApiBookmark'
import { bookmarkTagAll } from '../../api/bookmark/ApiBookmarkTag'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';

const useBookmarkEdit = (options = { "operate": ``, "editFlag": false, id0: `` }, callback) => {
    const [tagList, setTagList] = useState([])

    const [id, setId] = useState(``)
    const [name, setName] = useState(``)
    const [tag, setTag] = useState(``)
    const [link, setLink] = useState(``)
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
                bookmarmById(options.id0, reponse => {
                    let data = reponse.data
                    setId(data.rowid)
                    setName(data.name)
                    setTag(data.tag)
                    setLink(data.link)
                    setDescription(data.description)
                    sortDispatch({ val: data.sort })
                })
            } else {
                // To insert
                setId(``)
                setName(``)
                setTag(``)
                setLink(``)
                setDescription(``)
                sortDispatch({ val: `0` })

                setSubmitResult()
            }

            bookmarkTagAll(reponse => {
                setTagList(reponse.data)
            })
        }
    }, [options.id0, options.editFlag])

    const setSubmitResult = (code = 0, msg = ``, style = ``) => {
        let data = { "code": code, "msg": msg, style: style }
        submitResultDispatch(data)
    }

    const submit = () => {
        if (submitFlag === true) {
            setSubmitFlag(false)

            if (options.operate === `Insert` || options.operate === `Update`) {
                let data = { name: name, tag: tag, link: link, description: description, sort: sort.val }
                data.rowid = options.operate === `Insert` ? `` : id
                bookmarkSave(data, reponse => {
                    submitAfter(reponse.code, reponse.msg, true)
                })
            } else if (options.operate === `Delete`) {
                bookmarkDelete(id, reponse => {
                    submitAfter(reponse.code, reponse.msg, true)
                })
            }
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
        setTagList([])
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
                    <Col xs={1} className="text-end">Tag</Col>
                    <Col xs={4}>
                        <Form.Select value={tag} onChange={e => setTag(e.target.value)} disabled={options.operate === `Delete`} autoComplete='off'>
                            <option key="tag-list" value=""></option>
                            {tagList.map((e, i) => {
                                return <option key={"tag-list-" + i} value={e.name}>{e.name}</option>
                            })}
                        </Form.Select>
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
                    <Col xs={1}>Link</Col>
                    <Col xs={9}>
                        <Form.Control type="text" as="textarea" value={link} rows={3} onChange={e => setLink(e.target.value)} disabled={options.operate === `Delete`} autoComplete='off'></Form.Control>
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

export default useBookmarkEdit