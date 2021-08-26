import {
  Transition,
  cloneVNode
} from 'vue'

import {
  getFirstValidNode
} from 'd2-projects/d2-utils/vnode.js'

export function renderTrigger (trigger, extraProps) {
  const firstElement = getFirstValidNode(trigger, 1)
  if (!firstElement) console.log('trigger expects single rooted node')
  return cloneVNode(firstElement, extraProps, true)
}

export function renderPopper (children, props) {
  return (
    <Transition name="fade">
      <div {...props}>
        { children }
      </div>
    </Transition>
  )
}