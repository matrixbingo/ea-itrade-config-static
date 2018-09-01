import React, {Component /*,PropTypes*/} from 'react'
import {Redirect, Router, Route} from 'react-router'
import {page} from 'ea-react-dm-v14'
import History from 'history/lib/createHashHistory'
import Index from '@component/trade/Index'
import Test from '@component/test/Test'
import TestIndex from '../../view/components/test/utils/Index'
import adminlte from '@component/test/adminlte/Adminlte'
import '../styles/antd.less'

class AppRouter extends Component {

    constructor(props) {
        super(props)
        // Opt-out of persistent state, not recommended.
        this.history = new History({
            queryKey: false
        })
    }

    /**
     * 页面路由总览，children为外接做入口，外接入口即为AppRouter
     */
    render() {
        return (
            <div>
                <Router history={this.history}>
                    <Route path="/test" component={Test}/>
                    <Route path="/index" component={Index}/>
                    <Route path="/testIndex" component={TestIndex}/>
                    <Route path="/adminlte" component={adminlte}/>
                    <Redirect from="/" to="/index"/>
                </Router>
            </div>
        )
    }
}

export const rtools = page(AppRouter)