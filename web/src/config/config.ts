const ENV = process.env.REACT_APP_ENV || "local";

interface ConfigNode {
  API_HOST?: string;
  API_PATH?: string;
  TEST_VAR?: string;
}

interface Prop {
  [key: string]: ConfigNode;
}

/**
 * Add application common configuration.
 */
const CommonConfig: ConfigNode = {};

/**
 * Add application config environment specific
 * local / dev / prod
 */
const EnvConfig: Prop = {
  local: {
    API_HOST: "http://localhost:3001",
    API_PATH: "/api/v1",
  },
  dev: {
    API_HOST: "http://localhost:3001",
    API_PATH: "/api/v1",
  },
  prod: {
    API_HOST: "http://localhost:3001",
    API_PATH: "/api/v1",
  },
};

export default { ...CommonConfig, ...EnvConfig[ENV] };
