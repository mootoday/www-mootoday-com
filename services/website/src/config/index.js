import ACTIVE_ENV from "./active-env";

const ENV_CONFIG = {
  dev: {},
  production: {}
};

export const getConfigValue = key => ENV_CONFIG[ACTIVE_ENV][key];