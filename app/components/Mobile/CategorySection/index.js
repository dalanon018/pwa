/**
*
* CategorySection
*
*/

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Container } from 'semantic-ui-react'

import FilterTrigger from 'components/Mobile/FilterTrigger'
import H3 from 'components/Shared/H3'

import { InfiniteWrapper } from 'components/Shared/InfiniteLoading'

export const ContentWrapper = styled(Container)`
  padding-top: 20px !important;
  padding-bottom: 20px !important;

  h4.ui.header {
    margin-top: 0 !important;
  }

  @media (min-width: 768px) {
    .header-label {
      padding-bottom: 20px;
    }

    .header-label span {
      font-size: 20px;
    }

    .category-title {
      font-size: 20px;
    }

    .num-item-label, .num-item-label span {
      font-size: 17px;
      letter-spacing: 3px;
    }

    .recent-label {
      padding-bottom: 20px;
      padding-top: 25px;
    }

    .recent-label span {
      font-size: 20px;
    }
  }
`

function CategorySection ({
  filterBrands,
  filterBrandsLoading,
  filterCategories,
  filterCategoriesLoading,
  filtered,
  getFilterBrands,
  getFilterCategories,
  lazyload,
  loader,
  queryBrands,
  queryCategory,
  requestFromFilter,
  windowWidth,

  _displayEmptyLoadingIndicator,
  _displayFeaturesProduct,
  _displayHeaderFeaturesProduct,
  _displayNumberProducts,
  _displayRecentlyViewedHeader,
  _displayRecentlyViewedItems,
  _displayRegularItems,
  _handlePageTitle
}) {
  return (
    <div>
      <FilterTrigger
        queryCategory={queryCategory}
        queryBrands={queryBrands}
        requestFromFilter={requestFromFilter}
        getFilterCategories={getFilterCategories}
        getFilterBrands={getFilterBrands}
        filterCategories={filterCategories}
        filterBrands={filterBrands}
        filterCategoriesLoading={filterCategoriesLoading}
        filterBrandsLoading={filterBrandsLoading}
        filtered={filtered}
      />

      <ContentWrapper>
        <InfiniteWrapper
          hasMoreData={lazyload}
          isLoading={loader}
        >
          { _displayHeaderFeaturesProduct() }
          { _displayFeaturesProduct() }

          <H3 className='margin__none'> {_handlePageTitle()} </H3>

          { _displayNumberProducts() }
          { _displayEmptyLoadingIndicator() }
          { _displayRegularItems() }

          { _displayRecentlyViewedHeader() }
          { _displayRecentlyViewedItems() }
        </InfiniteWrapper>
      </ContentWrapper>
    </div>
  )
}

CategorySection.propTypes = {
  filterBrands: PropTypes.object.isRequired,
  filterBrandsLoading: PropTypes.bool.isRequired,
  filterCategories: PropTypes.object.isRequired,
  filterCategoriesLoading: PropTypes.bool.isRequired,
  filtered: PropTypes.bool.isRequired,
  getFilterBrands: PropTypes.func.isRequired,
  getFilterCategories: PropTypes.func.isRequired,
  lazyload: PropTypes.bool.isRequired,
  loader: PropTypes.bool.isRequired,
  queryBrands: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired,
  queryCategory: PropTypes.string.isRequired,
  requestFromFilter: PropTypes.func.isRequired,

  _displayEmptyLoadingIndicator: PropTypes.func.isRequired,
  _displayFeaturesProduct: PropTypes.func.isRequired,
  _displayHeaderFeaturesProduct: PropTypes.func.isRequired,
  _displayNumberProducts: PropTypes.func.isRequired,
  _displayRecentlyViewedHeader: PropTypes.func.isRequired,
  _displayRecentlyViewedItems: PropTypes.func.isRequired,
  _displayRegularItems: PropTypes.func.isRequired,
  _handlePageTitle: PropTypes.func.isRequired
}

export default CategorySection
