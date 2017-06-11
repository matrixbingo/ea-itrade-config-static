import React, {Component} from 'react'
import {ImageView} from 'eg-imageview'
import {Row, Col, Dialog} from 'eagle-ui'
import classnames from 'classnames'
import TradUtil from '../../common/common'
import './RowImgList.less'

export default class RowImgList extends Component {

    static defaultProps = {
        code: 0
    }

    constructor(props, context) {
        super(props, context)
        //window.console.log('constructor this.props.code --->', this.props.code)
        this.state = {
            file: [{
                name: '分时',
                url: this.createImgUrlByCode(1, props.code)
            }, {
                name: '日K',
                url: this.createImgUrlByCode(2, props.code)
            }, {
                name: '周K',
                url: this.createImgUrlByCode(3, props.code)
            }, {
                name: '月K',
                url: this.createImgUrlByCode(4, props.code)
            }],
            showIcon: {
                leftRotate: true,
                rightRotate: true,
                zoomIn: true,
                zoomOut: true
            },
            shouldUpdate:false,
            activeIndex: 0,
            code: this.props.code,
            hide: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.code == nextProps.curCode && nextProps.page == nextProps.curPage) {
            //window.console.log('componentWillReceiveProps--->', nextProps.page, nextProps.curPage, nextProps.code, nextProps.curCode, this.state.code)
            this.setState({
                hide: !this.state.hide
            })
        }else if(nextProps.curCode == 0){
            this.setState({
                hide: true
            })
        }
    }
    shouldComponentUpdate(nextProps){
        window.console.log('shouldComponentUpdate', nextProps.shouldUpdate)
        return nextProps.shouldUpdate
    }

    createImgUrlByCode(type, code) {
        switch (type) {
            //分时
            case 1:
                return 'http://image.sinajs.cn/newchart/min/n/' + TradUtil.formatCode(code) + '.gif'
            //日
            case 2:
                return 'http://image.sinajs.cn/newchart/daily/n/' + TradUtil.formatCode(code) + '.gif'
            //周K
            case 3:
                return 'http://image.sinajs.cn/newchart/weekly/n/' + TradUtil.formatCode(code) + '.gif'
            //月K
            case 4:
                return 'http://image.sinajs.cn/newchart/monthly/n/' + TradUtil.formatCode(code) + '.gif'
        }
    }

    show(id, index) {
        this.setState({activeIndex: index}, () => {
            Dialog.mask(id).then(function () {
                Dialog.close()
            }, function () {
            })
        })
    }

    render() {
        const classNames = classnames('rowImgList', {'hide': this.state.hide})
        if(this.state.hide){
            return <div />
        }
        return (
            <div className={classNames}>
                <Row className="row-color col-boder">
                    <Col className="col-div-width col-left-right">
                        <img src={this.createImgUrlByCode(1, this.props.code)}
                             onClick={this.show.bind(this, 'stockImageView', 0)}/>
                    </Col>
                    <Col className="col-div-width col-left-right">
                        <img src={this.createImgUrlByCode(2, this.props.code)}
                             onClick={this.show.bind(this, 'stockImageView', 1)}/>
                    </Col>
                    <Col className="col-div-width col-left-right">
                        <img src={this.createImgUrlByCode(3, this.props.code)}
                             onClick={this.show.bind(this, 'stockImageView', 2)}/>
                    </Col>
                    <Col className="col-div-width col-left-right">
                        <img src={this.createImgUrlByCode(4, this.props.code)}
                             onClick={this.show.bind(this, 'stockImageView', 3)}/>
                    </Col>
                </Row>
                <ImageView id="stockImageView" file={this.state.file} showIcon={this.state.showIcon}
                           activeIndex={this.state.activeIndex} isMask={true} styke={{width: '2000px'}}/>
            </div>
        )
    }
}