import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Container, Row, Col, Button } from 'reactstrap';
import valid from 'card-validator';

import { editCardNo, editClientName, editCVV, editEXP, clearForm } from '../../actions/paymentActions';

import Header from '../../components/header';
import Loading from '../../components/common/loading';

import '../../assets/styles/app.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
    constructor(props){
        super(props);

        this.state={
            isFormInValid: null,
            proceed: null
        }

        this.numberValidation;
    }

    onSubmit(e){
        e.preventDefault();
        const {name, cvv, exp} = this.props;
        let {isFormInValid, proceed} = this.state;

        if(this.numberValidation.isValid && name !== "" && cvv !== "" && exp !== "" ){
            proceed = true;
            isFormInValid = false;
        }else{
            isFormInValid = true;
            proceed = false;
        }

        this.setState({isFormInValid, proceed});
    }

    handleCancel(){
        this.setState({proceed : false}, function(){
            this.props.clearForm();
        });
    }
    
    render(){
        const{cardNo, name, cvv, exp} = this.props;
        const{isFormInValid, proceed} = this.state;
        
        this.numberValidation = valid.number(cardNo);

        let isCardValidCls;

        if(cardNo !== ""){
            isCardValidCls = this.numberValidation.isValid? "form-control" : "form-control is-invalid"; 
        }else{
            isCardValidCls = (!isFormInValid)? "form-control" : "form-control is-invalid";
        }

        return(
            <div className="app-holder">
                <Header/>
                <Container className="app-container">
                    <Row>
                        <Col sm={{ size: 10, offset: 1 }}>
                            <div className="inner-wrapper">
                            {
                                (proceed)?
                                <div className="text-center">
                                    <Loading/>
                                    <p>Payment Processing</p>
                                    <Button onClick={() => this.handleCancel()}>Cancel</Button>
                                </div>
                                :
                                <form onSubmit={(e) => this.onSubmit(e)}>
                                    <div className="form-group row clearfix">
                                        <label className="col-sm-6 col-form-label">Card Number:</label>
                                        <div className="col-sm-6 col-xs-6 pull-right filed-wrapper">
                                            <input type="text" className={isCardValidCls} value={cardNo} onChange={(e) => this.props.editCardNo(e.target.value)} placeholder="Card Number" />
                                            {
                                                (this.numberValidation.card !== null)?
                                                    (this.numberValidation.card.niceType === "Visa")?
                                                    <span className="card-icon visa-icon"/>
                                                    :
                                                        (this.numberValidation.card.niceType === "Mastercard")?
                                                        <span className="card-icon master-icon"/>
                                                        :
                                                        null
                                                :
                                                null
    
                                            }
                                        </div>
                                    </div>
                                    <div className="form-group row clearfix">
                                        <label className="col-sm-6 col-form-label">Name on card:</label>
                                        <div className="col-sm-6 col-xs-6 pull-right">
                                            <input type="text" className={(!isFormInValid)? "form-control" : "form-control is-invalid"} value={name} onChange={(e) => this.props.editClientName(e.target.value)} placeholder="Name on Card" />
                                        </div>
                                    </div>
                                    <div className="form-group row clearfix">
                                        <label className="col-sm-6 col-form-label">CVV:</label>
                                        <div className="col-sm-6 col-xs-6 pull-right">
                                            <input type="text" className={(!isFormInValid)? "form-control" : "form-control is-invalid"} value={cvv} onChange={(e) => this.props.editCVV(e.target.value)} placeholder="Card CVV" />
                                        </div>
                                    </div>
                                    <div className="form-group row clearfix">
                                        <label className="col-sm-6 col-form-label">Card Expiry:</label>
                                        <div className="col-sm-6 col-xs-6 pull-right">
                                            <input type="text" className={(!isFormInValid)? "form-control" : "form-control is-invalid"} value={exp} onChange={(e) => this.props.editEXP(e.target.value)} placeholder="Expiry date" />
                                        </div>
                                    </div>
                                    {
                                        (isFormInValid)?
                                        <p className="text-danger">Please fill all fields.</p>
                                        :
                                        null
                                    }
                                    <Button type="submit">Submit</Button>
                                </form>
                            }
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    cardNo: state.payment.card_no,
    name: state.payment.user_name,
    cvv: state.payment.user_cvv,
    exp: state.payment.card_exp,
})

const mapDispatchToProps = dispatch => bindActionCreators({
    editCardNo,
    editClientName,
    editCVV,
    editEXP,
    clearForm,
  }, dispatch)
  
export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(App)