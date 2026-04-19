---
layout: default
title: All Habits
permalink: /browse/
---

{% assign published_habits = site.habits | where_exp: "h", "h.published == true and h.title.size > 0" %}

<div class="browse-page">
  <h1>Browse All Habits</h1>
  <p class="page-description">Explore the complete habit catalog. Use filters to find exactly what you're looking for.</p>

  <div class="browse-controls">
    <div class="search-box">
      <input type="text" id="habit-search" placeholder="Search habits..." />
    </div>
    
    <div class="filters">
      <div class="filter-group">
        <label for="category-filter">Category:</label>
        <select id="category-filter">
          <option value="">All Categories</option>
          {% for category_item in site.data.categories %}
            {% assign category = category_item[1] %}
            <option value="{{ category_item[0] }}">{{ category.icon }} {{ category.name }}</option>
          {% endfor %}
        </select>
      </div>

      <div class="filter-group">
        <label for="time-filter">Time Investment:</label>
        <select id="time-filter">
          <option value="">Any Duration</option>
          {% for time_item in site.data.time_investment %}
            {% assign time = time_item[1] %}
            <option value="{{ time_item[0] }}">{{ time.icon }} {{ time.short_name }}</option>
          {% endfor %}
        </select>
      </div>

      <div class="filter-group">
        <label for="ring-filter">Ring:</label>
        <select id="ring-filter">
          <option value="">All Rings</option>
          {% assign rings_sorted = site.data.rings | sort: "level" %}
          {% for ring in rings_sorted %}
            <option value="{{ ring.level }}">{{ ring.icon }} {{ ring.short_name }}</option>
          {% endfor %}
        </select>
      </div>

      <div class="filter-group">
        <label for="source-filter">Source Type:</label>
        <select id="source-filter">
          <option value="">All Sources</option>
          {% for source_item in site.data.source_types %}
            {% assign source = source_item[1] %}
            <option value="{{ source_item[0] }}">{{ source.icon }} {{ source.name }}</option>
          {% endfor %}
        </select>
      </div>

      <div class="filter-group">
        <label for="sort-by">Sort By:</label>
        <select id="sort-by">
          <option value="title">Title (A-Z)</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>
    </div>

    <button id="clear-filters" class="btn-secondary">Clear Filters</button>
  </div>

  <div class="results-info">
    <span id="results-count">Showing {{ published_habits.size }} habits</span>
  </div>

  <div class="habits-grid" id="habits-grid">
    {% assign sorted_habits = published_habits | sort: "title" %}
    {% for habit in sorted_habits %}
      {% assign source_types = "" %}
      {% if habit.references %}
        {% for ref in habit.references %}
          {% assign source_types = source_types | append: ref.type | append: " " %}
        {% endfor %}
      {% endif %}
      <div class="habit-item" 
           data-title="{{ habit.title | downcase }}"
           data-category="{{ habit.primary_category }}"
           data-time="{{ habit.time_investment }}"
           data-ring="{{ habit.ring }}"
           data-date="{{ habit.date_added }}"
           data-tags="{{ habit.tags | join: ' ' | downcase }}"
           data-description="{{ habit.description | downcase }}"
           data-sources="{{ source_types | strip }}">
        {% include habit-card.html habit=habit %}
      </div>
    {% endfor %}
  </div>

  <div id="no-results" class="no-results" style="display: none;">
    <p>No habits found matching your criteria.</p>
    <button id="reset-search" class="btn-primary">Clear Filters</button>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('habit-search');
  const categoryFilter = document.getElementById('category-filter');
  const timeFilter = document.getElementById('time-filter');
  const ringFilter = document.getElementById('ring-filter');
  const sourceFilter = document.getElementById('source-filter');
  const sortBy = document.getElementById('sort-by');
  const clearFiltersBtn = document.getElementById('clear-filters');
  const resetSearchBtn = document.getElementById('reset-search');
  const habitsGrid = document.getElementById('habits-grid');
  const habitItems = Array.from(document.querySelectorAll('.habit-item'));
  const resultsCount = document.getElementById('results-count');
  const noResults = document.getElementById('no-results');

  // Load filters from URL parameters
  function loadFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('category')) categoryFilter.value = params.get('category');
    if (params.has('time')) timeFilter.value = params.get('time');
    if (params.has('ring')) ringFilter.value = params.get('ring');
    if (params.has('source')) sourceFilter.value = params.get('source');
    if (params.has('search')) searchInput.value = params.get('search');
    if (params.has('sort')) sortBy.value = params.get('sort');
    
    filterAndSort();
  }

  // Update URL with current filter state
  function updateURL() {
    const params = new URLSearchParams();
    
    if (categoryFilter.value) params.set('category', categoryFilter.value);
    if (timeFilter.value) params.set('time', timeFilter.value);
    if (ringFilter.value) params.set('ring', ringFilter.value);
    if (sourceFilter.value) params.set('source', sourceFilter.value);
    if (searchInput.value) params.set('search', searchInput.value);
    if (sortBy.value !== 'title') params.set('sort', sortBy.value);
    
    const newURL = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.pushState({}, '', newURL);
  }

  function filterAndSort() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedTime = timeFilter.value;
    const selectedRing = ringFilter.value;
    const selectedSource = sourceFilter.value;
    const sortOption = sortBy.value;

    // Filter habits
    let visibleHabits = habitItems.filter(item => {
      const matchesSearch = searchTerm === '' || 
        item.dataset.title.includes(searchTerm) ||
        item.dataset.tags.includes(searchTerm) ||
        item.dataset.description.includes(searchTerm);
      
      const matchesCategory = selectedCategory === '' || item.dataset.category === selectedCategory;
      const matchesTime = selectedTime === '' || item.dataset.time === selectedTime;
      const matchesRing = selectedRing === '' || item.dataset.ring === selectedRing;
      const matchesSource = selectedSource === '' || (item.dataset.sources && item.dataset.sources.includes(selectedSource));

      return matchesSearch && matchesCategory && matchesTime && matchesRing && matchesSource;
    });

    // Sort habits
    visibleHabits.sort((a, b) => {
      switch(sortOption) {
        case 'title':
          return a.dataset.title.localeCompare(b.dataset.title);
        case 'recent':
          return (b.dataset.date || '').localeCompare(a.dataset.date || '');
        default:
          return 0;
      }
    });

    // Update display
    habitItems.forEach(item => item.style.display = 'none');
    visibleHabits.forEach(item => item.style.display = 'block');

    // Update results count
    const count = visibleHabits.length;
    resultsCount.textContent = `Showing ${count} habit${count !== 1 ? 's' : ''}`;
    
    // Show/hide no results message
    noResults.style.display = count === 0 ? 'block' : 'none';
    habitsGrid.style.display = count === 0 ? 'none' : 'grid';

    // Update URL
    updateURL();
  }

  function clearFilters() {
    searchInput.value = '';
    categoryFilter.value = '';
    timeFilter.value = '';
    ringFilter.value = '';
    sourceFilter.value = '';
    sortBy.value = 'title';
    filterAndSort();
  }

  // Event listeners
  searchInput.addEventListener('input', filterAndSort);
  categoryFilter.addEventListener('change', filterAndSort);
  timeFilter.addEventListener('change', filterAndSort);
  ringFilter.addEventListener('change', filterAndSort);
  sourceFilter.addEventListener('change', filterAndSort);
  sortBy.addEventListener('change', filterAndSort);
  clearFiltersBtn.addEventListener('click', clearFilters);
  resetSearchBtn.addEventListener('click', clearFilters);

  // Load filters from URL on page load
  loadFiltersFromURL();
});
</script>
