import ACTIVE_ENV from "./active-env";

export const EMAIL_VERIFICATION_CONTINUE_BASE_URL =
  "EMAIL_VERIFICATION_CONTINUE_BASE_URL";
export const FIREBASE_CONFIG = "FIREBASE_CONFIG";
export const GA_TRACKING = "GA_TRACKING";

const ENV_CONFIG = {
  dev: {
  },
  production: {
    [GA_TRACKING]: "UA-112469013-1"
  }
};

export const getConfigValue = key => ENV_CONFIG[ACTIVE_ENV][key];