module.exports = {
  fileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  excludeRegExp: ['node_modules', '.next'],
  tsConfig: './tsconfig.json',
  baseDir: '.',
  detectiveOptions: {
    ts: {
      skipTypeImports: false,
      mixedImports: true,
    },
    tsx: {
      skipTypeImports: false,
      mixedImports: true,
    },
    css: {
      skipTypeImports: false,
    }
  },
  // Добавляем резолверы для CSS и других импортов
  resolvers: {
    // Для CSS модулей и стилей
    css: {
      pattern: /\.css$/,
    },
    // Для алиасов
    alias: {
      '@': './src',
      '@shared': './src/shared',
      '@entities': './src/entities',
      '@features': './src/features'
    }
  },
  // Добавляем правила для обработки относительных импортов
  requireConfig: {
    baseDir: '.',
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    paths: {
      '@/*': ['./src/*'],
      '@shared/*': ['./src/shared/*'],
      '@entities/*': ['./src/entities/*'],
      '@features/*': ['./src/features/*']
    },
    modules: [
      'src',
      'node_modules'
    ]
  },
  layout: 'dot',
  rankdir: 'LR',
  fontSize: '10px',
  backgroundColor: '#ffffff',
  nodeColor: '#000000',
  noDependencyColor: '#666666',
  cyclicNodeColor: '#ff0000',
  graphVizOptions: {
    G: {
      rankdir: 'LR',
      splines: 'ortho'
    }
  },
  optimizationLevel: 0,
  displayRelativePaths: false,
  startScript: 'src'
}; 