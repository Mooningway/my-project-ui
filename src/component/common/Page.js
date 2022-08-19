import Pagination from 'react-bootstrap/Pagination';
import Alert from 'react-bootstrap/Alert';

const usePage = (page = 1, totalPage = 1, callback) => {
    if (totalPage === 0) {
        return [<Alert variant="secondary" className='text-center'>No Data</Alert>]
    } else if (totalPage === 1) {
        return [``]
    }

    const prev = page - 1 <= 1 ? 1 : page - 1
    const next = page + 1 >= totalPage ? totalPage : page + 1

    let i
    let iMax
    let pageList = []
    if (totalPage <= 5 || (totalPage > 5 && page <= 3)) {
        i = 1
        iMax = totalPage <= 5 ? totalPage : 5
    } else {
        let iMid = page + 2 >= totalPage ? totalPage - 2 : page
        i = iMid - 2
        iMax = iMid + 2
    }
    for (; i <= iMax; i++) {
        pageList.push(i)
    }

    let moreHtml1
    let moreHtml2
    if (totalPage >= 20 && page - 10 > 1) {
        moreHtml1 = (
            <>
                <Pagination.Item onClick={() => callback(page - 1)}>{page - 1}</Pagination.Item>
                <Pagination.Ellipsis />
            </>
        )
    }
    if (totalPage >= 20 && page + 10 <= totalPage) {
        moreHtml2 = (
            <>
                <Pagination.Ellipsis />
                <Pagination.Item onClick={() => callback(page + 1)}>{page + 1}</Pagination.Item>
            </>
        )
    }

    const html = (
        <Pagination>
            <Pagination.First onClick={() => callback(1)} />
            <Pagination.Prev onClick={() => callback(prev)} />
            {moreHtml1}
            {pageList.map((e, i) => {
                if (Number(page) === Number(e)) {
                    return <Pagination.Item key={e} active>{e}</Pagination.Item>
                } else {
                    return <Pagination.Item key={e} onClick={() => callback(e)}>{e}</Pagination.Item>
                }
            })}
            {moreHtml2}
            <Pagination.Next onClick={() => callback(next)} />
            <Pagination.Last onClick={() => callback(totalPage)} />
        </Pagination>
    )
    return [html]
}

export default usePage