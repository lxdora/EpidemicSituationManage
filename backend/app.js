const koa = require('koa');
const app = new koa();
import router from './router'
// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  const today = new Date().toDateString();
  const log_file = `./src/logs/${today}.txt`;
  const fs = require('fs/promises');
  const log_text = `${ctx.method} ${ctx.url} - ${rt}`;
  try{
    await fs.access(log_file, fs.constants.R_OK|fs.constants.W_OK);
  }catch{
    fs.writeFile(log_file, log_text, (err)=>{
      if(err){
        console.log(`创建文件${log_file}失败`);
      }
    })
  }
  fs.appendFile(log_file, log_text, (err)=>{
    if(err){
      console.log('记录日志失败')
    }
  })
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

const koaBody = require('koa-body')
app.use(koaBody({
  jsonLimit: '1kb'
}))
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)