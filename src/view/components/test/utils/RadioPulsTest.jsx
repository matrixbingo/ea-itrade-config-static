import React, {Component /*,PropTypes*/} from 'react'
import {View} from 'ea-react-dm'
import {RadioPlus} from '../../utils/index'
import TestControl from '../../../../controller/test/TestControl'
import {Grid, Row, Col, Button} from 'eagle-ui'
import '../../../styles/test.less'

@View(TestControl)
export default class RadioPulsTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            radioPlus: {
                disabled: false,
                viewOnly: false
            }
        }
    }

    clickInputPuls(type) {
        if (type === 1) {
            this.setState({
                radioPlus: {
                    disabled: !this.state.radioPlus.disabled
                }
            })
        }
        if (type === 2) {
            this.setState({
                radioPlus: {
                    viewOnly: !this.state.radioPlus.viewOnly
                }
            })
        }
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col sm={3}>
                        <Row>
                            <Col>
                                <Button onClick={this.clickInputPuls.bind(this, 1)}>radioPlus disabled</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button onClick={this.clickInputPuls.bind(this, 2)}>radioPlus viewOnly</Button>
                            </Col>
                        </Row>
                        <Row>
                            {this.props['testmodel'].get('radioPlus').get('value')}
                        </Row>
                    </Col>
                    <Col sm={7}>
                        <RadioPlus {...this.props} valueLink='testmodel.radioPlus.value'
                                   disabled={this.state.radioPlus.disabled}
                                   viewOnly={this.state.radioPlus.viewOnly} />
                    </Col>
                    <Col sm={1}/>
                </Row>
            </Grid>
        )
    }
}
