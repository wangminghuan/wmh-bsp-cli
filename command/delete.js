module.exports=()=>{
  const inquirer = require('inquirer')
  const chalk = require('chalk');
  const rm = require('rimraf')
  inquirer.prompt([{
    type: 'input',
    message: '请输入要删除的项目名称：',
    name: 'projectName'
  },{
    type: "confirm",
    message: "确定删除？",
    name: "delete",
    when: function(answers) { // 当watch为true的时候才会提问当前问题
      return !!answers.projectName
    }
  }
  ]).then(res=> {
    if(res.delete){
      rm(res.projectName,[],()=>{
        console.log(chalk.blue(`文件夹${res.projectName}删除成功`));
      })
    }else{
      console.log(chalk.red('取消删除'));
    }
  })
}