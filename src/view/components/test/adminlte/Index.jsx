import React, {Component /*,PropTypes*/} from 'react'
import { Dashboard, Header,Sidebar } from 'react-adminlte-dash'

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0
        }
    }

    render() {
        const nav = () => ([
            <Header.Item href="/some/link" key="1" />
        ])
        const sb = () => ([
            <Sidebar.Menu header="NAVIGATION" key="1">
                <Sidebar.Menu.Item title="Home" href="/" />
            </Sidebar.Menu>
        ])
        const App = ({ children }) => (
            <Dashboard
                navbarChildren={nav()}
                sidebarChildren={sb()}
                theme="skin-blue"
            >
                {children}
            </Dashboard>
        )
        return (
            <div>
                <App />
            </div>
        )
    }
}