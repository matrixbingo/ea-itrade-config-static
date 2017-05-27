import React, { Component /*,PropTypes*/} from 'react'
import {View} from 'ea-react-dm'
//import {TextArea} from '../utils/index.jsx'
import {Head} from 'ea-head'
import TextArea from '../utils/textarea/TextArea'
import TestControl from '../../../controller/test/TestControl'
import BaseControl from '../../../controller/trade/BaseControl'
import {Grid,Row,Col} from 'eagle-ui'

@View([TestControl,BaseControl])
export default class Taaa extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        const logo = {
            className: 'null',
            title: 'EA'
        }
        return (
            <Grid fluid>
                <Head logo={logo} />
                <Row>
                    <TextArea />
                </Row>
                <Row>
                    <TextArea />
                </Row>
                <Row>
                    <TextArea />
                </Row>
                <Row>
                    <TextArea />
                </Row>
                <Row>
                    <TextArea />
                </Row>
                <Row>
                    {/*<TextArea {...this.props} valueLink="BaseModel.textArea.value"/>
                    {this.props['basemodel'].get('textArea').get('value')}*/}
                </Row>
                <Row>
                    {this.props['basemodel'].get('books')}
                    <Col style={{textAlign:'center'}}>
                        <a className="eg-btn button" href="#test">跳转到测试页面</a>
                    </Col>
                </Row>
            </Grid>
        )
    }
}