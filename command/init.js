module.exports=()=>{
  const download = require('download-git-repo'); //通过git仓库拉取
  const inquirer = require('inquirer')
  const process = require('child_process'); //引入子进程模块
  const ora = require('ora');   //ora用来提升用户体验
  const source = 'wangminghuan/bootstrap-static-ui';
  const spinner = ora(`正在下载项目模板，源地址为：https://github.com/${source}.git`);
  const spinnerInstall = ora(`正在安装依赖，请稍后`);
  inquirer.prompt([{
    type: 'input',
    message: '请输入项目名称：',
    name: 'projectName',
    default: "my-template-project", // 默认值
    validate: function(val) {
      if(!val) { // 校验位数
        return "请输入有效项目名称！";
      }else{
        return true
      }
    }
  }]).then(res=> {
    spinner.start();
    const target = res.projectName;
    downHub(target)
  })
   
  //拉取仓库代码
  function downHub(target){
     new Promise(function(resolve, reject) {
      download(source, target, { clone: true },
      (err) => {    
        if (err) {
          console.error(err);
          spinner.fail('连接超时！');
          reject(err);
        } else {
          resolve(target);
        }
      })
    }).then(target => {
      spinner.succeed('拉取成功，项目路径为：'+target);
      openAndInstallDep(target);
    }).catch(err => {
        spinner.fail('拉取失败');
    });
  }
  
   //打开文件夹，安装依赖
   function openAndInstallDep(target){
    spinnerInstall.start();
    process.exec(`cd ${target} && npm install`,function (error, stdout, stderr) {
      if (error !== null) {
        spinnerInstall.fail('exec error: ' + error);
      }else{
        spinnerInstall.succeed("安装完毕，打开目录，运行项目即可");
      }
    });
   }
}