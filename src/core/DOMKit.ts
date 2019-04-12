declare global {
  interface CustomEvent {
    handled: boolean
    alt: boolean
    shift: boolean
    ctrl: boolean
    x: number
    y: number
  }
}

export namespace DOMKit {
  export function CreateHiddenTag({ tag = 'div', content = '', css = new Array<Array<string>>() } = {}): HTMLElement {
    let element = document.createElement(tag)
    element.innerHTML = content
    element.style.cssText = css.concat(['position: absolute', 'pointer-events: none', 'opacity: 0']).join('!important; ')
    document.body.appendChild(element)
    return element
  }

  export function CreateEvent(type: string, sourceEvent: Event): CustomEvent {
    let event = new CustomEvent(type, { bubbles: false })
    event.handled = false
    if (sourceEvent instanceof MouseEvent) {
      event.alt = sourceEvent.altKey
      event.shift = sourceEvent.shiftKey
      event.ctrl = sourceEvent.ctrlKey
      event.x = sourceEvent.pageX
      event.y = sourceEvent.pageY
    } else if (sourceEvent instanceof TouchEvent) {
      event.alt = sourceEvent.altKey
      event.shift = sourceEvent.shiftKey
      event.ctrl = sourceEvent.ctrlKey
      event.x = sourceEvent.changedTouches[0].pageX
      event.y = sourceEvent.changedTouches[0].pageY
    }
    event.stopPropagation = () => sourceEvent.stopPropagation()
    event.stopImmediatePropagation = () => sourceEvent.stopImmediatePropagation()
    event.preventDefault = () => sourceEvent.preventDefault()
    return event
  }
}
