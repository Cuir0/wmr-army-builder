module.exports = {
  rules: {
    'svelte/spaced-html-comment': 'error', // Require spacing in a HTML comment
    'svelte/block-lang': ['error', { 'script': ['ts'] }], // Require lang=ts in script tag
    'svelte/valid-compile': ['error', { 'ignoreWarnings': true }], // Disable svelte a11y warn/error

    // Enforce indent in .svelte files
    'svelte/indent': [
      'error',
      { 
        'indent': 2,
        'switchCase': 1,
        'alignAttributesVertically': true
      }
    ]
  }
}