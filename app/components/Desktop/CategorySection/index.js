/**
*
* CategorySection
*
*/

import React from 'react'
import styled from 'styled-components'

import { Container, Grid } from 'semantic-ui-react'

import { InfiniteWrapper } from 'components/Shared/InfiniteLoading'
import FilterSection from 'components/Desktop/FilterSection'

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
      <Container>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={3}>
              <div className='padding__top--20'>
                <FilterSection
                  requestFromFilter={requestFromFilter}
                  filterCategories={filterCategories}
                  filterCategoriesLoading={filterCategoriesLoading}

                  filterBrandsLoading={filterBrandsLoading}
                  filterBrands={filterBrands}
                />
              </div>
            </Grid.Column>
            <Grid.Column width={13}>
              <ContentWrapper>
                <InfiniteWrapper
                  hasMoreData={lazyload}
                  isLoading={loader}
                >
                  { _displayHeaderFeaturesProduct() }
                  { _displayFeaturesProduct() }

                  { _displayNumberProducts() }
                  { _displayEmptyLoadingIndicator() }
                  { _displayRegularItems() }

                  { _displayRecentlyViewedHeader() }
                  { _displayRecentlyViewedItems() }
                </InfiniteWrapper>
              </ContentWrapper>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  )
}

CategorySection.propTypes = {

}

export default CategorySection
