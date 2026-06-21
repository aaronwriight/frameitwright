# Scope for Imagination posts

Write a post in Word, plain text, or HTML, then run:

```sh
python3 scripts/sfi_blogpost.py \
  --tags photography,science \
  --doc="/path/to/post.docx" \
  --title="scope for imagination" \
  --subtitle="Post subtitle" \
  --location="Cambridge, MA"
```

Optional arguments:

- `--date=2026-06-20` sets the publication date; it defaults to today.
- `--time=19:28` sets the entry time using a 24-hour clock; it defaults to the current time.
- `--entry=0001` overrides the automatically assigned four-digit entry number.
- `--replace --entry=0001` replaces an existing numbered entry.

The script creates one numbered JSON file in `content/scope-for-imagination/posts/`. Entry `0001` lives at `/scope-for-imagination/0001`. Images embedded in a Word document are extracted to `public/images/scope-for-imagination/<entry-number>/` and remain in their original position in the post.

Every post header follows the same structure:

```text
scope for imagination: post subtitle
6.20.26 • 19:28 • Cambridge, MA • 0001
```

Word headings, bold text, italics, hyperlinks, quotations, lists, paragraphs, line breaks, and embedded images receive basic HTML formatting. Add useful alt text to images in Word when possible; the script carries it into the website.

For plain-text posts, separate paragraphs with a blank line. Lines beginning with `#`, `##`, or `###` become headings, and consecutive lines beginning with `-` become a list. HTML files use the contents of their `<body>` element.
