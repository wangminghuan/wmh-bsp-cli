module.exports=()=>{
  const inquirer = require('inquirer')
  const chalk = require('chalk');
  const fs = require('fs');
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
      delDir(res.projectName)
    }else{
      console.log(chalk.red('取消删除'));
    }
    
  })

  
  
  //循环删除文件和文件夹
  function delDir(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
        console.log(chalk.blue(`文件夹${path}删除成功`));
    }else{
      console.log(chalk.red('目录不存在'));
    }
  }
}