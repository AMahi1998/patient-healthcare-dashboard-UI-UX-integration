import PropTypes from "prop-types";
import { ASSETS } from "../constants/assets";
import { COLORS, SPACING, TYPOGRAPHY } from "../constants/theme";
import { componentLogger } from "../utils/logger";

/** Topbar header configuration */
const TOPBAR_CONFIG = {
  title: 'Dashboard',
  doctor: {
    name: 'Dr. Jose Simmons',
    role: 'General Practitioner',
    image: ASSETS.profiles.drJose
  }
};

/**
 * Topbar Component - Top navigation bar with dashboard title and doctor info
 * @component
 * @returns {JSX.Element} Rendered topbar
 */
export default function Topbar() {
  const styles = {
    container: {
      backgroundColor: COLORS.white,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: SPACING.lg,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: TYPOGRAPHY.xl,
      fontWeight: 'bold',
      color: COLORS.textDark
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.md
    },
    profileContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: SPACING.xs
    },
    profileImage: {
      width: '40px',
      height: '40px',
      borderRadius: '50%'
    },
    profileInfo: {
      fontSize: '14px'
    },
    profileName: {
      fontWeight: '600',
      color: COLORS.textDark,
      margin: '0'
    },
    profileRole: {
      color: COLORS.textMuted,
      fontSize: '12px',
      margin: '0'
    },
    settingsIcon: {
      width: '20px',
      height: '20px',
      color: COLORS.textMuted,
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div>
        <h1 style={styles.title}>{TOPBAR_CONFIG.title}</h1>
      </div>

      <div style={styles.rightSection}>
        <div style={styles.profileContainer}>
          <img
            src={TOPBAR_CONFIG.doctor.image}
            alt={TOPBAR_CONFIG.doctor.name}
            style={styles.profileImage}
          />
          <div style={styles.profileInfo}>
            <p style={styles.profileName}>{TOPBAR_CONFIG.doctor.name}</p>
            <p style={styles.profileRole}>{TOPBAR_CONFIG.doctor.role}</p>
          </div>
        </div>
        <img
          src={ASSETS.navigation.settings}
          alt="Settings"
          style={styles.settingsIcon}
        />
      </div>
    </div>
  );
}

Topbar.propTypes = {};
