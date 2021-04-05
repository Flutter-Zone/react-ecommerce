import React from 'react';
import {connect} from 'react-redux';
import {selectShopCollection} from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';

import './collection.styles.scss';

const CollectionPage = ({ collection }) =>{
    const {title, items} = collection;
    console.log("checking if this method is ever called");
    return (
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {
                items.map(item=>(<CollectionItem item={item}/>))
            }
        </div>
    </div>
)};

const mapStateToProps = (state, ownProps) => ({
    collection: selectShopCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);