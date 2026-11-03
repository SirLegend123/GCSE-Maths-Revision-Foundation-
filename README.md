# GCSE-Maths-Revision-Foundation-

Open the revision cover page (`index.html`) to choose a topic. On GitHub Pages: https://sirlegend123.github.io/GCSE-Maths-Revision-Foundation-/

## Topics

### Algebra

- [Algebra Practice](algebra/index.html): Sophie's Autumn 1 sheets as interactive practice. Session 1: brackets and equations. Session 2: forming equations, formulae and sequences. Answers are checked as algebra, so equivalent forms count, with step-by-step help.

### Ratio & Proportion

- [Ratio Sun Rays](ratio-trainer/index.html): practise GCSE Foundation ratio sharing questions using the sun rays method (one ray for each part of the ratio). It has five levels: find the other share, totals, "more than" problems, three-part ratios, and mixed exam practice. Open `ratio-trainer/index.html` in a browser; no install is needed.

## Publishing a change

Every page shows a "New version: Update now" button when the website has a newer version than the copy on screen. Pressing it reloads the page fresh.

So that the button appears, run this before committing a change to any page:

```
python3 tools/bump_version.py
```

It stamps the same new version into `version.json` and into every page.
