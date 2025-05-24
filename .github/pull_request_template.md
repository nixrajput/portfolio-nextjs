# Pull Request Checklist

## What does this PR do?

<!-- **Please provide a clear and concise description of the changes in this PR.** Example: -->

<!--

- Adds/improves functionality for the carousel widget
- Fixes bugs or issues
- Adds new features like autoplay, infinite scrolling, etc.
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
- [ ] I have updated the package version in the `pubspec.yaml` file

### Testing

**General Tests**

- [ ] The carousel widget works correctly with default settings
- [ ] The carousel can handle a dynamic number of children (images, texts, etc.)
- [ ] The carousel supports custom widgets for carousel items

**Autoplay Feature**

- [ ] Autoplay starts when enabled and stops when disabled
- [ ] Autoplay pauses when the user interacts (swipes/taps) with the carousel
- [ ] Autoplay resumes after interaction

**Indicators and Customization**

- [ ] The carousel displays indicators correctly and updates when navigating through slides
- [ ] Custom indicators (colors, shapes, positions) are rendered correctly
- [ ] Custom animations or transitions between slides work as expected

**Looping and Scrolling**

- [ ] Infinite loop mode works smoothly without any jumps or glitches
- [ ] The carousel scrolls smoothly horizontally and/or vertically
- [ ] Pagination and snapping behavior works as expected

**Accessibility**

- [ ] The carousel widget supports screen readers (e.g., `Semantics` labels added)
- [ ] Users can navigate between items using a keyboard (if necessary)

**Responsiveness**

- [ ] The carousel adapts to different screen sizes (mobile, tablet, desktop)
- [ ] The carousel responds correctly to device orientation changes

**Error Handling**

- [ ] The carousel handles empty/null items gracefully
- [ ] The carousel handles large data sets without crashes or performance drops

### Performance

- [ ] I ran performance tests to ensure no regressions
- [ ] The carousel renders efficiently, even with a large number of items

### How did you verify your code works?

<!-- **Please explain how you tested the code changes.** Example: -->

<!--

- I have written unit tests covering the new features
- I ran manual tests to check various carousel configurations (autoplay, infinite loop, custom widgets)
- I verified the carousel on different devices and screen sizes
- All tests pass locally (`flutter test`)

-->
