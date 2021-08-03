module.exports = {
    apps : [{
      name   : "yourapplication-name",
      script : "/var/www/{yourapplication-directory}/src/start/server.js",
      watch: true,
      exec_interpreter: "/home/ubuntu/.nvm/versions/node/v16.5.0/bin/node",
      env_production: {
        "PORT": "3055",
        "DATABASE": "su-activity"
      }
    }]
  }