import { useState, useEffect, useMemo } from 'react'
import { bookmarkTagAll  } from '../../api/bookmark/ApiBookmarkTag'
import { bookmarkByTag  } from '../../api/bookmark/ApiBookmark'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function BookmarkIndex() {
    // Engine
    const [engines] = useState(
        [
            { key: `bing`, name: `Bing`, url: `https://www.bing.com`, search: `/search?q=` },
            { key: `baidu`, name: `Baidu`, url: `https://www.baidu.com`, search: `/s?wd=` },
        ]
    )
    const [engineMap] = useState(new Map())

    const [engine, setEngine] = useState(`bing`)
    const [keyword, setKeyword] = useState(``)
    const [goto, setGoto] = useState(``)

    // Bookmark tags
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState(``)

    // Bookmarks
    const [items, setItems] = useState([])
    
    // Engine event and Bookmark tags event
    useMemo(() => {
        engines.forEach((e) => {
            engineMap.set(e.key, e)
        })

        bookmarkTagAll(response => {
            setTags(response.data)
        })
    }, [engineMap, engines])

    useEffect(() => {
        const array = []
        const item = engineMap.get(engine)
        array.push(item.url)
        if (`` !== keyword) {
            array.push(item.search)
            array.push(keyword)
        }
        setGoto(array.join(``))
    }, [engine, keyword, engineMap])

    // Bookmark tags event
    useEffect(() => {
        // Load bookmars
        if (tag && `` !== tag) {
            bookmarkByTag(tag, response => {
                setItems(response.data)
            })
        }
    }, [tag])

    return (
        <>
            <Row className='mt-5'></Row>
            <Row className='mt-5'>
                <Col xs={2}>
                    <Form.Select value={engine} onChange={(e) => setEngine(e.target.value)}>
                        { engines.map((e, i) => {
                            return <option key={e.key + `-` + i} value={e.key}>{ e.name }</option>
                        }) }
                    </Form.Select>
                </Col>
                <Col xs={8}>
                    <Form.Control type='text' value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                </Col>
                <Col xs={2}>
                    <Button href={goto} target='_blank'>GO</Button>
                </Col>
            </Row>

            <Row className='mt-5'>
                <Col xs={12}>
                    { tags.map((e, i) => {
                        return <Button key={e.name + '-' + i} className={tag === e.name ? 'btn-danger me-4 mb-4' : 'btn-dark me-4 mb-4'} onClick={() => setTag(e.name)}>{ e.name }</Button>
                    }) }
                </Col>
                <Col xs={12} className='mt-5'>
                    { items.map((e, i) => {
                        return <Button key={e.name + '-' + i} href={e.link} className='btn-success btn-sm me-4 mb-4' target='_blank'>{ e.name }</Button>
                    }) }
                </Col>
            </Row>
        </>
    )
}

export default BookmarkIndex