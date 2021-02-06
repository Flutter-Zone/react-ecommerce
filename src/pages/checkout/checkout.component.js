import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import {PaystackButton} from 'react-paystack';
import './checkout.styles.scss';


const config = {
    reference: (new Date()).getTime(),
    email: "user@example.com",
    currency: 'GHS',
    publicKey: 'pk_test_64a0268c0a078c0afb223cefefb91d2f4e4397d9',
  };


class CheckoutPage extends React.Component{

    constructor(){
        super();
    }
 
    
    handlePaystackSuccessAction = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
    };

    // you can call this function anything
    handlePaystackCloseAction = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
    }


    render(){ 
        
    
        const {cartItems, total}  = this.props;
        const componentProps = {
            ...config,
            amount: (total * 100) * 5.8,
            text: 'Paystack Button Implementation',
            onSuccess: (reference) => this.handlePaystackSuccessAction(reference),
            onClose: this.handlePaystackCloseAction,
        };
        return (
            <div className='checkout-page'>
                <div className='checkout-header'>
                    <div className='header-block'>
                        <span>Product</span>
                    </div>
                    <div className='header-block'>
                        <span>Description</span>
                    </div>
                    <div className='header-block'>
                        <span>Quantity</span>
                    </div>
                    <div className='header-block'>
                        <span>Price</span>
                    </div>
                    <div className='header-block'>
                        <span>Remove</span>
                    </div>
                </div>
                {
                    cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)
                }
                <div className='total'>
                    <span>TOTAL: ${total}</span>
                </div>
                <PaystackButton {...componentProps}/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);