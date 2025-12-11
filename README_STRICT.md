This repository has been updated to enable TypeScript strict mode and to add ESLint configuration.

Steps performed:
- Enabled `strict: true` in `tsconfig.json` and added stricter compiler flags.
- Added `.eslintrc.cjs` and `.eslintignore`.
- Added a `lint` script to `package.json`. You must install dev dependencies before running.

Install commands (run in project root):

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks
```

Run type check and lint:

```bash
npm run type-check
npm run lint
```

If `tsc` reports errors after enabling `strict`, fix the code where type-safety issues appear. Consider gradually addressing `noImplicitAny` warnings by adding explicit types.
