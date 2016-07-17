const gulp = require ('gulp');
const debug = require ('gulp-debug');
const concat = require ('gulp-concat');
const sourcemaps = require ('gulp-sourcemaps');
const del = require ('del');

gulp.task('copy:files', function(){
	return 	gulp.src(['temp/**/*', '!temp/*.html', '!temp/**/*.{js,jsx,css,csx}' ])
			.pipe(debug({title:'all'}))
			.pipe(gulp.dest('public'));
});

gulp.task ('concat:css', function(){
	return gulp.src('temp/**/*.{css,csx}')
	.pipe(sourcemaps.init())
	.pipe(debug({title:'css1'}))
	.pipe(concat('styles.css'))
	.pipe(debug({title:'css2'}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('public/css'));
});

gulp.task ('concat:js', function(){
	return gulp.src('temp/**/*.{js,jsx}')
			.pipe(debug({title:'js1'}))
			.pipe(concat('mainscript.js'))
			.pipe(debug({title:'js2'}))
			.pipe(gulp.dest('public/js'));

});
gulp.task ('concat:index', function(){
	return gulp.src(['temp/Microsoft.html', 'temp/Dropbox_Business.html', 'temp/InVision.html', 'temp/Oculus.html', 'temp/Apple.html'])
			.pipe(debug({title:'html1'}))
			.pipe(concat('index.html'))
			.pipe(debug({title:'html2'}))
			.pipe(gulp.dest('public'));
});

gulp.task('clean', function() {
	return del('public');
});

// 'gulp.series' Will be work with gulp's version 4.0 and greater!
gulp.task('build', ['copy:files', 'concat:css', 'concat:js', 'concat:index'] );

gulp.watch( 'temp/**/*.{css,csx,js,jsx}', ['concat:css', 'concat:js'] );
