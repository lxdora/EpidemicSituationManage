const koa = require('koa');
const app = new koa();
const router = require('./src/routers')
const path = require('path')


const {koaBody} = require('koa-body')
app.use(koaBody())

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  const today = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
  const log_file = path.resolve(__dirname,'src/logs', today+'.txt');
  const fs = require('fs/promises');
  const log_text = `${ctx.method} ${ctx.url} - ${rt}-request-body:${JSON.stringify(ctx.request.body)}`;
  try{
    await fs.access(log_file, fs.constants.R_OK|fs.constants.W_OK);
  }catch{
    fs.writeFile(log_file, log_text, (err)=>{
      if(err){
        console.log(`创建文件${log_file}失败`);
      }
    })
  }
  try{
    fs.appendFile(log_file, log_text, (err)=>{
      if(err){
        console.log('记录日志失败')
      }
    })
  }catch(err){
    console.log('追加日志失败',err)
  }
});

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)