---
layout: default
title: Browse by Category
permalink: /categories/
---

{% assign published_habits = site.habits | where_exp: "h", "h.published == true and h.title.size > 0" %}

<div class="categories-page">
  <h1>Browse Habits by Category</h1>
  <p class="page-description">Explore habits organized by life domain. Click a category to filter habits.</p>

  <div class="category-list">
    {% for category_item in site.data.categories %}
      {% assign category_key = category_item[0] %}
      {% assign category = category_item[1] %}
      {% assign category_habits = published_habits | where: "primary_category", category_key %}
      
      <a href="{{ '/browse/' | relative_url }}?category={{ category_key }}" class="category-list-item">
        <div class="category-list-icon" style="color: {{ category.color }}">{{ category.icon }}</div>
        <div class="category-list-content">
          <h3 class="category-list-title">{{ category.name }}</h3>
          <p class="category-list-description">{{ category.description }}</p>
        </div>
        <div class="category-list-meta">
          <span class="category-list-count">{{ category_habits.size }}</span>
          <span class="category-list-arrow">→</span>
        </div>
      </a>
    {% endfor %}
  </div>
</div>
