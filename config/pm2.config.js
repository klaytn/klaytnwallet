
module.exports = {
  apps: [{
    name: process.env.PM2_NAME,
    script: process.env.PM2_SCRIPT,
    args: process.env.PM2_ARGS || '',

    instances: process.env.PM2_INSTANCE || 1,
    merge_logs: true,

    output: process.env.PM2_OUTPUT,
    error: process.env.PM2_ERROR,
  }],
};
