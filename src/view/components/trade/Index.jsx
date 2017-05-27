import React, {Component /*,PropTypes*/} from 'react'
import {Grid, Row, Col} from 'eagle-ui'

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

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col style={{textAlign: 'center'}}>
                        <a className="eg-btn button" href="#test">跳转到测试页面</a>
                    </Col>
                </Row>
            </Grid>
        )
    }
}