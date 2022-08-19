import { useState, useEffect, useReducer, useMemo } from "react"
import { bookmarkTagAll } from "../../api/bookmark/ApiBookmarkTag"
import { bookmarkPage } from "../../api/bookmark/ApiBookmark"
import useBookmarkEdit from "./BookMarkEdit"
import usePage from "../common/Page";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

function Bookmark() {
    // Search about
    const [keyword1, setKeyword1] = useState(``)
    const [tag1, setTag1] = useState(``)

    // Page
    const [page1, setPage1] = useState(1)
    const pageSize1 = 10
    const [totalPage1, setTotalPage] = useState(1)

    // Bookmarks
    const [searchFlag, setSearchFlag] = useState(true)
    const [list, setList] = useState([])

    // Bookmark tags
    const [tags, setTags] = useState([])

    const [pageHtml] = usePage(page1, totalPage1, (cbPage) => {
        setPage1(cbPage)
        setSearchFlag(true)
    })

    // Edit bookmark
    const [editOptions, editOptionsDispatch] = useReducer((state, action) => {
        return { ...state, ...action }
    }, { "operate": "", "editFlag": false, "id0": `` })

    const [editHtml] = useBookmarkEdit(editOptions, (refresh, refreshAll) => {
        setEdtionOptions() // Reset editHtml
        if (true === refresh && false === refreshAll) {
            setSearchFlag(true)
        } else if (true === refresh && true === refreshAll) {
            setPage1(1)
            setSearchFlag(true)
        }
    })

    useMemo(() => {
        bookmarkTagAll(response => {
            setTags(response.data)
        })
    }, [])

    useEffect(() => {
        if (true === searchFlag) {
            bookmarkPage({
                keyword: keyword1,
                tag: tag1,
                page: page1,
                pageSize: pageSize1
            }, response => {
                let bookmarks = response.data
                if (!bookmarks) {
                    bookmarks = []
                }
                setList(bookmarks)

                setPage1(response.page)
                setTotalPage(response.lastPage)

                setSearchFlag(false)
            })
        }

    }, [searchFlag, keyword1, tag1, page1])

    const queryByTag = (tag) => {
        setTag1(tag)
        setPage1(1)
        setSearchFlag(true)
    }

    const setEdtionOptions = (operate = ``, editFlag = false, id = ``) => {
        let data = { "operate": operate, "editFlag": editFlag, "id0": id }
        editOptionsDispatch(data)
    }

    const toInsert = () => {
        setEdtionOptions(`Insert`, true)
    }

    const toUpdate = (id) => {
        setEdtionOptions(`Update`, true, id)
    }

    const toDelete = (id) => {
        setEdtionOptions(`Delete`, true, id)
    }

    const searchClick = () => {
        setPage1(1)
        setSearchFlag(true)
    }

    const resetClick = () => {
        setKeyword1(``)
        setTag1(``)
        searchClick()
    }

    return (
        <div className="me-box">
            <h4 className="mt-3 mb-5">
                <ol className="breadcrumb bold">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Bookmark Manager</li>
                </ol>
            </h4>

            <Row className={editOptions.editFlag === true ? "d-none" : ""}>
                <Col xs={1}>
                    <Button variant="primary" onClick={() => toInsert(true)}>Add</Button>
                </Col>
                <Col xs={9}>
                    <Form.Control type="text" value={keyword1} onChange={e => setKeyword1(e.target.value)} autoComplete="off" />
                </Col>
                <Col xs={1}>
                    <Button variant="primary" onClick={() => searchClick()}>Search</Button>
                </Col>
                <Col xs={1}>
                    <Button variant="primary" onClick={() => resetClick()}>Reset</Button>
                </Col>
            </Row>

            <Row className={editOptions.editFlag === true ? "d-none" : "mt-5"}>
                <Col xs={4}>
                    <Button size="sm" className="me-4 mb-4" variant={tag1 === "" ? "danger" : "dark"} onClick={() => queryByTag(``)}>All</Button>
                    {tags.map((e, i) => {
                        return <Button size="sm" key={e.name + "-" + i} className="me-4 mb-4" variant={tag1 === e.name ? "danger" : "dark"} onClick={() => queryByTag(e.name)}>{e.name}</Button>
                    })}
                </Col>
                <Col xs={8}>
                    <Table hover striped>
                        <thead>
                            <tr>
                                <th className="text-center">Name</th>
                                <th className="text-center">Tag</th>
                                <th className="text-center">Sort</th>
                                <th className="text-center">Operate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((e, i) => {
                                return (
                                    <tr key={e.rowid}>
                                        <td className="text-center">{e.name}</td>
                                        <td className="text-center">{e.tag}</td>
                                        <td className="text-center">{e.sort}</td>
                                        <td className="text-center">
                                            <Button size="sm" variant="success" className="me-3" href={e.link} target="_blank">GO</Button>
                                            <Button size="sm" variant="primary" className="me-3" onClick={() => toUpdate(e.rowid)} >Edit</Button>
                                            <Button size="sm" variant="danger" onClick={() => toDelete(e.rowid)} >Del</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <Row className="mt-4">
                        <Col xs={list.length === 0 ? { span: 0, offset: 0 } : { span: 0, offset: 4 }}>{pageHtml}</Col>
                    </Row>
                </Col>
            </Row>

            {editHtml}
        </div>
    )
}

export default Bookmark