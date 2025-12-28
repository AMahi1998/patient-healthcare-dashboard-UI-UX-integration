
import { COLORS, SPACING, SHADOW, BORDER_RADIUS, TYPOGRAPHY } from './theme';

export const boxStyles = {
  base: {
    backgroundColor: COLORS.background.white,
    borderRadius: BORDER_RADIUS.sm,
    border: `1px solid ${COLORS.border.light}`,
    boxShadow: SHADOW.sm
  },
  container: (padding = SPACING.lg) => ({
    ...boxStyles.base,
    padding,
    display: 'flex',
    flexDirection: 'column'
  }),
  scrollable: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    scrollbarColor: `${COLORS.primary.dark} ${COLORS.border.lighter}`
  }
};

/**
 * Heading styles
 */
export const headingStyles = {
  section: {
    ...TYPOGRAPHY.heading,
    color: COLORS.primary.dark,
    margin: '0',
    marginBottom: SPACING.md,
    textAlign: 'left',
    width: '207px',
    height: '33px',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0
  }
};

/**
 * Flex layout styles
 */
export const flexStyles = {
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  centerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

/**
 * Common button styles
 */
export const buttonStyles = {
  primary: {
    backgroundColor: COLORS.status.success,
    border: 'none',
    borderRadius: '24px',
    color: COLORS.primary.dark,
    fontSize: '11px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    padding: `${SPACING.sm} ${SPACING.md}`,
    width: '100%',
    textAlign: 'center',
    marginTop: SPACING.sm,
    ':hover': {
      backgroundColor: COLORS.status.warning,
      transform: 'translateY(-2px)'
    }
  }
};

/**
 * Merge multiple style objects
 */
export const mergeStyles = (...styles) => {
  return Object.assign({}, ...styles);
};
