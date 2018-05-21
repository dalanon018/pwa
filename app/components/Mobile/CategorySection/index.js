/**
*
* CategorySection
*
*/

import React from 'react'
import styled from 'styled-components'

import { Container } from 'semantic-ui-react'

import FilterTrigger from 'components/Mobile/FilterTrigger'
import H3 from 'components/Shared/H3'

import { InfiniteWrapper } from 'components/Shared/InfiniteLoading'

const ContentWrapper = styled(Container)`
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

}

export default CategorySection
