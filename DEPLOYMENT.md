# How to publish new feature:

1. Update version in `package.json` // docs depend on version

in feature branch:

2. Update unit tests
3. Update storybook

4. Update docs in `README.md`
5. Update docs in `src/docs`

in main branch:

6. `yarn`
7. `yarn build:docs`

8. Merge feature branch

9. `npm publish`
10. Create release in GitHub
