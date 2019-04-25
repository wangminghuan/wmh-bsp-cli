#!/usr/bin/env node --harmony
process.env.NODE_PATH = __dirname + '/../node_modules/';
const program = require('commander');

program
    .version(require('../package').version ); //版本号

program
    .usage('<command>');

program
    .command('init')          //命令
    .description('初始化项目') //描述（说明）
    .alias('i')              //取别名
    .action(() => {
        require('../command/init')();
    });

program
    .command('delete')
    .description('删除项目')
    .alias('d')
    .action(() => {
        require('../command/delete')();
    });

program.on('--help', () => {
    console.log('bootstrap静态UI脚手架');
    console.log('用命令wmh-bt init/i projectName来创建一个项目');
    console.log('用命令wmh-bt delete/d projectName删除指定项目');
});

program.parse(process.argv);

if(!program.args.length){
  program.help();
}