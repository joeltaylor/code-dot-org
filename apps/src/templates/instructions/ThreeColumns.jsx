import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

/**
 * A component that lays out children in three columns (left, center, right),
 * where left/right widths are specified and center is the remainder. This is
 * done largely to separate some of the semi-complicated styling.
 */

const ThreeColumns = (props) => {
  const { isRtl, styles, leftColWidth, rightColWidth, height, children, allowScrolling } = props;

  const defaultStyles = {
    container: {
      paddingLeft: isRtl ? rightColWidth : leftColWidth,
      paddingRight: isRtl ? leftColWidth: rightColWidth,
      float: isRtl ? 'right' : 'left',
      width: '100%',
      boxSizing: 'border-box'
    },
    middle: {
      width: '100%',
      position: 'relative',
      float: isRtl ? 'right' : 'left',
      height
    },
    left: {
      position: 'relative',
      float: isRtl ? 'right' : 'left',
      width: leftColWidth,
      right: leftColWidth,
      marginLeft: isRtl ? 0 : '-100%',
      marginRight: isRtl ? '-100%' : 0,
    },
    right: {
      position: 'relative',
      float: isRtl ? 'right' : 'left',
      width: rightColWidth,
      marginRight: isRtl ? 0 : -rightColWidth,
      marginLeft: isRtl ? -rightColWidth : 0,
    }
  };

  if (allowScrolling) {
    Object.assign(defaultStyles.middle, {
      marginRight: isRtl ? undefined : -300,
      paddingRight: isRtl ? undefined : 300,
      marginLeft: isRtl ? -300 : undefined,
      paddingLeft: isRtl ? 300 : undefined,
      overflowY: 'scroll',
    });
  }

  return (
    <div style={[defaultStyles.container, styles.container]}>
      <div style={[defaultStyles.middle, styles.middle]}>{children[1]}</div>
      <div style={[defaultStyles.left, styles.left]}>{children[0]}</div>
      <div style={[defaultStyles.right, styles.right]}>{children[2]}</div>
    </div>
  );
};

ThreeColumns.propTypes = {
  styles: React.PropTypes.object,
  leftColWidth: React.PropTypes.number,
  rightColWidth: React.PropTypes.number,
  height: React.PropTypes.number,
  isRtl: React.PropTypes.bool.isRequired,
  allowScrolling: React.PropTypes.bool,
  children: React.PropTypes.node,
  customProp: (props) => {
    if (props.children.length !== 3) {
      throw new Error('ThreeColumns expects exactly 3 children, got ' +
        props.children.length);
    }
  }
};

export default connect(state => {
  return {
    isRtl: state.pageConstants.localeDirection === 'rtl',
  };
})(Radium(ThreeColumns));
