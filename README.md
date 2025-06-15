# Portfolio Website Monorepo

This repository contains the source code for two versions of my portfolio website. The repository is structured as a monorepo with both versions maintained in a single codebase but deployed to different domains.

- **v1**: Old portfolio website built with Next.js 14, React 18, Aceternity UI, Tailwind CSS v3, and Sass
- **v2**: New redesigned portfolio website built with Next.js 15, React 19, Tailwind CSS v4, shadcn/ui, and Aceternity UI

[![Stars](https://img.shields.io/github/stars/nixrajput/portfolio-nextjs?label=Stars&style=flat)][repo]
[![Forks](https://img.shields.io/github/forks/nixrajput/portfolio-nextjs?label=Forks&style=flat)][repo]
[![Watchers](https://img.shields.io/github/watchers/nixrajput/portfolio-nextjs?label=Watchers&style=flat)][repo]
[![Contributors](https://img.shields.io/github/contributors/nixrajput/portfolio-nextjs?label=Contributors&style=flat)][repo]

[![GitHub last commit](https://img.shields.io/github/last-commit/nixrajput/portfolio-nextjs?label=Last+Commit&style=flat)][repo]
[![GitHub issues](https://img.shields.io/github/issues/nixrajput/portfolio-nextjs?label=Issues&style=flat)][issues]
[![GitHub pull requests](https://img.shields.io/github/issues-pr/nixrajput/portfolio-nextjs?label=Pull+Requests&style=flat)][pulls]
[![GitHub License](https://img.shields.io/github/license/nixrajput/portfolio-nextjs?label=License&style=flat)][license]

## Table of Contents

- [Portfolio Website Monorepo](#portfolio-website-monorepo)
  - [Table of Contents](#table-of-contents)
  - [Repository Structure](#repository-structure)
  - [Features](#features)
    - [v1 (Old Portfolio)](#v1-old-portfolio)
    - [v2 (New Portfolio)](#v2-new-portfolio)
  - [Screenshots](#screenshots)
    - [v1 Portfolio](#v1-portfolio)
    - [v2 Portfolio](#v2-portfolio)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Running v1](#running-v1)
    - [Running v2](#running-v2)
  - [Customization](#customization)
    - [Changing Content](#changing-content)
      - [For v1 (Old Portfolio)](#for-v1-old-portfolio)
      - [For v2 (New Portfolio)](#for-v2-new-portfolio)
  - [Deployment](#deployment)
    - [Deploying v1 (Old Portfolio)](#deploying-v1-old-portfolio)
    - [Deploying v2 (New Portfolio)](#deploying-v2-new-portfolio)
  - [Contributing](#contributing)
  - [License](#license)
  - [Support My Work](#support-my-work)
  - [Connect With Me](#connect-with-me)
  - [Activities](#activities)

## Repository Structure

This repository is organized as a monorepo with the following structure:

```text
.
├── .github/             # GitHub configuration files
├── v1/                  # Old portfolio website (Next.js 14)
├── v2/                  # New portfolio website (Next.js 15)
├── .gitignore           # Git ignore file
├── bun.lock             # Bun lock file
├── CODE_OF_CONDUCT.md   # Code of Conduct
├── CONTRIBUTING.md      # Contributing Guidelines
├── LICENSE              # MIT License
├── package.json         # Root package.json with workspace configuration
├── README.md            # This file
└── vercel.json          # Vercel configuration
```

## Features

### v1 (Old Portfolio)

- **Technology Stack**: Next.js 14, React 18, Aceternity UI, Tailwind CSS v3, and Sass
- **UI Components**: Custom animations, responsive cards, and interactive elements
- **Layout**: Multi-section single page with smooth scrolling navigation
- **Performance**: Optimized image loading and component rendering
- **Content Management**: Data-driven content from structured JSON files
- **Key Sections**:
  - Hero section with animated introduction
  - Projects gallery with filterable categories
  - Skills showcase with proficiency indicators
  - Experience timeline with detailed work history
  - Contact form with validation

### v2 (New Portfolio)

- **Technology Stack**: Next.js 15, React 19, shadcn/ui, Aceternity UI, and Tailwind CSS v4
- **UI Framework**: Component-based architecture with reusable UI patterns
- **Design System**: Consistent typography, spacing, and color schemes
- **Theming**: Dynamic dark/light mode with persistent user preference
- **Animations**: Subtle micro-interactions and page transitions
- **Performance Optimizations**:
  - Server components for reduced client-side JavaScript
  - Optimized asset loading with priority hints
  - Efficient rendering with React 19 features
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **SEO**: Enhanced metadata, structured data, and optimized for search engines

## Screenshots

### v1 Portfolio

![v1 Portfolio Screenshot](/v1/screenshot-desktop.png)

### v2 Portfolio

_Note: Add a screenshot of your v2 portfolio here by capturing it and saving to `/v2/screenshot-desktop.png`_

<!-- Once you have the v2 screenshot, replace the note above with: -->
<!-- ![v2 Portfolio Screenshot](/v2/screenshot-desktop.png) -->

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

You need to have the following software installed on your computer:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/), [pnpm](https://pnpm.io/) or [Yarn](https://yarnpkg.com/) package manager

### Installation

1. Star the repository.

2. Clone this repository to your local machine using the following command:

   ```bash
   git clone https://github.com/nixrajput/portfolio-nextjs.git
   ```

3. Navigate to the project directory:

   ```bash
   cd portfolio-nextjs
   ```

4. Install the project dependencies:

   If you're using npm:

   ```bash
   npm install
   ```

   If you're using pnpm:

   ```bash
   pnpm install
   ```

   If you're using Yarn:

   ```bash
   yarn install
   ```

## Usage

The monorepo is set up to allow you to work with either version independently.

### Running v1

To start the development server for v1:

```bash
npm run dev:v1
# or
pnpm run dev:v1
# or
yarn dev:v1
# or
bun dev:v1
```

This will start the Next.js development server for v1, and you can access it at `http://localhost:4000`.

### Running v2

To start the development server for v2:

```bash
npm run dev:v2
# or
pnpm run dev:v2
# or
yarn dev:v2
# or
bun dev:v2
```

This will start the Next.js development server for v2, and you can access it at `http://localhost:3000`.

## Customization

Both versions can be customized independently.

### Changing Content

#### For v1 (Old Portfolio)

1. Update the content in the `v1/src/data` directory:
   - Edit the data files to modify project details, services, experiences, skills, and social links
   - Replace or add images in the `v1/public/images` directory

#### For v2 (New Portfolio)

1. Update the content in the `v2/src/data` directory (if applicable)
   - The v2 version uses a different structure, so refer to the specific files in the v2 directory
   - Replace or add images in the `v2/public` directory

## Deployment

Both versions can be deployed to separate domains on Vercel.

### Deploying v1 (Old Portfolio)

1. Create a new project on Vercel and connect it to your GitHub repository
2. Configure the following settings:
   - Framework Preset: Next.js
   - Root Directory: `v1`
   - Build Command: `npm run build` or leave as default
   - Output Directory: `.next`
3. Set any required environment variables
4. Deploy the project

### Deploying v2 (New Portfolio)

1. Create another new project on Vercel and connect it to the same GitHub repository
2. Configure the following settings:
   - Framework Preset: Next.js
   - Root Directory: `v2`
   - Build Command: `npm run build` or leave as default
   - Output Directory: `.next`
3. Set any required environment variables
4. Deploy the project

With this setup, both versions will be deployed to different domains but maintained in the same repository.

## Contributing

If you would like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request. Please follow the guidelines in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support My Work

Your support helps me dedicate more time to developing high-quality, impactful projects in the open-source community. Sponsor me, and together, let’s bring even more innovation to life!

[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/nixrajput)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/nixrajput)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/nixrajput)

## Connect With Me

[![GitHub: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=GitHub&logoColor=333&link=https://www.github.com/nixrajput)][github]
[![Linkedin: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=LinkedIn&logoColor=333&link=https://www.linkedin.com/in/nixrajput)][linkedin]
[![Instagram: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=Instagram&logoColor=333&link=https://www.instagram.com/nixrajput)][instagram]
[![Twitter: nixrajput07](https://img.shields.io/badge/nixrajput07-EFF7F6?logo=X&logoColor=333&link=https://x.com/nixrajput07)][twitter]
[![Telegram: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=Telegram&logoColor=333&link=https://telegram.me/nixrajput)][telegram]
[![Gmail: nkr.nikhi.nkr@gmail.com](https://img.shields.io/badge/nkr.nikhil.nkr@gmail.com-EFF7F6?logo=Gmail&logoColor=333&link=mailto:nkr.nikhil.nkr@gmail.com)][gmail]

## Activities

![Alt](https://repobeats.axiom.co/api/embed/39717929794c9e56c46a4313ee2c33347cf209d1.svg "Repobeats analytics image")

[github]: https://github.com/nixrajput
[twitter]: https://twitter.com/nixrajput07
[instagram]: https://instagram.com/nixrajput
[linkedin]: https://linkedin.com/in/nixrajput
[telegram]: https://telegram.me/nixrajput
[gmail]: mailto:nkr.nikhil.nkr@gmail.com
[repo]: https://github.com/nixrajput/portfolio-nextjs
[issues]: https://github.com/nixrajput/portfolio-nextjs/issues
[pulls]: https://github.com/nixrajput/portfolio-nextjs/pulls
[license]: https://github.com/nixrajput/portfolio-nextjs/blob/master/LICENSE.md
