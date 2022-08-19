import { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

function MenuIndex() {
    const [menus] = useState(
        [
            { key: `home`, name: `Home`, link: `/` },
            { key: `bookmark`, name: `Bookmark Manager`, link: `/bookmark` },
            { key: `bookmark_tag`, name: `Bookmark Tag Manager`, link: `/bookmark/tag` },
            { key: `exchange_rage`, name: `Exchange Rate`, link: `/exchangeRate` },
            { key: `md5`, name: `MD5`, link: `/md5` },
            { key: `base64`, name: `Base64`, link: `/base64` },
            { key: `aes`, name: `Aes`, link: `/aes` },
            { key: `rsa`, name: `Rsa`, link: `/rsa` },
            { key: `timestamp`, name: `Timestamp`, link: `/timestamp` },
        ]
    )

    return (
        <div className="dropdown dropstart position-absolute top-0 end-0">
            <Dropdown>
                <Dropdown.Toggle id="menu" size='sm' variant='dark'>
                    Menu
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {menus.map((e, i) => {
                        return <Dropdown.Item key={e.key} href={e.link}>{e.name}</Dropdown.Item>
                    })}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default MenuIndex