import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import './RichFiles.css'
import { directoriesByParentId } from '../../api/richtext/ApiRichtextDir'

export function useRichFiles() {

    const [dirListHtml, setDirListHtml] = useState([])

    const [dirParentId, setDirParentId] = useState(0)
    const [dirParentName, setDirParentName] = useState(`/Home`)
    const [path, setPath] = useState(``)
    
    const [dirName, setDirName] = useState(``)    

    useEffect(() => {
        directoriesByParentId(dirParentId, reponse => {
            let html = []
            let list = reponse.data
            list.forEach((element, index) => {
                html.push(
                    <div key={element.rowid + `-` + index}>{element.name}</div>
                )
            })
            setDirListHtml(html)
        })
    }, [dirParentId])

    const html = (
        <div className='rich-fils'>
            <div>{dirParentName}</div>
            <div>
                <input type='text' value={dirName} onChange={(e) => setDirName(e.target.value)} />
                <button type='button'>Add</button>
            </div>
            <div>
                {dirListHtml}
            </div>
        </div>
    )

    return [html]
}