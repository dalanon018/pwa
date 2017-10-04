import styled from 'styled-components'

const ListCollapseWrapper = styled.div`
  .ui.accordion {
    border: none !important;
    margin-left: 20px
    &.accordion .active.content, .ui.accordion .active.content {
      height: auto;
      margin-bottom: 15px;
      transition: all .3s ease;
    }
  }

  .ui.accordion .title~.content {
    display: block !important;
    overflow: hidden;
    height: 0;
    padding: 0 !important;
    transition: all .3s ease;
    margin: 0 !important;

    .collapse-content {
      padding: 5px 30px !important
    }
  }

  .ui.accordion > .title.child-accordion {
    display: flex;
    border: none !important;
    color: #5B5B5B !important;
    font-size: 14px !important;
    letter-spacing: 1px;
    padding: 0 !important;

    .icon {
      float: none !important;
      height: 12px;
      margin-left: 20px;
      margin-right: 6px!important;
      padding: 5px;
      position: relative;
      width: 12px;

      &:before,
      &:after{
        content: "";
        position: absolute;
        background: #F58322 !important;
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

  .ui.accordion > .active.title.child-accordion {
    span, p {
      color: #F58322 !important;
    }

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
