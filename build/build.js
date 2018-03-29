'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const fs = require('fs')
const archiver = require('archiver')

const spinner = ora('building for production...')
spinner.start()

webpackConfig.plugins.push(new webpack.ProgressPlugin(function (percentage, msg) {
    if (percentage === 1) {
      let output = fs.createWriteStream(path.resolve(__dirname, '..', 'zifisense_web.zip'));
      output.on('close', function () {
          console.log('success')
      })
        let archive = archiver('zip', {
          zlib: {level: 9}
        })
        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
            } else {
                // throw error
                throw err;
            }
        })
        archive.on('error', function (err) {
            throw err;
        });
        archive.pipe(output);
        archive.directory(path.join(__dirname, '../dist'), false);
        archive.finalize();
    }
}))

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
