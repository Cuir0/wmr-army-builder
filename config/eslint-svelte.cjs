module.exports = {
  rules: {
    // Require spacing in a HTML comment
    'svelte/spaced-html-comment': 'error',
    // Require lang=ts in script tag
    'svelte/block-lang': ['error', { 'script': ['ts'] }],
    // Disable svelte a11y warn/error
    'svelte/valid-compile': ['error', { 'ignoreWarnings': true }],
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