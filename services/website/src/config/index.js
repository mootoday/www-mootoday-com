import ACTIVE_ENV from "./active-env";

export const GA_TRACKING = "GA_TRACKING";

const ENV_CONFIG = {
  dev: {
  },
  production: {
    [GA_TRACKING]: "G-5G8K1ML8SC"
  }
};

export const getConfigValue = key => ENV_CONFIG[ACTIVE_ENV][key];