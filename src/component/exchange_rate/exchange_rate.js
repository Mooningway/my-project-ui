import { useState, useEffect } from "react"
import { exchangeRateCodeAll, exchangeRateRateData, exchangeRateConvert, exchangeRateRateDataUpdate, exchangeRateRateDataDelete } from "../../api/exchange_rate/ApiExchangeRate"
import useAlerts from "../common/Alerts"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';

function ExchangeRate() {

    const [amount, setAmount] = useState(`100`)
    const [fromCode, setFromCode] = useState(`USD`)
    const [toCode, setToCode] = useState(`JPY`)
    const [dataCode, setDataCode] = useState(`USD`)
    const [refresh, setRefresh] = useState(true)

    const [codes, setCodes] = useState([])
    const [rateData, setRateData] = useState([])

    const [convertMsg, setConvertMsg] = useState(``)
    const [convertStyle, setConvertStyle] = useState(``)
    const [convertAlertsHtml] = useAlerts(convertMsg, convertStyle)

    const [rateDataMsg, setRateDataMsg] = useState(``)
    const [rateDataStyle, setRateDataStyle] = useState(``)
    const [rateDataAlertsHtml] = useAlerts(rateDataMsg, rateDataStyle)

    useEffect(() => {
        if (refresh === true) {
            exchangeRateCodeAll((response) => {
                let temps = response.data
                if (!temps) {
                    temps = []
                } else {
                    temps = JSON.parse(temps)
                }
                setCodes(temps)
            })

            exchangeRateRateData((response) => {
                let temps = response.data
                if (!temps) {
                    temps = []
                } else {
                    temps = JSON.parse(temps)
                }
                setRateData(temps)
            })

            setRefresh(false)
        }
    }, [refresh])

    const convertClick = () => {
        exchangeRateConvert({fromCode: fromCode, toCode: toCode, amount: amount}, response => {
            let msg = `200` === response.code ? `success` : `danger`
            setConvertStyle(msg)
            setConvertMsg(response.msg)
        })
    }

    const updateRateDataClick = () => {
        exchangeRateRateDataUpdate(dataCode, response => {
            let msg = `200` === response.code ? `success` : `danger`
            setRateDataStyle(msg)
            setRateDataMsg(response.msg)

            setTimeout(() => {
                setRateDataStyle(``)
                setRateDataMsg(``)
                setRefresh(true)
            }, 2000)
        })
    }

    const deleteRateDataClick = (code) => {
        exchangeRateRateDataDelete(code, response => {
            setRateDataStyle(`success`)
            setRateDataMsg(response.msg)

            setTimeout(() => {
                setRateDataStyle(``)
                setRateDataMsg(``)
                setRefresh(true)
            }, 2000)
        })
    }

    return (
        <div className="me-box">
            <h4 className="mt-3 mb-5">
                <ol className="breadcrumb bold">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active">Exchange Rate</li>
                </ol>
            </h4>

            <Row>
                <Col xs={3}><b>Amount</b></Col>
                <Col xs={4}><b>From</b></Col>
                <Col xs={4}><b>To</b></Col>
            </Row>

            <Row className="mt-2">
                <Col xs={3}>
                    <Form.Control type="text" value={amount} onChange={(e) => setAmount(e.target.value)} autoComplete="off" />
                </Col>
                <Col xs={4}>
                    <Form.Select value={fromCode} onChange={(e) => setFromCode(e.target.value)}>
                        {codes.map((e, i) => {
                            return <option key={"from-" + e.code} value={e.code}>{e.code + "-" + e.name}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={4}>
                    <Form.Select value={toCode} onChange={(e) => setToCode(e.target.value)}>
                        {codes.map((e, i) => {
                            return <option key={"to-" + e.code} value={e.code}>{e.code + "-" + e.name}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={1}>
                    <Button variant="primary" onClick={() => convertClick()}>Convert</Button>
                </Col>
            </Row>

            <div className="mt-4">{convertAlertsHtml}</div>

            <Row className="mt-5">
                <Col xs={4}>
                    <Form.Select value={dataCode} onChange={(e) => setDataCode(e.target.value)}>
                        {codes.map((e, i) => {
                            return <option key={"data-" + e.code} value={e.code}>{e.code + "-" + e.name}</option>
                        })}
                    </Form.Select>
                </Col>
                <Col xs={2}>
                    <Button className="primary" onClick={() => updateRateDataClick()}>Update data</Button>
                </Col>
                <Col xs={4}>{rateDataAlertsHtml}</Col>
            </Row>

            <div className="mt-3">Convert the exchange rate directly if the currency code exists.</div>
            <div className="mt-1">If the currency code does not exist, convert to USD first, then to the target currency.</div>

            <div className="mt-3">
                {rateData.map((e, i) => {
                    return (
                        <Badge bg="secondary" key={e.code + "-" + e.data_string} className="me-3 mb-3">
                            {e.code + "_" + e.data_string}
                            <span className={"USD" === e.code ? "d-none" : "ms-2"} style={{cursor: "pointer"}} onClick={() => deleteRateDataClick(e.code)}>X</span>
                        </Badge>
                    )
                })}

            </div>
        </div>
    )
}

export default ExchangeRate