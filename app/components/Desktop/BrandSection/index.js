/**
*
* BrandSection
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import Waypoint from 'react-waypoint'
import { Container, Grid } from 'semantic-ui-react'

import BannerSlider from 'components/Desktop/BannerSlider'

import { InfiniteWrapper } from 'components/Shared/InfiniteLoading'
import FilterSection from 'components/Desktop/FilterSection'

class BrandSection extends React.PureComponent {
  render () {
    const {
      animateBanner,
      brandImages,
      category,
      filterCategories,
      filterCategoriesLoading,
      // filtered,
      lazyload,
      loader,
      productsByBrands,

      _displayEmptyLoadingIndicator,
      _displayFeaturedProducts,
      _displayHeaderFeaturesProduct,
      _displayHeaderRegularProduct,
      _displayRegularItems,
      // _handleBannerAnimation,
      _requestFromFilter
      // _fetchFilteredCategories
    } = this.props

    return (
      <div>
        {/*
          <Waypoint
          onEnter={() => _handleBannerAnimation(true)}
          onLeave={() => _handleBannerAnimation(false)}
        >
          <div>
            <FilterTrigger
              queryCategory={category}
              requestFromFilter={_requestFromFilter}
              getFilterCategories={_fetchFilteredCategories}
              filterCategories={filterCategories}
              filterCategoriesLoading={filterCategoriesLoading}
              filtered={filtered}
            />
          </div>
        </Waypoint>
        */}
        <Container>
          <BannerSlider
            isInfinite
            autoplay={animateBanner}
            results={productsByBrands}
            loader={loader}
            images={brandImages}
          />
          <div className='margin__top-positive--50'>
            <InfiniteWrapper
              hasMoreData={lazyload}
              isLoading={loader}
            >
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column width={3}>
                    <FilterSection
                      itemsLoading={loader}
                      queryCategory={category}
                      requestFromFilter={_requestFromFilter}
                      filterCategories={filterCategories}
                      filterCategoriesLoading={filterCategoriesLoading}
                    />
                  </Grid.Column>
                  <Grid.Column width={13}>
                    { _displayHeaderFeaturesProduct() }
                    { _displayFeaturedProducts() }

                    { _displayHeaderRegularProduct() }
                    { _displayEmptyLoadingIndicator() }
                    { _displayRegularItems() }
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </InfiniteWrapper>
          </div>
        </Container>
      </div>
    )
  }
}

BrandSection.propTypes = {
  animateBanner: PropTypes.bool.isRequired,
  brandImages: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  category: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  filterCategories: PropTypes.object,
  filterCategoriesLoading: PropTypes.bool,
  // filtered: PropTypes.bool.isRequired,
  lazyload: PropTypes.bool.isRequired,
  loader: PropTypes.bool.isRequired,
  productsByBrands: PropTypes.object,

  _displayEmptyLoadingIndicator: PropTypes.func.isRequired,
  _displayFeaturedProducts: PropTypes.func.isRequired,
  _displayHeaderFeaturesProduct: PropTypes.func.isRequired,
  _displayHeaderRegularProduct: PropTypes.func.isRequired,
  _displayRegularItems: PropTypes.func.isRequired,
  // _handleBannerAnimation: PropTypes.func.isRequired,
  _requestFromFilter: PropTypes.func.isRequired
  // _fetchFilteredCategories: PropTypes.func.isRequired
}

export default BrandSection
