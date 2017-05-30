import React, {Component /*,PropTypes*/} from 'react'
import {Panel, Tabset, Tab} from 'eagle-ui'
import TradeList from './list/TradeList'

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0
        }
    }
    callback() {
        //window.console.log('i', index)
    }
    render() {
        return (
                <Panel className="marginTopSpace paddingSpace question-margin configGXIndex">
                    <Tabset disableHoverAnimation={true} activeTab={this.state.tabIndex}
                            tabCallback={::this.callback}>
                        <Tab heading='主力列表'>
                            {<TradeList />}
                        </Tab>
                    </Tabset>
                </Panel>
        )
    }
}