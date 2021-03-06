import webpack from 'webpack';
import path from 'path';
import { css } from 'docz-plugin-css';

const FONT_FAMILY =
  "'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const FONT_FAMILY_MONO = "Menlo, Monaco, Consolas, 'Courier New', monospace";

// store brand configurations such as future localization information or provInfo-like data
const BRANDS = {
  bluehost: {
    name: 'Bluehost',
  },
  justhost: {
    name: 'Justhost',
  },
  development: {
    name: 'Bluehost - DEVELOPMENT MODE',
  },
};

// confirm brand exists in our configs, otherwise default to `bluehost`
const BRAND = BRANDS[process.env.DOCZ_BRAND]
  ? process.env.DOCZ_BRAND
  : 'bluehost';

// doczrc.js
export default {
  title: `🐦 Bluebird`,
  description: `🐦 Bluebird`,
  src: './',
  dest: 'build',
  indexHtml: `./public/${BRAND}/index.html`,

  plugins: [
    css({
      preprocessor: 'sass',
    }),
  ],

  wrapper: 'src/utils/Wrapper',

  modifyBundlerConfig: config => ({
    // return existing config
    ...config,
    // return config.plugins with existing plugins and additional new "defineplugin"
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        // pass brand to node so webpack can eval it on import/require statements
        'process.env.BRAND': JSON.stringify(BRAND),
      }),
    ],
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@eigi': path.resolve(__dirname, 'packages'),
      },
    },
  }),

  menu: [
    {
      name: 'Getting Started',
      menu: ['Introduction', 'Process'],
    },
    'Foundations',
    'Components',
    'Utility Classes',
    {
      name: 'Github',
      href: 'https://github.com/enduranceinternational/bluebird/',
      target: '_blank',
    },
    'Release Notes',
    'FAQ',
    'Roadmap',
    'Support',
  ],

  themeConfig: {
    /**
     * Mode
     */
    mode: 'light', // you can use: 'dark' or 'light'
    /**
     * Show/hide Playground editor by default
     */
    showPlaygroundEditor: true,
    /**
     * Set the numbers of max lines before scroll editor
     */
    linesToScrollEditor: 14,
    /**
     * Customize codemirror theme
     */
    codemirrorTheme: 'docz-light',
    /**
     * Logo
     */
    // logo: {
    //   src: null,
    //   width: null
    // },
    /**
     * Radius
     */
    radii: '4px',
    /**
     * Colors (depends on select mode)
     */
    colors: {
      white: '#FFFFFF',
      grayExtraLight: '#FAFBFC',
      grayLight: '#D7DBE0',
      gray: '#7D899C',
      grayDark: '#758397',
      grayExtraDark: '#344154',
      dark: '#13161F',
      blue: '#3575D3',
      primary: '#3575D3',
      skyBlue: '#1FB6FF',
      link: '#3575D3',
      text: '#576373',
      // footerText: colors.grayDark,
      // sidebarBg: colors.grayExtraLight,
      // sidebarText: colors.dark,
      // sidebarHighlight: null,
      // sidebarBorder: colors.grayLight,
      background: '#F4F5F8',
      // border: colors.grayLight,
      // theadColor: colors.gray,
      // theadBg: colors.grayExtraLight,
      // tableColor: colors.dark,
      // codeBg: lighten(0.02, colors.grayExtraLight),
      // codeColor: colors.gray,
      // preBg: colors.grayExtraLight,
      // blockquoteBg: colors.grayExtraLight,
      // blockquoteBorder: colors.grayLight,
      // blockquoteColor: colors.gray
    },

    fonts: {
      display: FONT_FAMILY,
      /**
       * Used for code and sometimes numbers in tables.
       */
      mono: FONT_FAMILY_MONO,
      /**
       * Used for text and UI (which includes almost anything).
       */
      ui: FONT_FAMILY,
    },

    /**
     * Styles
     */
    styles: {
      body: {
        fontSize: 16,
        lineHeight: 1.6,
      },
      container: {
        maxWidth: '100%',
        width: [960, '100%', '100%'],
        padding: ['20px', '0 40px 40px'],
      },
      h1: {
        margin: ['30px 0 20px', '60px 0 20px', '40px 0'],
        fontSize: [36, 42, 48],
        fontWeight: 100,
        letterSpacing: '-0.02em',
      },
      h2: {
        margin: ['20px 0 20px', '35px 0 20px'],
        lineHeight: ['1.2em', '1.5em'],
        fontSize: 28,
        fontWeight: 600,
        letterSpacing: '-0.02em',
      },
      h3: {
        margin: '25px 0 10px',
        fontSize: [22, 24],
        fontWeight: 400,
      },
      h4: {
        fontSize: 20,
        fontWeight: 400,
      },
      h5: {
        fontSize: 18,
        fontWeight: 400,
      },
      h6: {
        fontSize: 16,
        fontWeight: 400,
      },
      list: {
        listStyle: 'disc',
        padding: 0,
        margin: '10px 0 10px 20px',
      },
      playground: {
        padding: ['1.5em', '2em'],
      },
      code: {
        margin: '0 3px',
        padding: '4px 6px',
        borderRadius: '3px',
        fontSize: '0.85em',
      },
      pre: {
        fontSize: 14,
        lineHeight: 1.8,
      },
      paragraph: {
        margin: '10px 0 30px',
      },
      table: {
        overflowY: 'hidden',
        overflowX: ['initial', 'initial', 'initial', 'hidden'],
        display: ['block', 'block', 'block', 'table'],
        width: '100%',
        marginBottom: [20, 40],
        fontSize: 14,
      },
      blockquote: {
        margin: '25px 0',
        padding: '20px',
        fontStyle: 'italic',
        fontSize: 18,
      },
    },
  },
};
