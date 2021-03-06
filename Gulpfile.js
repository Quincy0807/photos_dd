const gulp = require('gulp');
const babel = require('gulp-babel')
const fs = require('fs')
const webpack = require('webpack-stream')


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
  const src = ['controllers']

  for(let path of src){
    if(!fs.existsSync(path)){
      console.log(`clear ${path}`)
      fs.mkdirSync(path)
    }
    console.log(`translating: build/${path}`)
    gulp.src(`build/${path}/*.js`).pipe(babel(babel_opts)).pipe(gulp.dest(`${path}`))
  }
  gulp.src('build/server.js').pipe(babel(babel_opts)).pipe(gulp.dest('.'))

})

gulp.task('default', ['translate']);

gulp.task('watch', () => {
  gulp.watch('build/controllers/*.js',['translate'])
})
