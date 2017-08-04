import styled from 'styled-components'

const ListCollapseWrapper = styled.div`
  .ui.accordion .accordion .active.content, .ui.accordion .active.content {
    height: ${props => props.height}px !important;
    transition: all .3s ease;
  }

  .ui.accordion .accordion .title~.content, .ui.accordion .title~.content {
    display: block !important;
    overflow: hidden;
    height: 0;
    padding: 0 !important;
    transition: all .3s ease;

    p {
      font-family: 'helveticalight';
    }
    
    .collapse-content {
      padding: 5px 10px;
    }
  }

  .title {
    color: #5B5B5B !important;
    font-family: 'helveticamedium' !important;
    font-size: 11px !important;
    letter-spacing: 1px;
    text-transform: uppercase;

    .icon {
      position: relative;
      width: 8px;
      height: 8px;

      &:before,
      &:after{
        content: "";
        position: absolute;
        background: #F6A22D !important;
        transition: transform 0.25s ease-out;
      }

      /* Vertical line */
      &:before{
        top: 0;
        left: 50%;
        width: 2px;
        height: 100%;
        margin-left: -1px;
      }

      /* horizontal line */
      &:after{
        top: 50%;
        left: 0;
        width: 100%;
        height: 2px;
        margin-top: -1px;
      }
    }
  }

  .active.title {
    i.icon {
      cursor: pointer;
      
      &:before{ transform: rotate(90deg); }
      &:after{ transform: rotate(180deg); }
    }
  }

  .ui.accordion .accordion .active.title .dropdown.icon, .ui.accordion .active.title .dropdown.icon {
    transform: initial;
  }
`

export {
  ListCollapseWrapper
}
