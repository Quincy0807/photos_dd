const gulp = require('gulp');
const babel = require('gulp-babel')
const fs = require('fs')
// var jshint = require('gulp-jshint');
// var mocha = require('gulp-mocha');


//
// // jshint files
// gulp.task('jshint', function() {
//     gulp.src(['test/**/*.js'])
//         .pipe(jshint())
//         .pipe(jshint.reporter());
// });
//
//
// gulp.task('test', function() {
//     gulp.src('test/**/*.js')
//         .pipe(mocha({ reporter: 'spec' }));
// });

gulp.task('translate', () =>{
  const package_json = JSON.parse(fs.readFileSync('package.json'))
  const babel_opts = package_json.babel
  const [src,target] = [['controllers'], 'translate']
  if(!fs.existsSync(target)){
    fs.mkdirSync(target)
  }

  for(let path of src){
    const current_target = `${target}/${path}`
    console.log(`translating ${current_target}`)
    if(fs.exists(`${current_target}`)){
      fs.unlinkSync(`${current_target}`)
    }
    return gulp.src(`${path}/*.js`).pipe(babel(babel_opts)).pipe(gulp.dest(`${target}/${path}`))

  }

})

gulp.task('default', ['translate']
);
