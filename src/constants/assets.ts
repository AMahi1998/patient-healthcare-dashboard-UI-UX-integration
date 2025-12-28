export const ASSETS = {
  profiles: {
    jessica: '/images/Jessica Taylor.png',
    drJose: '/images/dr-jose.png'
  },
  navigation: {
    overview: '/svgs/overview-icon.svg',
    patients: '/svgs/patients-icon.svg',
    schedule: '/svgs/schedule-icon.svg',
    message: '/svgs/message-icon.svg',
    transactions: '/svgs/transaction-icon.svg',
    settings: '/svgs/settings-icon.svg',
    verticalSelect: '/svgs/vertical-select.svg',
    horizontalSelect: '/svgs/horizontal-select.svg'
  },
  health: {
    birth: '/svgs/birth-icon.svg',
    phone: '/svgs/phone-icon.svg',
    insurance: '/svgs/insurance-icon.svg',
    respiratory: '/svgs/respiratory-icon.svg',
    temperature: '/svgs/temperature-icon.svg',
    heartRate: '/svgs/heart-icon.svg'
  },
  actions: {
    download: '/svgs/download-icon.svg',
    arrowUp: '/svgs/arrow-up.svg',
    arrowDown: '/svgs/arrow-down.svg',
    search: '/svgs/search-icon.svg'
  },
  branding: {
    techCareLogo: '/svgs/logo.svg'
  }
};

export const getGenderIcon = (gender: string | undefined) => {
  const g = (gender || '').toLowerCase();
  if (g.includes('female') || g === 'f') {
    return '/svgs/female-icon.svg';
  }
  return '/svgs/male-icon.svg';
};

export const getProfileImage = (patientName: string | undefined) => {
  return ASSETS.profiles.jessica;
};
