# Scope for Imagination mailing list

Subscriber addresses should not be committed to Git. The live form stores contacts in a private Resend Segment; this repository stores the form, API integration, and one broadcast template per journal entry.

## One-time Resend setup

1. Create a Resend account and verify the domain used to send email.
2. Create a Segment named `Scope for Imagination`.
3. Create a string Contact Property named `interest`.
4. Create an API key.
5. Add these environment variables locally and in Vercel:

```text
RESEND_API_KEY=re_...
RESEND_SFI_SEGMENT_ID=...
SFI_NEWSLETTER_FROM=Scope for Imagination <journal@your-verified-domain.com>
NEXT_PUBLIC_SITE_URL=https://aaronwriight.vercel.app
```

Until the first three variables are configured, the signup form safely reports that signup is still being configured.

## Publishing and email workflow

`sfi_blogpost.py` creates both the numbered post JSON and `content/scope-for-imagination/newsletters/NNNN.json`.

Create a Resend broadcast draft for review:

```sh
python3 scripts/sfi_newsletter.py --entry=0002
```

After reviewing the draft in Resend, send it there—or explicitly send immediately:

```sh
python3 scripts/sfi_newsletter.py --entry=0002 --send
```

The template includes Resend’s unsubscribe placeholder. The send command is intentionally separate from post generation so publishing a draft cannot accidentally email the list.
