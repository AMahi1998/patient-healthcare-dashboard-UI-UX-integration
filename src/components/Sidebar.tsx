import PropTypes from "prop-types";
import { ASSETS } from "../constants/assets";
import { COLORS, SPACING } from "../constants/theme";
import { componentLogger } from "../utils/logger";

const NAV_ITEMS = [
  { label: 'Overview', icon: ASSETS.navigation.overview, active: false },
  { label: 'Patients', icon: ASSETS.navigation.patients, active: true },
  { label: 'Schedule', icon: ASSETS.navigation.schedule, active: false },
  { label: 'Message', icon: ASSETS.navigation.message, active: false },
  { label: 'Transactions', icon: ASSETS.navigation.transactions, active: false }
];

const DOCTOR_PROFILE = {
  name: 'Dr. Jose Simmons',
  role: 'General Practitioner',
  image: ASSETS.profiles.drJose
};

export default function Sidebar() {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: SPACING.lg,
      backgroundColor: COLORS.white,
      borderRadius: '16px',
      borderBottom: 'none',
      margin: SPACING.md,
      padding: `${SPACING.md} ${SPACING.lg}`,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
      whiteSpace: 'nowrap',
      overflow: 'visible'
    },
    logo: {
      flexShrink: 0,
      minWidth: 'fit-content'
    },
    logoImg: {
      height: '32px',
      width: 'auto'
    },
    navContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.xs,
      color: 'rgb(112, 128, 144)',
      flex: 1,
      marginLeft: SPACING.lg,
      minWidth: 0
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.md,
      flexShrink: 0,
      minWidth: 'fit-content'
    },
    profileSection: {
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.xs
    },
    profileImage: {
      width: '36px',
      height: '36px',
      borderRadius: '50%'
    },
    profileInfo: {
      fontSize: '13px'
    },
    profileName: {
      fontWeight: '600',
      color: COLORS.textDark,
      margin: '0'
    },
    profileRole: {
      color: COLORS.textMuted,
      margin: '0',
      fontSize: '11px'
    },
    actionIcons: {
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.xs
    },
    actionIcon: {
      width: '18px',
      height: '18px',
      cursor: 'pointer'
    }
  };

  return (
    <nav style={styles.container}>
      <div style={styles.logo}>
        <img
          src={ASSETS.branding.techCareLogo}
          alt="TechCare"
          style={styles.logoImg}
        />
      </div>

      <div style={styles.navContainer}>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.label} item={item} />
        ))}
      </div>

      <div style={styles.rightSection}>
        <div style={styles.profileSection}>
          <img
            src={DOCTOR_PROFILE.image}
            alt={DOCTOR_PROFILE.name}
            style={styles.profileImage}
          />
          <div style={styles.profileInfo}>
            <p style={styles.profileName}>{DOCTOR_PROFILE.name}</p>
            <p style={styles.profileRole}>{DOCTOR_PROFILE.role}</p>
          </div>
        </div>
        <div style={styles.actionIcons}>
          <img
            src={ASSETS.navigation.settings}
            alt="Settings"
            style={styles.actionIcon}
          />
          <img
            src={ASSETS.navigation.verticalSelect}
            alt="More options"
            style={styles.actionIcon}
          />
        </div>
      </div>
    </nav>
  );
}

/**
 * NavItem Component - Individual navigation menu item
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.item - Navigation item configuration
 * @returns {JSX.Element} Rendered navigation item
 */
function NavItem({ item }) {
  const itemStyles = {
    container: {
      cursor: 'pointer',
      transition: 'all 0.15s ease-in-out',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontWeight: item.active ? '600' : '500',
      fontSize: '13px',
      color: item.active ? COLORS.textDark : 'rgb(112, 128, 144)',
      whiteSpace: 'nowrap',
      padding: '4px 10px',
      borderRadius: item.active ? '16px' : '0px',
      backgroundColor: item.active ? '#d1faf8' : 'transparent',
      flexShrink: 0,
      ':hover': {
        color: item.active ? 'rgb(0, 128, 128)' : 'rgb(0, 150, 150)'
      }
    },
    icon: {
      width: '16px',
      height: '16px',
      display: 'inline-block'
    }
  };

  return (
    <div style={itemStyles.container}>
      <img
        src={item.icon}
        alt={item.label}
        style={itemStyles.icon}
      />
      {item.label}
    </div>
  );
}

NavItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
  }).isRequired
};

Sidebar.propTypes = {};
