import styled from 'styled-components'

const ListCollapseWrapper = styled.div`
  cursor: pointer;

  .ui.accordion {
    border-bottom: 1px solid #F0F0F0;

    &.accordion .active.content, .ui.accordion .active.content {
      height: ${props => !props.isActive ? props.height + 'px !important' : 'auto'};
      margin-bottom: 15px;
      transition: all .1s ease-in;
    }

    @media screen and (min-width: 1024px) {
      border-bottom: 0;
    }
  }

  .ui.accordion .accordion .title~.content, .ui.accordion .title~.content {
    display: block !important;
    overflow: hidden;
    height: ${props => props.isActive ? '100%' : 0};
    padding: 0 !important;
    transition: all .1s ease-in;

    .collapse-content {
      padding: 5px 10px;
    }
  }

  .title {
    border-top: 1px solid #F0F0F0;
    color: #5B5B5B !important;
    font-size: 16px !important;
    padding: 15px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      float: right;
      height: 12px;
      margin-left: 20px;
      padding: 8px;
      position: relative;
      width: 12px;

      &:before,
      &:after{
        content: "";
        position: absolute;
        background: #FF4813 !important;
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
