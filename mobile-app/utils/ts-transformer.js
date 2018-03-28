const ts = require('typescript');
const origin = require('metro-bundler/src/transformer').transform;
const SourceMap = require('source-map');

function decodeSourceMap(map) {
  const smc = new SourceMap.SourceMapConsumer(map);
  const ret = [];
  smc.eachMapping(m => {
    if (m.name) {
      ret.push([m.generatedLine, m.generatedColumn, m.originalLine, m.originalColumn, m.name]);
    } else {
      ret.push([m.generatedLine, m.generatedColumn, m.originalLine, m.originalColumn]);
    }
  });
  return ret;
}

exports.transform = function(options) {
  if (/\.tsx?$/.test(options.filename)) {
    const out = ts.transpileModule(
      options.src,
      Object.assign(
        {
          fileName: options.filename
        },
        require('../tsconfig.json')
      )
    );

    //var smc = new SourceMapConsumer();
    const map = JSON.parse(out.sourceMapText);

    return {
      code: out.outputText,
      filename: options.filename,
      map: options.generateSourceMaps ? map : decodeSourceMap(map)
    };
  }
  return origin(options);
};
