const { REACT_APP_JITSI_SERVICE_URL } = process.env;

const missingValues = Object.entries({
  REACT_APP_JITSI_SERVICE_URL
}).filter(([, val]) => !val);

if (missingValues.length) {
  console.table(missingValues);
  alert(`env vars not set - check console`);
}

export const JITSI_SERVICE_URL = REACT_APP_JITSI_SERVICE_URL || '';
