/**
*
* BrandSection
*
*/

import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'
import Waypoint from 'react-waypoint'

import { Container, Grid } from 'semantic-ui-react'

import MobileBannerSlider from 'components/Mobile/BannerSlider'
import SharedBannerSlider from 'components/Shared/BannerSlider'

import AccessView from 'components/Shared/AccessMobileDesktopView'
import FilterTrigger from 'components/Mobile/FilterTrigger'
import { InfiniteWrapper } from 'components/Shared/InfiniteLoading'

class BrandSection extends React.PureComponent {
  render () {
    const {
      animateBanner,
      brandImages,
      category,
      filterCategories,
      filterCategoriesLoading,
      filtered,
      lazyload,
      loader,
      productsByBrands,

      _displayEmptyLoadingIndicator,
      _displayFeaturedProducts,
      _displayHeaderFeaturesProduct,
      _displayHeaderRegularProduct,
      _displayRegularItems,
      _handleBannerAnimation,
      _requestFromFilter,
      _fetchFilteredCategories
    } = this.props

    return (
      <div>
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
        <Container>
          <Grid padded>
            <Grid.Row className='padding__none--bottom'>
              <Grid.Column>
                <AccessView
                  mobileView={
                    <MobileBannerSlider
                      curved
                      isInfinite
                      autoplay={animateBanner}
                      results={productsByBrands}
                      loader={loader}
                      images={brandImages}
                    />
                  }
                  desktopView={null}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <AccessView
            mobileView={null}
            desktopView={
              <SharedBannerSlider
                isInfinite
                autoplay={animateBanner}
                results={productsByBrands}
                loader={loader}
                images={brandImages}
            />
            }
          />
          <div className='margin__top-positive--10'>
            <InfiniteWrapper
              hasMoreData={lazyload}
              isLoading={loader}
            >
              { _displayHeaderFeaturesProduct() }
              { _displayFeaturedProducts() }

              { _displayHeaderRegularProduct() }
              { _displayEmptyLoadingIndicator() }
              { _displayRegularItems() }
            </InfiniteWrapper>
          </div>
        </Container>
      </div>
    )
  }
}

BrandSection.propTypes = {
  animateBanner: PropTypes.bool.isRequired,
  brandImages: PropTypes.object.isRequired,
  category: PropTypes.object,
  filterCategories: PropTypes.object.isRequired,
  filterCategoriesLoading: PropTypes.bool.isRequired,
  filtered: PropTypes.bool.isRequired,
  lazyload: PropTypes.bool.isRequired,
  loader: PropTypes.bool.isRequired,
  productsByBrands: PropTypes.object.isRequired,

  _displayEmptyLoadingIndicator: PropTypes.func.isRequired,
  _displayFeaturedProducts: PropTypes.func.isRequired,
  _displayHeaderFeaturesProduct: PropTypes.func.isRequired,
  _displayHeaderRegularProduct: PropTypes.func.isRequired,
  _displayRegularItems: PropTypes.func.isRequired,
  _handleBannerAnimation: PropTypes.func.isRequired,
  _requestFromFilter: PropTypes.func.isRequired,
  _fetchFilteredCategories: PropTypes.func.isRequired
}

export default BrandSection
