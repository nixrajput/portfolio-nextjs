# Portfolio Website Monorepo

This repository contains the source code for two versions of my portfolio website. The repository is structured as a monorepo with both versions maintained in a single codebase but deployed to different domains.

- **v1**: Original portfolio website built with Next.js 14 and Sass
- **v2**: New redesigned portfolio website built with Next.js 15 and Tailwind CSS v4

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
    - [v1 (Original Portfolio)](#v1-original-portfolio)
    - [v2 (New Portfolio)](#v2-new-portfolio)
  - [Screenshots](#screenshots)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Running v1](#running-v1)
    - [Running v2](#running-v2)
  - [Customization](#customization)
    - [Changing Content](#changing-content)
      - [For v1:](#for-v1)
      - [For v2:](#for-v2)
  - [Deployment](#deployment)
    - [Deploying v1](#deploying-v1)
    - [Deploying v2](#deploying-v2)
  - [Contributing](#contributing)
  - [License](#license)
  - [Sponsor Me](#sponsor-me)
  - [Connect With Me](#connect-with-me)
  - [Activities](#activities)

## Repository Structure

This repository is organized as a monorepo with the following structure:

```
/
├── v1/                  # Original portfolio website (Next.js 14)
├── v2/                  # New portfolio website (Next.js 15)
├── package.json         # Root package.json with workspace configuration
├── README.md           # This file
└── LICENSE             # MIT License
```

## Features

### v1 (Original Portfolio)

- Responsive design for various screen sizes
- Portfolio section to showcase projects
- About section with personal information
- Customizable with Sass for styling
- Built with Next.js 14 and React 18

### v2 (New Portfolio)

- Modern design with enhanced UI/UX
- Built with Next.js 15 and React 19
- Styled with Tailwind CSS v4
- Improved performance and accessibility
- Dark mode support

## Screenshots

![Screenshot 1](/screenshot-desktop.png)

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
```

This will start the Next.js development server for v2, and you can access it at `http://localhost:3000`.

## Customization

Both versions can be customized independently.

### Changing Content

#### For v1:

1. Update the content in the `v1/src/data` directory:
   - Edit the data files to modify project details, services, experiences, skills, and social links
   - Replace or add images in the `v1/public/images` directory

#### For v2:

1. Update the content in the `v2/src/data` directory (if applicable)
   - The v2 version uses a different structure, so refer to the specific files in the v2 directory
   - Replace or add images in the `v2/public` directory

## Deployment

Both versions can be deployed to separate domains on Vercel.

### Deploying v1

1. Create a new project on Vercel and connect it to your GitHub repository
2. Configure the following settings:
   - Framework Preset: Next.js
   - Root Directory: `v1`
   - Build Command: `npm run build` or leave as default
   - Output Directory: `.next`
3. Set any required environment variables
4. Deploy the project

### Deploying v2

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

## Sponsor Me

By sponsoring my efforts, you're not merely contributing to the development of my projects; you're investing in its growth and sustainability.

Your support empowers me to dedicate more time and resources to improving the project's features, addressing issues, and ensuring its continued relevance in the rapidly evolving landscape of technology.

Your sponsorship directly fuels innovation, fosters a vibrant community, and helps maintain the project's high standards of quality. Together, we can shape the future of the projects and make a lasting impact in the open-source community.

Thank you for considering sponsoring my work!

[![Sponsor](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/nixrajput)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/nixrajput)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/nixrajput)

## Connect With Me

[![GitHub: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=GitHub&logoColor=333&link=https://www.github.com/nixrajput)][github]
[![Linkedin: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=LinkedIn&logoColor=blue&link=https://www.linkedin.com/in/nixrajput)][linkedin]
[![Instagram: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=Instagram&link=https://www.instagram.com/nixrajput)][instagram]
[![Twitter: nixrajput07](https://img.shields.io/badge/nixrajput-EFF7F6?logo=X&logoColor=333&link=https://x.com/nixrajput)][twitter]
[![Telegram: nixrajput](https://img.shields.io/badge/nixrajput-EFF7F6?logo=Telegram&link=https://telegram.me/nixrajput)][telegram]
[![Gmail: nkr.nikhi.nkr@gmail.com](https://img.shields.io/badge/nkr.nikhil.nkr@gmail.com-EFF7F6?logo=Gmail&link=mailto:nkr.nikhil.nkr@gmail.com)][gmail]

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
