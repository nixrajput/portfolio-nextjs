// Global type augmentation so all test files get the jest-dom matchers
// (toBeInTheDocument, toHaveClass, toHaveStyle, …) under `tsc --noEmit`,
// without a per-file /// <reference> directive. tsconfig's `**/*.ts` include
// picks this up project-wide.
/// <reference types="@testing-library/jest-dom" />
