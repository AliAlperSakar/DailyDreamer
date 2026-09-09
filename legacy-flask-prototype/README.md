# Legacy prototype (v1)

This is the original DailyDreamer/DreamyTales prototype: a Flask backend, Jinja templates, and vanilla JS/CSS, calling OpenAI's Chat Completions and Images APIs.

It's kept here for reference and history — the actively developed and deployed version is now the React/TypeScript app at the repo root (`v2`). See the [top-level README](../README.md) for what changed and why.

## Security note

The original `const.py` in this repo had a real OpenAI API key committed in plain text. It has been redacted here and replaced with `os.environ.get('OPENAI_API_KEY', '')`. That old key is still visible in this repository's git history (in the `main` branch's commit log) and should be treated as compromised — rotate it on OpenAI's dashboard if you haven't already.

## Running it

```bash
pip install flask openai requests aiohttp
export OPENAI_API_KEY=your_key_here
python app.py
```

Note this code is exactly the original prototype (with the key redacted) — it hasn't been otherwise updated, and some of it (commented-out blocks, an absolute Windows path in `app.py`'s `static_folder`, an unused `/generate_image` route) reflects its original prototype state rather than production-ready code.
