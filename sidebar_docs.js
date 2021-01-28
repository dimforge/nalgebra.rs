module.exports = {
  docs: [
    'about_nalgebra',
    {
      'User Guide': [
        'user_guide/getting_started',
        // 'user_guide/quick_reference',
        'user_guide/vectors_and_matrices',
        'user_guide/decompositions_and_lapack',
        'user_guide/points_and_transformations',
        'user_guide/projections',
        'user_guide/cg_recipes',
        'user_guide/nalgebra_glm',
        'user_guide/performance_tricks',
        'user_guide/wasm_and_embedded_targets',
        'user_guide/generic_programming',
      ]
    },
    {
      'API documentation': [
        {
          type: 'link',
          label: 'nalgebra ↪',
          href: 'https://docs.rs/nalgebra'
        },
        {
          type: 'link',
          label: 'nalgebra-glm ↪',
          href: 'https://docs.rs/nalgebra-glm'
        },
        {
          type: 'link',
          label: 'nalgebra-lapack ↪',
          href: 'https://docs.rs/nalgebra-lapack'
        },
      ]
    },
    'faq'
  ],
};
