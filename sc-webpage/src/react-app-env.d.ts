/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GANACHE_URL: string;
      REACT_APP_CONTRACT_ADDRESS_MARKET_WEAPONS: string;
      REACT_APP_CONTRACT_ADDRESS_TIME_LOCK: string;
      REACT_APP_OWNER_CONTRACT_ADDRESS: string;
    }
}