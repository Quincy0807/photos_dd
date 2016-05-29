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
  const src = ['controllers', 'js']

  for(let path of src){
    if(!fs.existsSync(path)){
      console.log(`clear ${path}`)
      fs.mkdirSync(path)
    }
    console.log(`translating: build/${path}`)
    gulp.src(`build/${path}/*.js`).pipe(babel(babel_opts)).pipe(gulp.dest(`${path}`))
  }

})

gulp.task('default', ['translate']
);
