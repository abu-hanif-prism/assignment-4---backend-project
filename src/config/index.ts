import 'dotenv/config';

const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_ACCESS_SECRET',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET as string,
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '7d',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY as string,
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET as string,
};

export default config;
