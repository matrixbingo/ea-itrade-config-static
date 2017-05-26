import React, {Component /*,PropTypes*/} from 'react'
import {View} from 'ea-react-dm'
import {TextArea} from '../utils/index.jsx'
import TestControl from '../../../controller/TestControl'
import BaseControl from '../../../controller/BaseControl'
import {Grid, Row, Col, Button} from 'eagle-ui'

@View([TestControl, BaseControl])
export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            textArea: {
                disabled: false,
                viewOnly: false
            }
        }
    }

    clickTextArea(type) {
        if (type === 1) {
            this.setState({
                textArea: {
                    disabled: !this.state.textArea.disabled
                }
            })
        }
        if (type === 2) {
            this.setState({
                textArea: {
                    viewOnly: !this.state.textArea.viewOnly
                }
            })
        }
    }


    render() {
        return (
            <Grid fluid>
                <Row>
                    {this.props['basemodel'].get('books')}
                    <Col style={{textAlign: 'center'}}>
                        <a className="eg-btn button" href="#test">跳转到测试页面</a>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        <Row>
                            <Col>
                                <Button onClick={this.clickTextArea.bind(this, 1)}>textArea disabled</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button onClick={this.clickTextArea.bind(this, 2)}>TextArea viewOnly</Button>
                            </Col>
                        </Row>
                        <Row>
                            {this.props['basemodel'].get('textArea').get('value')}
                        </Row>
                    </Col>
                    <Col sm={7}>
                         <TextArea {...this.props} valueLink='BaseModel.textArea.value'
                                   disabled={this.state.textArea.disabled}
                                   viewOnly={this.state.textArea.viewOnly} />
                    </Col>
                    <Col sm={1} />
                </Row>
            </Grid>
        )
    }
}