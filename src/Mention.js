import React from 'react'
import PropTypes from 'prop-types'
import useStyles from 'substyle'

const defaultStyle = {
  fontWeight: 'inherit',
}

const Mention = ({
  display,
  style,
  className,
  classNames,
  id,
  onClick,
  onRightClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const styles = useStyles(defaultStyle, { style, className, classNames })
  const ref = React.useRef(null)

  const eventHandler = (event, funct) => {
    if (funct) funct(id, display)
  }

  const handleClick = (event) => {
    event.stopPropagation()
    eventHandler(event, onClick)
  }

  const handleRightClick = (event) => {
    event.preventDefault()
    eventHandler(event, onRightClick)
  }

  const handleMouseEnter = (event) => {
    eventHandler(event, onMouseEnter)
  }

  const handleMouseLeave = (event) => {
    eventHandler(event, onMouseLeave)
  }

  React.useEffect(() => {
    if (ref && ref.current) ref.current.addEventListener('click', handleClick)

    return () => {
      if (ref && ref.current)
        ref.current.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <strong
      ref={ref}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...styles}
    >
      {display}
    </strong>
  )
}

Mention.propTypes = {
  /**
   * Called when a new mention is added in the input
   *
   * Example:
   *
   * ```js
   * function(id, display) {
   *   console.log("user " + display + " was mentioned!");
   * }
   * ```
   */
  onAdd: PropTypes.func,
  onClick: PropTypes.func,
  onRemove: PropTypes.func,

  renderSuggestion: PropTypes.func,

  trigger: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(RegExp),
  ]),
  markup: PropTypes.string,
  displayTransform: PropTypes.func,
  /**
   * If set to `true` spaces will not interrupt matching suggestions
   */
  allowSpaceInQuery: PropTypes.bool,

  isLoading: PropTypes.bool,
}

Mention.defaultProps = {
  trigger: '@',
  markup: '@[__display__](__id__)',
  displayTransform: function(id, display) {
    return display || id
  },
  onAdd: () => null,
  onClick: () => null,
  onMouseEnter: () => null,
  onMouseLeave: () => null,
  onRemove: () => null,
  onRightClick: () => null,
  renderSuggestion: null,
  isLoading: false,
  appendSpaceOnAdd: false,
}

export default Mention
