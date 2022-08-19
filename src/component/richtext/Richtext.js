import React, { useEffect, useReducer, useRef, useState } from 'react'
import Quill from 'quill'
import { useRichFiles } from './RichFiles'
import { verifyInt } from '../../js/common/Verify'
import './Richtext.css'

/**
 * toolbar（工具條）
 * https://quilljs.com/docs/modules/toolbar/
 */
const quillConfig = {
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'header': 1 }, { 'header': 2 }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
            [{ 'align': [] }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            // [{ 'font': [] }],
            // [{ 'color': [] }, { 'background': [] }],
            // [{ size: [ 'small', false, 'large', 'huge' ]}],
            // [{ 'direction': 'rtl' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            ['link', 'image'],
            ['clean'],
            // ['table', 'column-left', 'column-right', 'row-above', 'row-below', 'row-remove', 'column-remove']
        ],
        table: true
    },
    theme: 'snow',
}

function Richtext() {

    const [filesHtml] = useRichFiles()

    // 富文本引用對象
    const editorRef = useRef(null)
    // 富文本源內容
    const [submitText, setSubmitText] = useState(``)
    const [textSource, setTextSource] = useState(``)
    const [textElement, setTextElement] = useState({})
    
    // 表格管理 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // 表格對象
    const [table, setTable] = useState({})
    // 增加表格行數
    const [rows, rowsDispatch] = useReducer((state, action) => {
        let val =  action.val
        val = val.toString().replace(/[^\d.-]/g, ``)
        state.val = val === `` ? val : verifyInt(action.val, 1, 10, 2)
        return { ...state }
    }, {val: 2})
    // 增加表格列數
    const [cols, colsDispatch] = useReducer((state, action) => {
        let val =  action.val
        val = val.toString().replace(/[^\d.-]/g, ``)
        state.val = val === `` ? val : verifyInt(action.val, 1, 10, 3)
        return { ...state }
    }, {val: 3})

    // 增加表格
    const tableInsert = () => {
        let r = rows.val === `` || isNaN(rows.val) ? 2 : rows.val
        let c = cols.val === `` || isNaN(cols.val) ? 3 : cols.val
        table.insertTable(r, c)
        rowsDispatch({val: r})
        colsDispatch({val: c})
    }
    // 在當行前增加一行
    const tableInsertRowAbove = () => {
        table.insertRowAbove()
    }
    // 在當行後增加一行
    const tableInsertRowBelow = () => {
        table.insertRowBelow()
    }
    // 在當列左側增加一列
    const tableInsertColumnLeft = () => {
        table.insertColumnLeft()
    }
    // 在當列右側增加一列
    const tableInsertColumnRight = () => {
        table.insertColumnRight()
    }
    // 刪除行
    const tableDeleteRow = () => {
        table.deleteRow()
    }
    // 刪除列
    const tableDeleteColumn = () => {
        table.deleteColumn()
    }
    // 刪除表格
    const tableDelete = () => {
        table.deleteTable()
    }
    // 表格管理 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    const submit = () => {
        textElement.innerHTML = `123`
    }
    
    // 加載富文本組件
    useEffect(() => {
        // 富文本組件對象
        const quill = new Quill(editorRef.current, quillConfig)

        // 富文本表格組件
        const table = quill.getModule('table')
        setTable(table)
        setTextElement(quill.container.firstChild)

        // 富文本內容變化監聽
        quill.on(`text-change`, () => {
            setSubmitText(quill.container.firstChild.innerHTML)
        })
    }, [])

    return (
        <div className='rich'>
            <div className='rich-operation'>
                <div className='rich-operation-item'>
                    <label className='rich-title-label'>Title</label>
                    <input type='text' className='rich-title-input' />
                    <button type='button' className='rich-submit' onClick={() => submit()}>Submit</button>
                </div>
                <div className='rich-operation-item'>
                    <label className='rich-table-label'>Tables</label>
                    <button type='button' className='rich-table-button' onClick={() => tableInsert()}>It</button>
                    <label className='rich-table-label'>Rows</label>
                    <input type='text' className='rich-table-rowcol' value={rows.val} onChange={(e) => rowsDispatch({val: e.target.value})} />
                    <label className='rich-table-label'>Cols</label>
                    <input type='text' className='rich-table-rowcol' value={cols.val} onChange={(e) => colsDispatch({val: e.target.value})} />
                    <button type='button' className='rich-table-button' onClick={() => tableInsertRowAbove()}>Ira</button>
                    <button type='button' className='rich-table-button' onClick={() => tableInsertRowBelow()}>Irb</button>
                    <button type='button' className='rich-table-button' onClick={() => tableInsertColumnLeft()}>Icl</button>
                    <button type='button' className='rich-table-button' onClick={() => tableInsertColumnRight()}>Icr</button>
                    <button type='button' className='rich-table-button' onClick={() => tableDeleteRow()}>Dr</button>
                    <button type='button' className='rich-table-button' onClick={() => tableDeleteColumn()}>Dc</button>
                    <button type='button' className='rich-table-button' onClick={() => tableDelete()}>Dt</button>
                </div>
                
            </div>
            <div ref={editorRef} className='rich-editor'></div>

            { filesHtml }
        </div>
    )
}

export default Richtext