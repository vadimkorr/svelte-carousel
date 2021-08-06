# How to publish new feature:

in feature branch:

1. Update unit tests
2. Update storybook

3. Update docs in `README.md`
4. Update docs in `src/docs`

in main branch:

5. Update version in `package.json`
6. `yarn`
7. `yarn build:docs`

8. `npm publish`
9. Merge feature branch
10. Create release in GitHub
