# static page skeleton

A skeleton for building a static page. In this case a onepager using [nunjucks][1], [scss][2] and [gulp][3] to build html, css and js from the sources.

## Getting started

1. Download/checkout the main package and extract  
`git clone https://github.com/sunixzs/static-page-skeleton.git`
1. Go into the newly created directory  
`cd static-page-skeleton`
1. Get the composer packages with  
`composer update`
1. Get the npm packages with  
`yarn` or `npm install`
1. Build the page with  
either `gulp build --development`  
or `gulp build --staging`  
or `gulp build --production`

`gulp build` combines several tasks for generating the output in the folders _./development_, _./staging_ and _./production_. Have a look into _./gulpfile.js_ where you can find many more tasks for _scss_, _js_ and _nunjucks_ with their _watch_-tasks while development.

In _./gulpfile.js/config.js_ all is defined for using the gulp tasks.

In _./data*.json_ you can define variables for _nunjucks_ p.e. to set an _baseUrl_.

## License

MIT - sunixzs - see [license](LICENSE)

[1]: https://mozilla.github.io/nunjucks/
[2]: https://sass-lang.com/
[3]: https://gulpjs.com/
