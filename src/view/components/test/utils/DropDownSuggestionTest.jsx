import React, {Component} from 'react'
import {Grid, Row, Col} from 'eagle-ui'
import {DropDownSuggestion} from '../../utils/index'
import {actionType} from '../../../../constants/action-type'
import {View} from 'ea-react-dm'
import TestControl from '../../../../controller/test/TestControl'

@View(TestControl)
export default class DropDownSuggestionTest extends Component {
    render() {
        const _this = this
        return (
            <Grid>
                <Row>
                    <Col sm={6} style={{paddingLeft: '10px'}} end>
                        <div style={{fontSize: '12px', verticalAlign: 'top'}}>
                            <DropDownSuggestion url={actionType.BASE_URL + '/stock/search'} {...this.props}
                                                ref={e => _this.dropDownSuggestionPlus = e}
                                                format={{leng: 40, title: {'code': ' - ', 'name': ''}}}
                                                valueLink='TestModel.stocks'
                                                placeholder="请输入关键字" />
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
}
