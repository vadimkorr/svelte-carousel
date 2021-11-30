# How to publish new feature:

in feature branch:

1. Update unit tests
2. Update storybook
3. Update docs in `README.md`
4. Update docs in `src/docs`
5. Merge feature branch

in main branch:

5. Update version in `package.json` // docs depend on version
6. `yarn`
7. `yarn build:docs`

9. `npm publish`
10. Create release in GitHub
