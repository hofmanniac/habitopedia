---
layout: default
title: Catalog Statistics
permalink: /stats/
---

{% assign published_habits = site.habits | where_exp: "h", "h.published == true and h.title.size > 0" %}

<div class="stats-page">
  <h1>📊 Catalog Statistics</h1>
  <p class="page-description">Insights and trends from the Habitopedia catalog</p>

  <div class="stats-grid">
    <div class="stat-box">
      <h3>Total Habits</h3>
      <div class="stat-big">{{ published_habits.size }}</div>
    </div>

    <div class="stat-box">
      <h3>Total Sources</h3>
      {% assign total_refs = 0 %}
      {% for habit in published_habits %}
        {% if habit.references %}
          {% assign total_refs = total_refs | plus: habit.references.size %}
        {% endif %}
      {% endfor %}
      <div class="stat-big">{{ total_refs }}</div>
    </div>

    <div class="stat-box">
      <h3>Categories Covered</h3>
      <div class="stat-big">{{ site.data.categories.size }}</div>
    </div>

    <div class="stat-box">
      <h3>Avg Sources per Habit</h3>
      {% if published_habits.size > 0 %}
        {% assign avg = total_refs | divided_by: published_habits.size | plus: 0.0 %}
        <div class="stat-big">{{ avg | round: 1 }}</div>
      {% else %}
        <div class="stat-big">0</div>
      {% endif %}
    </div>
  </div>

  <section class="stat-section">
    <h2>Habits by Category</h2>
    <div class="category-distribution">
      {% assign sorted_categories = site.data.categories | sort %}
      {% for category_item in sorted_categories %}
        {% assign category_key = category_item[0] %}
        {% assign category = category_item[1] %}
        {% assign category_habits = published_habits | where: "primary_category", category_key %}
        {% assign percentage = category_habits.size | times: 100.0 | divided_by: published_habits.size | round: 1 %}
        
        <div class="distribution-bar">
          <div class="bar-label">
            <span>{{ category.icon }} {{ category.name }}</span>
            <span class="bar-count">{{ category_habits.size }}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: {{ percentage }}%; background-color: {{ category.color }}"></div>
          </div>
        </div>
      {% endfor %}
    </div>
  </section>

  <section class="stat-section">
    <h2>Time Investment Distribution</h2>
    <div class="time-distribution">
      {% for time_item in site.data.time_investment %}
        {% assign time_key = time_item[0] %}
        {% assign time = time_item[1] %}
        {% assign time_habits = published_habits | where: "time_investment", time_key %}
        {% assign percentage = time_habits.size | times: 100.0 | divided_by: published_habits.size | round: 1 %}
        
        <div class="distribution-bar">
          <div class="bar-label">
            <span>{{ time.icon }} {{ time.short_name }}</span>
            <span class="bar-count">{{ time_habits.size }}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: {{ percentage }}%; background-color: {{ time.color }}"></div>
          </div>
        </div>
      {% endfor %}
    </div>
  </section>

  <section class="stat-section">
    <h2>Ring Distribution</h2>
    <p class="section-note">Habits organized by foundational importance</p>
    <div class="ring-distribution">
      {% assign rings_sorted = site.data.rings | sort: "level" %}
      {% for ring in rings_sorted %}
        {% assign ring_habits = published_habits | where: "ring", ring.level %}
        {% assign percentage = ring_habits.size | times: 100.0 | divided_by: published_habits.size | round: 1 %}
        
        <div class="distribution-bar">
          <div class="bar-label">
            <span>{{ ring.icon }} {{ ring.short_name }}: {{ ring.name }}</span>
            <span class="bar-count">{{ ring_habits.size }}</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill" style="width: {{ percentage }}%; background-color: {{ ring.color }}"></div>
          </div>
        </div>
      {% endfor %}
    </div>
  </section>

  <section class="stat-section">
    <h2>Top 10 Most Referenced Sources</h2>
    {% assign all_references = "" | split: "" %}
    {% for habit in published_habits %}
      {% if habit.references %}
        {% for ref in habit.references %}
          {% assign all_references = all_references | push: ref %}
        {% endfor %}
      {% endif %}
    {% endfor %}

    {% assign grouped_refs = all_references | group_by: "title" | sort: "size" | reverse %}
    
    <div class="top-sources-table">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Source</th>
            <th>Type</th>
            <th>Author/Creator</th>
            <th>Citations</th>
          </tr>
        </thead>
        <tbody>
          {% for group in grouped_refs limit:10 %}
            {% assign first_ref = group.items | first %}
            {% assign source_type = site.data.source_types[first_ref.type] %}
            <tr>
              <td>{{ forloop.index }}</td>
              <td>
                {% if first_ref.url %}
                  <a href="{{ first_ref.url }}" target="_blank" rel="noopener">{{ group.name }}</a>
                {% else %}
                  {{ group.name }}
                {% endif %}
              </td>
              <td>{{ source_type.icon }} {{ source_type.name }}</td>
              <td>{{ first_ref.author | default: first_ref.creator | default: first_ref.host | default: "—" }}</td>
              <td><strong>{{ group.size }}</strong></td>
            </tr>
          {% endfor %}
        </tbody>
      </table>
    </div>
  </section>

  <section class="stat-section">
    <h2>Most Connected Habits</h2>
    <p class="section-note">Habits with the most relationships (related habits, prerequisites, and stacks)</p>
    
    {% assign habits_with_connections = "" | split: "" %}
    {% for habit in published_habits %}
      {% assign connection_count = 0 %}
      {% if habit.related_habits %}
        {% assign connection_count = connection_count | plus: habit.related_habits.size %}
      {% endif %}
      {% if habit.prerequisites %}
        {% assign connection_count = connection_count | plus: habit.prerequisites.size %}
      {% endif %}
      {% if habit.habit_stacks %}
        {% assign connection_count = connection_count | plus: habit.habit_stacks.size %}
      {% endif %}
      
      {% if connection_count > 0 %}
        {% assign habit_with_count = habit | append: "|||" | append: connection_count %}
        {% assign habits_with_connections = habits_with_connections | push: habit_with_count %}
      {% endif %}
    {% endfor %}
    
    <div class="connected-habits-list">
      {% for habit in published_habits %}
        {% assign connection_count = 0 %}
        {% if habit.related_habits %}
          {% assign connection_count = connection_count | plus: habit.related_habits.size %}
        {% endif %}
        {% if habit.prerequisites %}
          {% assign connection_count = connection_count | plus: habit.prerequisites.size %}
        {% endif %}
        {% if habit.habit_stacks %}
          {% assign connection_count = connection_count | plus: habit.habit_stacks.size %}
        {% endif %}
        
        {% if connection_count > 0 %}
          <div class="connected-habit-item">
            <a href="{{ habit.url | relative_url }}">{{ habit.title }}</a>
            <span class="connection-count">{{ connection_count }} connection{% if connection_count > 1 %}s{% endif %}</span>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </section>

  <section class="stat-section">
    <h2>Recently Added</h2>
    {% assign recent = published_habits | sort: "date_added" | reverse | limit: 10 %}
    <div class="recent-habits-list">
      {% for habit in recent %}
        <div class="recent-habit-item">
          <a href="{{ habit.url | relative_url }}">{{ habit.title }}</a>
          <span class="date-added">Added {{ habit.date_added }}</span>
        </div>
      {% endfor %}
    </div>
  </section>

  <section class="stat-section">
    <h2>Source Type Breakdown</h2>
    <div class="source-type-stats">
      {% for source_item in site.data.source_types %}
        {% assign source_key = source_item[0] %}
        {% assign source = source_item[1] %}
        
        {% assign refs_of_type = 0 %}
        {% for ref in all_references %}
          {% if ref.type == source_key %}
            {% assign refs_of_type = refs_of_type | plus: 1 %}
          {% endif %}
        {% endfor %}
        
        {% if refs_of_type > 0 %}
          {% assign percentage = refs_of_type | times: 100.0 | divided_by: total_refs | round: 1 %}
          <div class="source-type-stat">
            <div class="source-type-header">
              <span>{{ source.icon }} {{ source.name }}</span>
              <span class="source-type-count">{{ refs_of_type }}</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width: {{ percentage }}%"></div>
            </div>
          </div>
        {% endif %}
      {% endfor %}
    </div>
  </section>
</div>
