module.exports = {
	rules: {
		'body-leading-blank': [1, 'always'],
		'footer-leading-blank': [1, 'always'],
		'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    "scope-empty": [2, 'never'],
    'scope-enum': [
      2, 
      'always', 
      [
        'repo',
        'docs'
      ]
    ],
		'subject-case': [0, 'always', 'sentence-case'],
		'subject-empty': [2, 'never'],
		'type-case': [2, 'always', 'lower-case'],
		'type-empty': [2, 'never'],
		'type-enum': [
			2,
			'always',
			[
        'build',
        'ci',
        'chore',
        'feat',
        'fix',
        'refactor',
        'style',
        'test',
        'config'
      ]
		]
	}
};