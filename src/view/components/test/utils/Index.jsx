import React, {Component /*,PropTypes*/} from 'react'
import {Head, Footer} from 'ea-head'
import {Grid, Tabset, Tab} from 'eagle-ui'
import TextArea from './TextAreaTest'
import InputPuls from './InputPulsTest'
import RadioPulsTest from './RadioPulsTest'

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabIndex: 0
        }
    }

    callback(index) {
        window.console.log('i', index)
    }

    render() {
        const logo = {
            className: 'null',
            title: 'EA'
        }

        return (
            <div>
                <Head logo={logo}/>
                <Grid>
                    <Tabset activeTab={this.state.tabIndex} tabCallback={::this.callback}>
                        <Tab heading='TextArea' key="1">
                            <TextArea />
                        </Tab>
                        <Tab heading='InputPuls' key="2">
                            <InputPuls />
                        </Tab>
                        <Tab heading='RadioPuls' key="3">
                            <RadioPulsTest />
                        </Tab>
                        <Tab heading='tab4'key="4">
                            <TextArea />
                        </Tab>
                        <Tab heading='tab5' key="5">
                            <TextArea />
                        </Tab>
                    </Tabset>
                </Grid>
                <Footer  content='2017'/>
            </div>
        )
    }
}