import { IProps, IState } from '.';
export default function (
  lastKnownScrollY = 0,
  currentScrollY = 0,
  props: IProps | any = {},
  state: IState | any = {}
) {
  const scrollDirection = currentScrollY >= lastKnownScrollY ? 'down' : 'up'

  const distanceScrolled = Math.abs(currentScrollY - lastKnownScrollY)
  if (
    scrollDirection === 'up' &&
    state.state === 'unpinned'
  ) {

    return {
      action: 'pin',
      scrollDirection,
      distanceScrolled,
    }
  } else if (
    scrollDirection === 'down' &&
    state.state === 'pinned'
  ) {

    return {
      action: 'unpin',
      scrollDirection,
      distanceScrolled,
    }
  } else if (
    scrollDirection === 'up' &&
    ['pinned', 'unfixed'].indexOf(state.state) < 0
  ) {
    return {
      action: 'pin',
      scrollDirection,
      distanceScrolled,
    }
  } else {

    return {
      action: 'none',
      scrollDirection,
      distanceScrolled,
    }
  }

}
