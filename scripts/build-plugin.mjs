import fs from 'node:fs/promises'
import { statSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import chalk from 'chalk'

const sourceSrc = path.join(process.cwd(), 'dist')
const targetSrc = path.join(process.cwd(), 'browserPlugin')
// fs/promises写法
function move(sourceRoot, targetRoot) {
  console.debug(chalk.green(`开始移动${sourceRoot}中的文件至${targetRoot}`))
  fs.readdir(sourceRoot)
    .then((files) => {
      files.forEach((file) => {
        const sourceFile = path.join(sourceRoot, file)
        const targetFile = path.join(targetRoot, file)

        if (statSync(sourceFile).isDirectory()) {
          fs.stat(targetFile)
            .catch((err) => {
              if (err.code === 'ENOENT') {
                // 在targetSrc中新建同名文件夹
                fs.mkdir(targetFile)
                  .then(() => {
                    console.debug(chalk.green(`新建${targetFile}文件夹成功`))
                  })
                  .catch((err) => {
                    console.debug(chalk.red(`新建失败ERROR:${err}`))
                  })
              }
              else {
                console.debug(chalk.red(`新建失败ERROR:${err}`))
              }
            })
          move(sourceFile, targetFile)
        }
        else {
          const copyFn = () => {
            fs.copyFile(sourceFile, targetFile)
              .catch(() => {
                console.debug(chalk.red('复制失败'))
              })
          }
          fs.unlink(targetFile)
            .then(() => {
              copyFn()
            })
            .catch(() => {
              copyFn()
            })
        }
      })
    })
  console.debug(chalk.green('复制成功'))
}
// fs写法
// fs.readdir(sourceSrc, (err, files) => {
//     if (err) {
//         console.debug("读取文件夹失败");
//     } else {
//         files.forEach((file) => {
//             const sourceFile = path.join(sourceSrc, file);
//             const targetFile = path.join(targetSrc, file);
//             fs.unlink(targetFile, (err) => {
//                 if (!err || err.code !== "ENOENT") {
//                     fs.copyFile(sourceFile, targetFile, (err) => {
//                         if (err) {
//                             console.debug("复制失败");
//                         } else {
//                             console.debug("复制成功")
//                         }
//                     })
//                 } else {
//                     console.debug("删除失败");
//                 }
//             })

//         });
//     }
// })
fs.stat(targetSrc)
  .then((result) => {
    if (result.isDirectory())
      move(sourceSrc, targetSrc)
    else
      console.debug(chalk.red('browserPlugin不是一个文件夹'))
  })
  .catch((err) => {
    if (err.code === 'ENOENT') {
      // 新建browserPlugin文件夹
      fs.mkdir('browserPlugin')
        .then(() => {
          move(sourceSrc, targetSrc)
        })
        .catch((err) => {
          console.debug(chalk.red(`新建失败ERROR:${err}`))
        })
    }
    else {
      console.error(chalk.red('发生错误:', err))
    }
  })
