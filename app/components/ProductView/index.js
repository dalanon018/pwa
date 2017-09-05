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

import { imageStock } from 'utils/image-stock'

import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Grid, Image } from 'semantic-ui-react'

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
import defaultImage from 'images/default-product.jpg'

import PromoTag from './sections/PromoTag'
import ParagraphImage from 'images/test-images/short-paragraph.png'

import { calculateProductPrice } from 'utils/promo'

function ProductView ({
  loader,
  products,
  changeRoute,
  windowWidth
}) {
  const resposiveColumns = () => {
    if (windowWidth >= 768) {
      return 4
    } else {
      return 2
    }
  }

  const productName = (data) => {
    if (data.length > 57) {
      return `${data.slice(0, 57)}...`
    }
    return data
  }

  return (
    <CustomGridRow stretched columns={resposiveColumns()}>
      {
        loader ? range(4).map((_, index) => <DefaultState key={index} loader={loader} />)
        : products.valueSeq().map((product, index) => {
          const goToProduct = () => changeRoute(`/product/${product.get('cliqqCode').first()}`)
          return (
            <Grid.Column
              key={`${product.get('cliqqCode')}-${index}`}
              className='padding__none--horizontal'
              onClick={goToProduct}>
              <ProductWrapper>
                {
                  !isEmpty(product.get('discount')) &&
                  <PromoTag discount={product.get('discount')} />
                }
                <ImageWrapper>
                  <Image src={(product.get('image') && `${product.get('image')}?w=175&h=175&fit=clamp`) || defaultImage} />
                </ImageWrapper>
                <ProductName>{ productName(product.get('title')) }</ProductName>
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
          <ImageWrapper>
            <Image src={imageStock('default-product-loader.jpg')} className='empty-image' />
          </ImageWrapper>
          <Image src={ParagraphImage} height={50} />
        </ProductWrapper>
      </EmptyDataBlock>
    </Grid.Column>
  )
}

ProductView.propTypes = {

}

export default ProductView
