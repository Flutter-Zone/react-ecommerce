import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {createStructuredSelector} from 'reselect';

import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';
import {selectIsCollectionFetching, selectIsCollectionLoaded} from '../../redux/shop/shop.selectors';

import CollectionOverview from '../../components/collection-overview/collection-overview.component';
import CollectionPage from '../../pages/collection/collection.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import './shop.styles.scss';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);


class ShopPage extends React.Component{
    componentDidMount(){
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync();
    }

    render(){
        const {match, isCollectionFetching, isCollectionLoaded} = this.props;
        return (
            <div className='shop-page'>
              <Route
                exact
                path={`${match.path}`}
                render={props => (
                  <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
                )}
              />
              <Route
                path={`${match.path}/:collectionId`}
                render={props => (
                  <CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props} />
                )}
              />
            </div>
          );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionLoaded,
});

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);