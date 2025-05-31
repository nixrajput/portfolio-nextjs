# Pull Request Checklist

## What does this PR do?

<!-- **Please provide a clear and concise description of the changes in this PR.** Example: -->

<!--

- Adds/improves website functionality or components
- Fixes bugs or issues
- Adds new features like dark mode, responsive design, etc.
- Optimizes performance or enhances accessibility

-->

## **Checklist**

### Code Changes

- [ ] I have added new features to the package (e.g., autoplay, indicator customization, etc.)
- [ ] I have fixed existing issues (e.g., performance, edge cases)
- [ ] I have improved the overall structure or optimized the codebase

### Documentation

- [ ] I have updated the README file or relevant documentation with the changes
- [ ] I have added code usage examples or updated existing examples to reflect changes
- [ ] I have updated the package version in the `package.json` file

### Testing

**Functionality Tests**

- [ ] All pages load correctly and navigation works as expected
- [ ] Components render properly across different screen sizes
- [ ] Interactive elements (buttons, forms, links) function correctly

**Theme and Styling**

- [ ] Dark/light mode toggle works correctly
- [ ] Theme colors and typography are consistent across pages
- [ ] Responsive design works on mobile, tablet, and desktop

**Accessibility**

- [ ] All interactive elements are keyboard accessible
- [ ] Images have appropriate alt text
- [ ] Color contrast meets WCAG guidelines
- [ ] Screen readers can navigate the content properly

**Performance**

- [ ] Images are optimized and load efficiently
- [ ] Page load times are reasonable
- [ ] No console errors or warnings

### Performance

- [ ] I ran performance tests to ensure no regressions
- [ ] The carousel renders efficiently, even with a large number of items

### How did you verify your code works?

<!-- **Please explain how you tested the code changes.** Example: -->

<!--

- I have written unit tests covering the new features
- I ran manual tests to check various carousel configurations (autoplay, infinite loop, custom widgets)
- I verified the carousel on different devices and screen sizes
- All tests pass locally (`npm test` or `yarn test` or `bun test`)

-->
