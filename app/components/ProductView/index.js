/**
*
* ProductView
*
*/

import React from 'react'
import {
  range,
  isEmpty
} from 'lodash'
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Grid, Image } from 'semantic-ui-react'
// import ReactPaginate from 'react-paginate'

import {
  CustomGridRow,
  ImageWrapper,
  ProductName,
  ProductPrice,
  ProductPriceStrike,
  ProductPriceWrapper,
  ProductWrapper
} from './styles'

import EmptyDataBlock from 'components/EmptyDataBlock'

import PromoTag from './sections/PromoTag'
import ProductImage from 'images/test-images/samplebag.png'
import EmptyImage from 'images/broken-image.jpg'
import ParagraphImage from 'images/test-images/short-paragraph.png'

import { calculateProductPrice } from 'utils/promo'

function ProductView ({
  loader,
  products,
  changeRoute
}) {
  return (
    <CustomGridRow stretched columns={2}>
      {
        loader ? range(4).map((_, index) => <DefaultState key={index} loader={loader} />)
        : products.valueSeq().map((product) => {
          const goToProduct = () => changeRoute(`/product/${product.get('cliqqCode').first()}`)

          return (
            <Grid.Column
              key={product.get('cliqqCode')}
              className='padding__none--horizontal'
              mobile={8}
              tablet={4}
              computer={3}
              largeScreen={3}
              widescreen={3}
              onClick={goToProduct}>
              <ProductWrapper>
                {
                  !isEmpty(product.get('discount')) &&
                  <PromoTag discount={product.get('discount')} />
                }
                <ImageWrapper>
                  <Image src={ProductImage} />
                </ImageWrapper>
                <ProductName>{product.get('title')}</ProductName>
                <ProductPriceWrapper>
                  <ProductPrice>
                    <FormattedMessage {...messages.peso} />
                    { calculateProductPrice(product) }
                  </ProductPrice>
                  <ProductPriceStrike>
                    {
                      !isEmpty(product.get('discount'))
                      ? <FormattedMessage {...messages.peso} />
                      : ''
                    }
                    {
                      !isEmpty(product.get('discount')) &&
                      parseFloat(product.get('price')).toLocaleString()
                    }
                  </ProductPriceStrike>
                </ProductPriceWrapper>
              </ProductWrapper>
              {/*
                <ReactPaginate
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={<a href="">...</a>}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"} />
              */}
            </Grid.Column>
          )
        })
      }
    </CustomGridRow>
  )
}

const DefaultState = () => {
  return (
    <Grid.Column className='padding__none--horizontal' mobile={8} tablet={4} computer={3} widescreen={3}>
      <EmptyDataBlock>
        <ProductWrapper>
          <ImageWrapper background={EmptyImage} className='custom-height' />
          <Image src={ParagraphImage} height={50} />
        </ProductWrapper>
      </EmptyDataBlock>
    </Grid.Column>
  )
}

ProductView.propTypes = {

}

export default ProductView
