import {ngHtml} from '@angular/elements/platform'


export default ngHtml`
<style>
  @import '/elements/flex-layout/flex-layout.css';
  @import '/elements/flex-layout/flex-layout-classes.css';

  :host {
    display: block;
    position: relative;
    z-index: 0;
  }
  #wrapper ::slotted([slot=header]) {
    @apply --layout-fixed-top;
    z-index: 1;
  }
  #wrapper.initializing ::slotted([slot=header]) {
    position: relative;
  }
  :host([has-scrolling-region]) {
    height: 100%;
  }
  :host([has-scrolling-region]) #wrapper ::slotted([slot=header]) {
    position: absolute;
  }
  :host([has-scrolling-region]) #wrapper.initializing ::slotted([slot=header]) {
    position: relative;
  }
  :host([has-scrolling-region]) #wrapper #contentContainer {
    @apply --layout-fit;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  :host([has-scrolling-region]) #wrapper.initializing #contentContainer {
    position: relative;
  }
  :host([fullbleed]) {
    @apply --layout-vertical;
    @apply --layout-fit;
  }
  :host([fullbleed]) #wrapper,
  :host([fullbleed]) #wrapper #contentContainer {
    @apply --layout-vertical;
    @apply --layout-flex;
  }
  #contentContainer {
    /* Create a stacking context here so that all children appear below the header. */
    position: relative;
    z-index: 0;
  }
  @media print {
    :host([has-scrolling-region]) #wrapper #contentContainer {
      overflow-y: visible;
    }
  }
  </style>
  `
