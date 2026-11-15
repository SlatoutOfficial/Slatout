# Admin workspace

The dashboard is available at `/admin`. It includes blog drafting and publishing, rich text editing with an inline preview, image uploads, and contact enquiry management with status updates and CSV export.

## First login

Copy `.env.example` to `.env.local`, set a private `ADMIN_PASSWORD` and a unique `ADMIN_SESSION_SECRET` (at least 32 random characters), then restart the Next.js server. The dashboard uses an HTTP-only signed session cookie.

## Storage

CMS records are written to `data/admin-content.json`; uploaded images are written to `data/uploads` and served through the app. Run the app on a Node.js server with a persistent writable filesystem and back up these paths. Ephemeral/serverless filesystems do not retain CMS changes between deployments or instances, so connect a persistent database and object store before using this setup on those platforms.

Contact form submissions are posted to `/api/enquiries` and saved as new leads. The contact form keeps its existing honeypot field; automated submissions that fill it are discarded.
