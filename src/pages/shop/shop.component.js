import React from 'react';
import {updateCollections} from '../../redux/shop/shop.actions';
import {connect} from 'react-redux';
import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import {firestore, convertCollectionSnapshotToMap} from '../../firebase/firebase.utils';

import './shop.styles.scss';


class ShopPage extends React.Component{

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const {updateCollections} = this.props;
        const collectionRef = firestore.collection('collections');
        collectionRef.onSnapshot(async snapshot => {
            const collectionMap = convertCollectionSnapshotToMap(snapshot);
            updateCollections(collectionMap);
        });
    }

    render(){
        return (
            <div className='shop-page'>
            <CollectionOverview/>
        </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);