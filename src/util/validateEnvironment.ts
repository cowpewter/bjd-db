const validateEnvironment = () => {
  const requiredEnvVariables = [
    'PORT',
    'JAWSDB_MARIA_URL',
    'ENVIRONMENT',
    'JWT_SECRET',
    'S3_ACCESS_KEY',
    'S3_SECRET',
    'S3_BUCKET',
  ];

  requiredEnvVariables.forEach((variableName: string) => {
    if (!process.env[variableName]) {
      console.error(`Environment variable ${variableName} not provided`);
      process.exit(1);
    }
  });
};

export default validateEnvironment;
