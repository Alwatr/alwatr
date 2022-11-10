import {css} from 'lit';

const reset = css`
  .ion-page {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: space-between;
    contain: layout size style;
    overflow: hidden;
    z-index: 0;
  }

  .ion-page-hidden,
  [hidden],
  ion-action-sheet-controller,
  ion-alert-controller,
  ion-loading-controller,
  ion-menu-controller,
  ion-modal-controller,
  ion-nav-controller,
  ion-picker-controller,
  ion-popover-controller,
  ion-route,
  ion-route-redirect,
  ion-router,
  ion-select-option,
  ion-toast-controller {
    display: none !important;
  }

  .ion-page-invisible {
    opacity: 0;
  }

  .can-go-back > ion-header ion-back-button {
    display: block;
  }

  ion-card-header.ion-color .ion-inherit-color,
  ion-card.ion-color .ion-inherit-color {
    color: inherit;
  }

  ion-accordion-group.accordion-group-expand-inset > ion-accordion:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  ion-accordion-group.accordion-group-expand-inset > ion-accordion:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  ion-accordion-group > ion-accordion:last-of-type ion-item[slot='header'] {
    --border-width: 0px;
  }

  ion-accordion.accordion-animated > [slot='header'] .ion-accordion-toggle-icon {
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    ion-accordion .ion-accordion-toggle-icon {
      transition: none !important;
    }
  }

  ion-accordion.accordion-expanded > [slot='header'] .ion-accordion-toggle-icon,
  ion-accordion.accordion-expanding > [slot='header'] .ion-accordion-toggle-icon {
    transform: rotate(180deg);
  }

  ion-accordion-group.accordion-group-expand-inset.md > ion-accordion.accordion-previous ion-item[slot='header'] {
    --border-width: 0px;
    --inner-border-width: 0px;
  }

  ion-accordion-group.accordion-group-expand-inset.md > ion-accordion.accordion-expanded:first-of-type,
  ion-accordion-group.accordion-group-expand-inset.md > ion-accordion.accordion-expanding:first-of-type {
    margin-top: 0;
  }

  ion-input input::-webkit-date-and-time-value {
    text-align: start;
  }
`;

export default reset;
