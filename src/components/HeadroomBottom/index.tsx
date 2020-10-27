import React, { Component } from 'react' // eslint-disable-line import/no-unresolved
import shallowequal from 'shallowequal';

import shouldUpdate from './shouldUpdate'
const raf = require('raf');
import { number } from 'prop-types';

const noop = () => { }

export interface IProps {
  className?: string
  parent: () => any,
  children?: any,
  disableInlineStyles?: boolean,
  disable?: boolean,
  upTolerance?: number,
  downTolerance?: number,
  onPin: () => void,
  onUnpin: () => void,
  onUnfix: () => void,
  wrapperStyle?: object,
  pinStart?: number,
  style?: object,
  calcHeightOnResize?: boolean,
}

export interface IState {
  state: string,
  translateY: string | number,
  className: string,
  height?: number,
  unfixedToUnpinned: boolean
}

interface IInnerStyle {

}

export default class Headroom extends Component<IProps, IState> {
  /*  static propTypes = {
      className: PropTypes.string,
      parent: PropTypes.func,
      children: PropTypes.any.isRequired,
      disableInlineStyles: PropTypes.bool,
      disable: PropTypes.bool,
      upTolerance: PropTypes.number,
      downTolerance: PropTypes.number,
      onPin: PropTypes.func,
      onUnpin: PropTypes.func,
      onUnfix: PropTypes.func,
      wrapperStyle: PropTypes.object,
      pinStart: PropTypes.number,
      style: PropTypes.object,
      calcHeightOnResize: PropTypes.bool,
    };
    */

  static defaultProps: IProps = {
    parent: () => window,
    disableInlineStyles: false,
    disable: false,
    upTolerance: 1,
    downTolerance: 0,
    onPin: noop,
    onUnpin: noop,
    onUnfix: noop,
    wrapperStyle: {},
    pinStart: 0,
    calcHeightOnResize: true,
  };

  public currentScrollY: number = 0
  public lastKnownScrollY: number = 0
  public scrollTicking: boolean = false
  public resizeTicking: boolean = false
  public inner: any

  constructor(props: IProps) {
    super(props)
    // Class variables.
    this.currentScrollY = 0
    this.lastKnownScrollY = 0
    this.scrollTicking = false
    this.resizeTicking = false
    this.inner = {}
    this.state = {
      state: 'pinned',
      translateY: 0,
      className: 'headroom headroom--unfixed',
      unfixedToUnpinned: true
    }
  }

