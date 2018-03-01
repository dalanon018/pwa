import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { FormattedMessage } from 'react-intl'
import { Form, Label, Checkbox } from 'semantic-ui-react'
import messages from './messages'
import {
  SizesWrapper
} from './styled'

const FormWrapper = styled(Form)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  > field {
    flex: 1;
    justify-content: center;
    align-items: center;

    &:not(:first-child) {
      margin-left: 20px;
    }
  }
`

const StyledCheckBox = styled(Checkbox)`
  margin: 0;

  & input, label:after, label:before {
    display: none;
  }

  & label {
    background: transparent;
    border-radius: 5px;
    border: 2px solid #F0F0F0;
    height: 50px;
    line-height: 3;
    margin: 5px;
    padding: 0 !important;
    width: 50px;
    text-align: center;
  }

  & input[type=checkbox]:checked + label {
    border: 2px solid #8DC640;
  }
`

function SizeSelector ({ product, onSizeChange }) {
  const selectedSize = product.get('size')
  return (
    <SizesWrapper className='border_top__one--light-grey'>
      <div>
        <Label className='color__secondary center' as='p' basic size='big'>
          <FormattedMessage {...messages.selectSize} />
        </Label>
      </div>
      <FormWrapper>
        {
          product.get('association').map((productSize) => (
            <Form.Field
              key={productSize.get('size')}
              >
              <StyledCheckBox
                radio
                className='margin__bottom-positive--20'
                name='sizeSelector'
                value={productSize.get('size')}
                label={productSize.get('size')}
                checked={productSize.get('size') === selectedSize}
                onChange={onSizeChange}
                  />
            </Form.Field>
          ))
        }
      </FormWrapper>
    </SizesWrapper>
  )
}

SizeSelector.propTypes = {
  product: PropTypes.object.isRequired,
  onSizeChange: PropTypes.func.isRequired
}

export default SizeSelector
