const validateEnvironment = () => {
  const requiredEnvVariables = [
    'PORT',
    'JAWSDB_MARIA_URL',
    'ENVIRONMENT',
  ];

  requiredEnvVariables.forEach(variableName => {
    if (!process.env[variableName]) {
      console.error(`Environment variable ${variableName} not provided`);
      process.exit(1);
    }
  });
};

module.exports = validateEnvironment;
