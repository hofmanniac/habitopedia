# Habitopedia

A comprehensive catalog of habits and practices sourced from books, podcasts, research papers, videos, and expert advice. Browse, search, and discover evidence-based habits across all areas of life.

🔗 **Live Site**: [https://your-username.github.io/habitopedia](https://your-username.github.io/habitopedia)

## Features

✨ **Comprehensive Catalog**: Habits organized with rich metadata including evidence level, time investment, difficulty, and effectiveness ratings

🔍 **Multiple Discovery Paths**: Browse by category, source type, or use advanced filtering and search

📚 **Source Tracking**: Every habit links to original sources (books, podcasts, papers, videos) with detailed references

🔗 **Relationship Mapping**: See related habits, prerequisites, and habit stacks

📊 **Statistics Dashboard**: Trends, top sources, and insights about the catalog

## Quick Start

### Prerequisites

- Ruby 2.7 or higher
- Bundler

### Installation

```bash
git clone https://github.com/your-username/habitopedia.git
cd habitopedia
bundle install
```

### Development

Run the Jekyll server locally:

```bash
bundle exec jekyll serve
```

Visit: `http://localhost:4000/habitopedia/`

## Adding New Habits

### 1. Use the Template

Copy `_habits/TEMPLATE.md` to create a new habit file:

```bash
cp _habits/TEMPLATE.md _habits/your-habit-slug.md
```

### 2. Fill in Required Fields

```yaml
---
title: "Your Habit Title"
slug: "your-habit-slug"
code: "CATEGORY-NNN"  # e.g., PROD-005, HEALTH-012
primary_category: productivity  # or health, finance, etc.
description: "One-sentence summary"
evidence_level: research-backed  # anecdotal, expert-opinion, research-backed, meta-analysis
time_investment: medium  # micro, short, medium, long, extended
difficulty: 3  # 1-5
effectiveness: 4  # 1-5
---
```

### 3. Add Implementation Details

```yaml
how_to_start: |
  Specific, actionable first step...

tips:
  - "Tip 1"
  - "Tip 2"

common_pitfalls:
  - "Mistake to avoid"

success_metrics:
  - "How to measure progress"
```

### 4. Add References

```yaml
references:
  - type: book
    title: "Book Title"
    author: "Author Name"
    year: 2024
    isbn: "978-XXXXXXXXXX"
    url: "https://..."
    notes: "Key insights from this source"
  
  - type: podcast
    show: "Podcast Name"
    episode: "Episode Title"
    host: "Host Name"
    url: "https://..."
    timestamp: "12:30"
```

### 5. Link Related Habits

```yaml
related_habits:
  - "similar-habit-slug"
  - "complementary-habit-slug"

prerequisites:
  - "foundational-habit-slug"

habit_stacks:
  - "combines-well-with-slug"
```

### 6. Write the Content

Write detailed content in Markdown below the front matter.

## Category Codes

Use these category codes for the `code` field:

- `PROD-NNN` - Productivity
- `HEALTH-NNN` - Health & Wellness
- `REL-NNN` - Relationships
- `FIN-NNN` - Finance
- `MIND-NNN` - Mindset
- `LEARN-NNN` - Learning
- `CREATE-NNN` - Creativity
- `COMM-NNN` - Communication
- `ENV-NNN` - Environment
- `SPIRIT-NNN` - Spirituality

Find the next available number in each category by checking existing habits.

## Evidence Levels

- **anecdotal**: Personal experience or individual stories
- **expert-opinion**: Recommended by recognized experts
- **research-backed**: Supported by scientific studies
- **meta-analysis**: Confirmed by systematic review of multiple studies

## Source Types

When adding references, use these `type` values:

- `book` - Published books
- `podcast` - Podcast episodes
- `video` - YouTube videos, courses
- `article` - Blog posts, articles
- `paper` - Research papers
- `course` - Online courses
- `social` - Social media posts
- `interview` - Interviews or Q&A

## Site Structure

```
.
├── _habits/              # Habit entries (Markdown files)
├── _data/                # Taxonomy data (categories, evidence levels, etc.)
│   ├── categories.yml
│   ├── source_types.yml
│   ├── evidence_levels.yml
│   └── time_investment.yml
├── _layouts/             # Page layouts
│   └── habit.html
├── _includes/            # Reusable components
│   ├── habit-card.html
│   ├── reference-list.html
│   └── related-habits.html
├── _config.yml           # Jekyll configuration
├── index.html            # Homepage
├── categories.md         # Browse by category
├── sources.md            # Browse by source type
├── browse.md             # Advanced search/filter
├── stats.md              # Statistics dashboard
└── about.md              # About page
```

## Configuration

Main settings in [_config.yml](_config.yml):

- `title`: Site title
- `description`: Site description
- `baseurl`: `/habitopedia` (for GitHub Pages project sites)
- `url`: Your site URL

Update social links and contact info as needed.

## Deployment

This site is configured for GitHub Pages:

1. Push to GitHub
2. Go to repository Settings → Pages
3. Set source to GitHub Actions
4. The site will auto-deploy on push to main/master

## Contributing

Contributions welcome! To contribute:

1. Fork the repository
2. Create a new habit file in `_habits/`
3. Follow the template and guidelines above
4. Submit a pull request

Please ensure:
- Use the provided template
- Include at least one reference/source
- Write clear implementation instructions
- Check for duplicates before adding

## Project Structure

- **Collections**: Habits are stored as a Jekyll collection
- **Data Files**: Taxonomies defined in `_data/` for easy updating
- **Client-side Search**: JavaScript-based search using generated JSON
- **Responsive Design**: Mobile-friendly with custom CSS

## Customization

### Adding a New Category

Edit `_data/categories.yml`:

```yaml
new_category:
  name: "Category Name"
  code: "CODE"
  icon: "🎯"
  description: "Category description"
  color: "#hexcolor"
```

### Modifying Evidence Levels or Time Investments

Edit `_data/evidence_levels.yml` or `_data/time_investment.yml`.

### Custom Styling

Add custom CSS to `assets/css/style.scss`.

## Troubleshooting

**Build fails**: Check that all YAML front matter is valid
**Habits not showing**: Ensure `published: true` in front matter (or remove the field)
**Links broken**: Verify slug references in `related_habits` etc. match actual habit slugs
**Search not working**: Check that `search.json` is generating correctly

## Future Enhancements

Potential additions:
- Visual relationship/network graphs
- User comments via Giscus
- Personal tracking integration
- Mobile app with JSON API
- Recommendation engine
- Multi-language support

## License

This work is published under [MIT License](LICENSE).

## Contact

- **Issues**: [GitHub Issues](https://github.com/your-username/habitopedia/issues)
- **Email**: your-email@example.com
- **Website**: [your-website.com](https://your-website.com)

---

**Note**: This catalog provides information for educational purposes. Always consult qualified professionals for personalized advice.
