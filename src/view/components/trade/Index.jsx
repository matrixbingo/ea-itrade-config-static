import React, { Component /*,PropTypes*/} from 'react'
import {View} from 'gfs-react-dm'
import TestControl from '../../../controller/TestControl'
import BaseControl from '../../../controller/BaseControl'
import {Grid,Row,Col} from 'eagle-ui'

@View([TestControl,BaseControl])
export default class Index extends Component {
    constructor(props) {
        super(props)
        this.props.consoleLog()
    }

    render(){
        return (
            <Grid fluid>
                <Row>
                    {this.props.basemodel.get('books')}
                    <Col style={{
                        textAlign:'center'
                    }}><a className="eg-btn button" href="#test">跳转到测试页面</a></Col>
                </Row>
            </Grid>
        )
    }
}