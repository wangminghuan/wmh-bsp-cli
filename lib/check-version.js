const request = require('request')
const chalk = require('chalk')
const semver = require('semver') //语义化分析，比较版本号等操作
const packageConfig = require('../package.json')

module.exports = done => {

  request({
    url: 'https://registry.npmjs.org/wmh-bsp-cli',
    timeout: 1000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      const latestVersion = JSON.parse(body)['dist-tags'].latest
      const localVersion = packageConfig.version
      if (semver.lt(localVersion, latestVersion)) {
        console.log(chalk.yellow('  A newer version is available.'))
        console.log()
        console.log('  latest:    ' + chalk.green(latestVersion))
        console.log('  installed: ' + chalk.red(localVersion))
        console.log()
      }else{
        console.log()
        console.log(chalk.yellow('Updated to the latest version.'))
        console.log()
      }
    }
    done()
  })
}