  componentDidMount() {
    this.setHeightOffset()
    if (!this.props.disable) {
      this.props.parent().addEventListener('scroll', this.handleScroll)

      if (this.props.calcHeightOnResize) {
        this.props.parent().addEventListener('resize', this.handleResize)
      }
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.disable && !this.props.disable) {
      this.unfix()
      this.props.parent().removeEventListener('scroll', this.handleScroll)
      this.props.parent().removeEventListener('resize', this.handleResize)
    } else if (!nextProps.disable && this.props.disable) {
      this.props.parent().addEventListener('scroll', this.handleScroll)

      if (this.props.calcHeightOnResize) {
        this.props.parent().addEventListener('resize', this.handleResize)
      }
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return (
      !shallowequal(this.props, nextProps) ||
      !shallowequal(this.state, nextState)
    )
  }

  componentDidUpdate(prevProps: IProps) {
    // If children have changed, remeasure height.
    if (prevProps.children !== this.props.children) {
      this.setHeightOffset()
    }
  }

  componentWillUnmount() {
    this.props.parent().removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('scroll', this.handleScroll)
    this.props.parent().removeEventListener('resize', this.handleResize)
  }

  setRef = (ref: any) => (this.inner = ref)

  setHeightOffset = () => {
    this.setState({
      height: this.inner.offsetHeight,
    })
    this.resizeTicking = false
  }

  getScrollY = () => {
    if (this.props.parent().pageYOffset !== undefined) {
      return this.props.parent().pageYOffset
    } else if (this.props.parent().scrollTop !== undefined) {
      return this.props.parent().scrollTop
    } else {
      return (document.documentElement || document.body.parentNode || document.body).scrollTop
    }
  }

  getViewportHeight = () => (
    window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight
  )

  getDocumentHeight = () => {
    const body = document.body
    const documentElement = document.documentElement

    return Math.max(
      body.scrollHeight, documentElement.scrollHeight,
      body.offsetHeight, documentElement.offsetHeight,
      body.clientHeight, documentElement.clientHeight
    )
  }

  getElementPhysicalHeight = (elm: any) => Math.max(
    elm.offsetHeight,
    elm.clientHeight
  )

  getElementHeight = (elm: any) => Math.max(
    elm.scrollHeight,
    elm.offsetHeight,
    elm.clientHeight,
  )

  getScrollerPhysicalHeight = () => {
    const parent = this.props.parent()

    return (parent === window || parent === document.body)
      ? this.getViewportHeight()
      : this.getElementPhysicalHeight(parent)
  }

  getScrollerHeight = () => {
    const parent = this.props.parent()

    return (parent === window || parent === document.body)
      ? this.getDocumentHeight()
      : this.getElementHeight(parent)
  }

  isOutOfBound = (currentScrollY: number) => {
    const pastTop = currentScrollY < 0

    const scrollerPhysicalHeight = this.getScrollerPhysicalHeight()
    const scrollerHeight = this.getScrollerHeight()

    const pastBottom = currentScrollY + scrollerPhysicalHeight > scrollerHeight

    return pastTop || pastBottom
  }

  handleScroll = () => {
    if (!this.scrollTicking) {
      this.scrollTicking = true
      raf(this.update)
    }
  }

  handleResize = () => {
    if (!this.resizeTicking) {
      this.resizeTicking = true
      raf(this.setHeightOffset)
    }
  }

  unpin = () => {
    this.props.onUnpin()

    this.setState({
      translateY: '100%',
      className: 'headroom headroom--unpinned',
      state: 'unpinned',
    })
  }

  pin = () => {
    this.props.onPin()

    this.setState({
      translateY: 0,
      className: 'headroom headroom--pinned',
      state: 'pinned',
    })
  }

  unfix = () => {
    this.props.onUnfix()

    this.setState({
      translateY: 0,
      className: 'headroom headroom--unfixed',
      state: 'unfixed',
    })
  }

  update = () => {
    this.currentScrollY = this.getScrollY()

    if (!this.isOutOfBound(this.currentScrollY)) {
      const { action } = shouldUpdate(
        this.lastKnownScrollY,
        this.currentScrollY,
        this.props,
        this.state
      )

      if (action === 'pin') {
        this.pin()
      } else if (action === 'unpin') {
        this.unpin()
      } else if (action === 'unfix') {
        this.unfix()
      }
    }

    this.lastKnownScrollY = this.currentScrollY
    this.scrollTicking = false
  }

  render() {
    const { className: userClassName, ...divProps } = this.props
    delete divProps.onUnpin
    delete divProps.onPin
    delete divProps.onUnfix
    delete divProps.disableInlineStyles
    delete divProps.disable
    delete divProps.parent
    delete divProps.children
    delete divProps.upTolerance
    delete divProps.downTolerance
    delete divProps.pinStart
    delete divProps.calcHeightOnResize

    const { style, wrapperStyle, ...rest } = divProps

    let innerStyle: any = {
      position: this.props.disable || this.state.state === 'unfixed' ? 'relative' : 'fixed',
      background: this.props.disable || this.state.state === 'unfixed' ? 'linear-gradient(white 60%, rgba(255, 255, 255, 0.75))' : '#f8f9fb',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      WebkitTransform: `translate3D(0, ${this.state.translateY}, 0)`,
      MsTransform: `translate3D(0, ${this.state.translateY}, 0)`,
      transform: `translate3D(0, ${this.state.translateY}, 0)`,
    }

    let className = this.state.className

    // Don't add css transitions until after we've done the initial
    // negative transform when transitioning from 'unfixed' to 'unpinned'.
    // If we don't do this, the header will flash into view temporarily
    // while it transitions from 0 — -100%.
    const transtion = 'background 250ms cubic-bezier(0.215, 0.61, 0.355, 1), transform 250ms cubic-bezier(0.215, 0.61, 0.355, 1), box-shadow 250ms cubic-bezier(0.215, 0.61, 0.355, 1)'
    innerStyle = {
      ...innerStyle,
      WebkitTransition: transtion,
      MozTransition: transtion,
      OTransition: transtion,
      transition: transtion,
      boxShadow: '0 3px 5px rgba(156, 166, 190, 0.15)'

    }
    className += ' headroom--scrolled'
    if (!this.props.disableInlineStyles) {
      innerStyle = {
        ...innerStyle,
        ...style,
      }
    } else {
      innerStyle = style
    }

    const wrapperStyles = {
      ...wrapperStyle,
      height: this.state.height ? this.state.height : undefined,
    }

    const wrapperClassName = userClassName
      ? `${userClassName} headroom-wrapper`
      : 'headroom-wrapper'

    return (
      <div style={wrapperStyles} className={wrapperClassName}>
        <div
          ref={this.setRef}
          {...rest}
          style={innerStyle}
          className={className}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}
