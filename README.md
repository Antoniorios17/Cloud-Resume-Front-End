# Antonio Rios · Cloud Resume

A personal résumé website built for the Cloud Resume Challenge, showcasing my experience in DevOps, cloud infrastructure, and automation.

[View website](https://antoniorios.xyz) · [GitHub](https://github.com/AntonioRios17) · [LinkedIn](https://www.linkedin.com/in/AntonioRios17)

## Features

- Responsive layout with sections for experience, education, skills, interests, and certifications.
- Light and dark themes, with dark mode as the default and the selected preference saved locally.
- Smooth navigation between résumé sections.
- Visitor counter backed by AWS Lambda and DynamoDB.
- Links to my résumé, professional profiles, and certification badges.
- Automated S3 deployments through GitHub Actions.

## Technology

| Layer | Technologies |
| --- | --- |
| Front end | HTML, CSS, JavaScript, Bootstrap, Font Awesome |
| Hosting and delivery | Amazon S3, CloudFront, Route 53, AWS Certificate Manager |
| Visitor counter | AWS Lambda, Python, boto3, DynamoDB |
| Infrastructure | Terraform |
| Deployment | GitHub Actions |

This repository contains the static front end, its deployment workflow, and supporting installation scripts. The Terraform configuration and Lambda source are maintained outside this repository.

## AWS architecture

```text
Visitors
   │
   ▼
Route 53 → CloudFront (HTTPS) → S3 static assets
                │
                └── TLS certificate from AWS Certificate Manager

Browser JavaScript → Lambda function URL → DynamoDB

Push to main / manual workflow → GitHub Actions → S3
```

Route 53 handles DNS, CloudFront delivers the website over HTTPS, and S3 stores the front-end files. Browser JavaScript calls a Python Lambda function that uses boto3 to update the visitor counter in DynamoDB. Terraform provisions the infrastructure described by the project.

## Project structure

```text
.
├── .github/workflows/
│   └── front-end-cicd.yaml    # GitHub Actions deployment
├── Scripts/
│   ├── Jenkins-install.sh    # Supporting setup script
│   └── Terraform-install.sh  # Supporting setup script
├── website/
│   ├── index.html            # Résumé content, navigation, and theme initialization
│   └── dist/
│       ├── assets/img/       # Profile images
│       ├── css/styles.css    # Bootstrap styles and custom theme rules
│       └── js/index.js       # Theme toggle, scrolling, and visitor counter
└── README.md
```

## Run locally

Install Python 3, then run the following from the repository root:

```bash
python3 -m http.server 8000 --directory website
```

Open [localhost:8000](http://localhost:8000). No dependency installation or build step is required. Stop the server with `Ctrl+C`.

Fonts, icons, certification images, and the visitor counter require internet access. Local previews also call the configured AWS visitor-counter endpoint.

## Make changes

| File | What to edit |
| --- | --- |
| `website/index.html` | Résumé text, section navigation, social links, and image references |
| `website/dist/css/styles.css` | Colors, typography, spacing, responsive layout, and theme overrides |
| `website/dist/js/index.js` | Theme switching, scrolling behavior, and the counter endpoint |
| `website/dist/assets/img/` | Local profile images |

Before deploying, preview at desktop and mobile widths, check navigation and external links, switch between themes, and confirm that the visitor counter loads.

## Deploy with GitHub Actions

The workflow in `.github/workflows/front-end-cicd.yaml` synchronizes `website/` to an S3 bucket in `us-east-1`. It runs on pushes to `main` and can also be started manually from the repository’s **Actions** tab.

Configure these repository secrets under **Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `AWS_S3_BUCKET` | Destination S3 bucket name |
| `AWS_ACCESS_KEY_ID` | Deployment identity’s AWS access key ID |
| `AWS_SECRET_ACCESS_KEY` | Corresponding secret access key |

The deployment identity needs permission to synchronize files to the destination bucket. Store credentials in Actions secrets, never in source files.

The workflow uploads front-end assets only. It does not provision AWS resources, deploy Lambda code, or invalidate CloudFront caches. If an update is not immediately visible, check the workflow result and the CloudFront cache configuration.
