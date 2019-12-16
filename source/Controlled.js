import React, { StrictMode, memo, useCallback, useRef, useState } from 'react'
import {
  bool,
  func,
  instanceOf,
  node,
  number,
  object,
  oneOfType,
  string
} from 'prop-types'
import ControlledActivated from './ControlledActivated'
import cn from './Main.css'
import sharedCn from './Shared.css'

const Controlled = ({
  children,
  closeText,
  isZoomed: isActive,
  overlayBgColorEnd,
  overlayBgColorStart,
  portalEl,
  onZoomChange,
  openText,
  scrollableEl,
  transitionDuration,
  zoomMargin
}) => {
  const [isChildLoaded, setIsChildLoaded] = useState(false)
  const wrapRef = useRef(null)
  const btnRef = useRef(null)

  const handleClickTrigger = useCallback(
    e => {
      if (!isActive) {
        e.preventDefault()
        onZoomChange(true)
      }
    },
    [isActive, onZoomChange]
  )

  const handleChildLoad = useCallback(() => {
    setIsChildLoaded(true)
  }, [])

  const handleChildUnload = useCallback(() => {
    setIsChildLoaded(false)

    if (btnRef.current) {
      btnRef.current.focus()
    }
  }, [])

  const className = isChildLoaded ? cn.wrapHidden : cn.wrap
  const btnCn = `${sharedCn.trigger} ${cn.btn}`

  return (
    <StrictMode>
      <div className={className} ref={wrapRef}>
        {children}
        <button
          aria-label={openText}
          className={btnCn}
          onClick={handleClickTrigger}
          ref={btnRef}
          type="button"
        />
        <ControlledActivated
          closeText={closeText}
          isActive={isActive}
          onLoad={handleChildLoad}
          onUnload={handleChildUnload}
          onZoomChange={onZoomChange}
          overlayBgColorEnd={overlayBgColorEnd}
          overlayBgColorStart={overlayBgColorStart}
          parentRef={wrapRef}
          portalEl={portalEl}
          scrollableEl={scrollableEl}
          transitionDuration={transitionDuration}
          zoomMargin={zoomMargin}
        >
          {children}
        </ControlledActivated>
      </div>
    </StrictMode>
  )
}

Controlled.propTypes = {
  children: node.isRequired,
  closeText: string.isRequired,
  isZoomed: bool.isRequired,
  onZoomChange: func.isRequired,
  openText: string.isRequired,
  overlayBgColorEnd: string.isRequired,
  overlayBgColorStart: string.isRequired,
  portalEl: instanceOf(Element).isRequired,
  scrollableEl: oneOfType([object, instanceOf(Element), instanceOf(Window)])
    .isRequired,
  transitionDuration: number.isRequired,
  zoomMargin: number.isRequired
}

Controlled.defaultProps = {
  closeText: 'Unzoom image',
  isZoomed: false,
  onZoomChange: Function.prototype,
  openText: 'Zoom image',
  overlayBgColorEnd: 'rgba(255, 255, 255, 0.95)',
  overlayBgColorStart: 'rgba(255, 255, 255, 0)',
  portalEl: document.body,
  scrollableEl: window,
  transitionDuration: 300,
  zoomMargin: 0
}

export default memo(Controlled)