import React, { Component /*,PropTypes*/} from 'react'
import {View} from 'ea-react-dm'
//import {TextArea} from '../utils/index.jsx'
import TextArea from '../utils/textarea/TextArea'
import TestControl from '../../../controller/TestControl'
import BaseControl from '../../../controller/BaseControl'
import {Grid,Row,Col} from 'eagle-ui'

@View([TestControl,BaseControl])
export default class Index extends Component {
    constructor(props) {
        super(props)
        const val = this.props.getValueByReducers('BaseModel.textArea.value')
        window.console.log('val----->', val)
    }

    render(){
        return (
            <Grid fluid>
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