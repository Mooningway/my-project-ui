import Alert from 'react-bootstrap/Alert';

const useAlerts = (msg = ``, style = ``) => {
    let html = ``
    if (msg && style && msg.length > 0 && style.length > 0) {
        html = (
            <Alert variant={style}>{msg}</Alert>
        )
    }

    return [html]
}

export default useAlerts